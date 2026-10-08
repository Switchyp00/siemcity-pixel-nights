// Generates a personalized SIEMCITY mission from a citizen's interests + skill level via Lovable AI.
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-lovable-aig-run-id",
  "Access-Control-Expose-Headers": "X-Lovable-AIG-Run-ID",
};
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...cors, "Content-Type": "application/json" } });

const LOCATIONS = ["Homebase", "SIEM Tower", "Terminal Café", "Log Loft", "Signals District", "Cyber District", "The Plaza"];

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "location", "briefing", "steps", "skills", "xp"],
  properties: {
    title: { type: "string" },
    location: { type: "string" },
    briefing: { type: "string" },
    steps: { type: "array", items: { type: "string" } },
    skills: { type: "array", items: { type: "string" } },
    xp: { type: "integer" },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) return json({ error: "AI is not configured." }, 500);

  let body: { interests?: string; level?: string; username?: string };
  try { body = await req.json(); } catch { return json({ error: "Invalid request." }, 400); }
  const interests = String(body.interests ?? "").slice(0, 600).trim();
  const level = ["beginner", "intermediate", "advanced"].includes(String(body.level)) ? body.level : "beginner";
  if (interests.length < 3) return json({ error: "Tell us a bit about your interests." }, 400);

  const instructions = `You design short, hands-on cybersecurity missions for SIEMCITY, a cozy pixel social city for people learning SOC/blue-team/red-team skills.
Create ONE mission tailored to the citizen. Rules:
- Ethical, legal, lab-only. Never target real systems you don't own.
- Fit the skill level: ${level}.
- "location" must be one of: ${LOCATIONS.join(", ")} (pick the most thematic).
- 3 to 5 concrete steps, each one sentence, doable in under an hour total with free tools.
- 2 to 4 short skill tags. xp between 50 and 500 scaled to difficulty.
- Briefing: 2 sentences, in-world flavor (city, terminals, neon) plus the real learning goal.`;

  const runId = req.headers.get("X-Lovable-AIG-Run-ID") ?? undefined;
  const upstream = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
    method: "POST",
    signal: req.signal,
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": key,
      "X-Lovable-AIG-SDK": "fetch",
      ...(runId ? { "X-Lovable-AIG-Run-ID": runId } : {}),
    },
    body: JSON.stringify({
      model: "openai/gpt-6-astra",
      instructions,
      input: `Citizen: ${body.username ?? "anonymous"}\nInterests: ${interests}\nSkill level: ${level}`,
      stream: true,
      store: false,
      reasoning: { effort: "low", summary: "auto" },
      include: ["reasoning.encrypted_content"],
      text: { format: { type: "json_schema", name: "mission", strict: true, schema } },
    }),
  });

  const out = new Headers(cors);
  const rid = upstream.headers.get("X-Lovable-AIG-Run-ID");
  if (rid) out.set("X-Lovable-AIG-Run-ID", rid);
  out.set("Content-Type", "application/json");

  if (!upstream.ok || !upstream.body) {
    const txt = await upstream.text().catch(() => "");
    let msg = "Mission generator is unavailable right now.";
    try { msg = JSON.parse(txt)?.error?.message ?? JSON.parse(txt)?.message ?? msg; } catch { /* keep default */ }
    if (upstream.status === 429) msg = "Too many requests — try again in a moment.";
    if (upstream.status === 402) msg = "AI credits are used up for this workspace.";
    return new Response(JSON.stringify({ error: msg }), { status: upstream.status, headers: out });
  }

  // Consume SSE server-side; collect output text.
  const reader = upstream.body.pipeThrough(new TextDecoderStream()).getReader();
  let buf = "", text = "", failed = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += value;
    let i;
    while ((i = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
      if (!line.startsWith("data:")) continue;
      const d = line.slice(5).trim();
      if (!d || d === "[DONE]") continue;
      try {
        const ev = JSON.parse(d);
        if (ev.type === "response.output_text.delta") text += ev.delta ?? "";
        if (ev.type === "response.failed" || ev.type === "error") failed = ev.response?.error?.message ?? ev.message ?? "Generation failed.";
      } catch { /* ignore partial */ }
    }
  }
  if (failed) return new Response(JSON.stringify({ error: failed }), { status: 502, headers: out });
  try {
    const m = JSON.parse(text);
    if (!LOCATIONS.includes(m.location)) m.location = "SIEM Tower";
    m.steps = (m.steps ?? []).slice(0, 5);
    m.skills = (m.skills ?? []).slice(0, 4);
    m.xp = Math.min(500, Math.max(50, Number(m.xp) || 100));
    return new Response(JSON.stringify({ mission: m }), { headers: out });
  } catch {
    return new Response(JSON.stringify({ error: "The AI returned an unreadable mission. Try again." }), { status: 502, headers: out });
  }
});
