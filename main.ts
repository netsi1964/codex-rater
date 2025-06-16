import { serve } from "serve";
import { serveDir } from "serveDir";
import voteHandler from "./api/vote.ts";
import resultsHandler from "./api/results.ts";

serve((req) => {
  const url = new URL(req.url);
  if (url.pathname === "/api/vote") {
    return voteHandler(req);
  }
  if (url.pathname === "/api/results") {
    return resultsHandler(req);
  }
  return serveDir(req, { fsRoot: "./static", urlRoot: "" });
});
