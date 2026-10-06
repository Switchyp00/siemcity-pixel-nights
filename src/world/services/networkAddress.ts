// SIEMCITY Network Address: 192.SC.<district>.<host>
// District (01-16) is a subnet; later it can map to neighborhoods, guilds or server shards.
export const DISTRICT_COUNT = 16;

export interface ParsedAddress { district: number; host: number }

export const formatAddress = (district: number, host: number) =>
  `192.SC.${String(district).padStart(2, "0")}.${host}`;

export function parseAddress(addr: string): ParsedAddress | null {
  const m = /^192\.SC\.(\d{2})\.(\d{1,3})$/.exec(addr);
  return m ? { district: +m[1], host: +m[2] } : null;
}

export function generateAddress(taken: Set<string>): { address: string; district: number } {
  for (let i = 0; i < 5000; i++) {
    const district = 1 + Math.floor(Math.random() * DISTRICT_COUNT);
    const host = 2 + Math.floor(Math.random() * 253);
    const address = formatAddress(district, host);
    if (!taken.has(address)) return { address, district };
  }
  throw new Error("Network address space exhausted");
}
