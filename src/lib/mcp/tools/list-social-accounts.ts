import { defineTool } from "@lovable.dev/mcp-js";
import { SOCIALS } from "../data";

export default defineTool({
  name: "list_social_accounts",
  title: "List managed social accounts",
  description:
    "List the public social media accounts managed by Harshad, with handle, role and profile link.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(SOCIALS, null, 2) }],
    structuredContent: { accounts: SOCIALS },
  }),
});
