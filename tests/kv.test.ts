import { assertEquals } from "https://deno.land/std@0.203.0/testing/asserts.ts";
import { kv, incrementVote, getVoteCounts, calculatePercentages } from "../kv/kv.ts";

Deno.test("increment and get counts", async () => {
  await kv.delete(["votes", 1]);
  await incrementVote(1);
  const counts = await getVoteCounts();
  assertEquals(counts[1], 1);
});

Deno.test("calculate percentages", () => {
  const counts = { 1: 1, 2: 1, 3: 0, 4: 0, 5: 0 } as Record<number, number>;
  const perc = calculatePercentages(counts);
  assertEquals(perc[1], 50);
  assertEquals(perc[2], 50);
});
