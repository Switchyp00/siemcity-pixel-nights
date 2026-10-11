CREATE TABLE public.district_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id text NOT NULL,
  author_id uuid NOT NULL DEFAULT auth.uid() REFERENCES public.citizens(id),
  content text NOT NULL CHECK (char_length(content) BETWEEN 1 AND 280),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX district_messages_loc_idx ON public.district_messages(location_id, created_at DESC);
GRANT SELECT, INSERT ON public.district_messages TO authenticated;
GRANT ALL ON public.district_messages TO service_role;
ALTER TABLE public.district_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Signed-in read district chat" ON public.district_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Citizens post as themselves" ON public.district_messages FOR INSERT TO authenticated WITH CHECK (author_id = auth.uid());

CREATE OR REPLACE FUNCTION public.district_messages_guard()
RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public' AS $$
BEGIN
  NEW.created_at = now();
  IF EXISTS (SELECT 1 FROM public.district_messages WHERE author_id = NEW.author_id AND created_at > now() - interval '1 second') THEN
    RAISE EXCEPTION 'Slow down — one message per second';
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER district_messages_guard BEFORE INSERT ON public.district_messages FOR EACH ROW EXECUTE FUNCTION public.district_messages_guard();

CREATE TABLE public.message_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid NOT NULL REFERENCES public.district_messages(id) ON DELETE CASCADE,
  reporter_id uuid NOT NULL DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (message_id, reporter_id)
);
GRANT INSERT ON public.message_reports TO authenticated;
GRANT ALL ON public.message_reports TO service_role;
ALTER TABLE public.message_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Report as yourself" ON public.message_reports FOR INSERT TO authenticated WITH CHECK (reporter_id = auth.uid());

ALTER PUBLICATION supabase_realtime ADD TABLE public.district_messages;