import { defineTool } from "@lovable.dev/mcp-js";
import { SERVICES } from "../data";

export default defineTool({
  name: "list_services",
  title: "List services",
  description: "List the services offered, each with a short description.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(SERVICES, null, 2) }],
    structuredContent: { services: SERVICES },
  }),
});
