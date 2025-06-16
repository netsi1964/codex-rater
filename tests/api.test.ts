import { assertEquals } from "https://deno.land/std@0.203.0/testing/asserts.ts";
import voteHandler from "../api/vote.ts";
import resultsHandler from "../api/results.ts";
import { kv } from "../kv/kv.ts";

Deno.test("vote endpoint", async () => {
  await kv.delete(["votes", 2]);
  const req = new Request("http://localhost/api/vote", {
    method: "POST",
    body: JSON.stringify({ vote: 2 }),
    headers: { "Content-Type": "application/json" },
  });
  const res = await voteHandler(req);
  assertEquals(res.status, 200);
  const counts = await kv.get<number>(["votes", 2]);
  assertEquals(counts.value, 1);
});

Deno.test("results endpoint", async () => {
  const req = new Request("http://localhost/api/results");
  const res = await resultsHandler(req);
  const data = await res.json();
  assertEquals(typeof data.counts, "object");
  assertEquals(typeof data.percentages, "object");
});
