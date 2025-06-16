import { getVoteCounts, calculatePercentages } from "../kv/kv.ts";

export default async function handler(_req: Request): Promise<Response> {
  const counts = await getVoteCounts();
  const percentages = calculatePercentages(counts);
  return new Response(JSON.stringify({ counts, percentages }), {
    headers: { "Content-Type": "application/json" },
  });
}
