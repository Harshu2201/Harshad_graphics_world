import { defineTool } from "@lovable.dev/mcp-js";
import { AI_FILMS } from "../data";

export default defineTool({
  name: "list_ai_films",
  title: "List AI films",
  description:
    "List the published AI-generated short films and reels, including the featured film and the full gallery of watchable Instagram links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const payload = {
      featured: AI_FILMS.featured,
      gallery: AI_FILMS.gallery,
      count: AI_FILMS.gallery.length + 1,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
