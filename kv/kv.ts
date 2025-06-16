export const kv = await Deno.openKv();

export async function incrementVote(value: number) {
  const key = ["votes", value];
  const current = (await kv.get<number>(key)).value ?? 0;
  await kv.set(key, current + 1);
}

export async function getVoteCounts(): Promise<Record<number, number>> {
  const counts: Record<number, number> = {};
  for (let i = 1; i <= 5; i++) {
    counts[i] = (await kv.get<number>(["votes", i])).value ?? 0;
  }
  return counts;
}

export function calculatePercentages(counts: Record<number, number>): Record<number, number> {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const result: Record<number, number> = {};
  for (let i = 1; i <= 5; i++) {
    result[i] = total > 0 ? Math.round((counts[i] / total) * 100) : 0;
  }
  return result;
}
