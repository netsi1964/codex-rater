import { incrementVote } from "../kv/kv.ts";

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }
  const vote = (data as Record<string, unknown>).vote;
  if (typeof vote !== "number" || vote < 1 || vote > 5) {
    return new Response("Invalid vote", { status: 400 });
  }

  await incrementVote(vote);
  return new Response("OK", { status: 200 });
}
