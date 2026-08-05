import { defineTool } from "@lovable.dev/mcp-js";
import { CONTACT, PROFILE } from "../data";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description:
    "Get Harshad Pakhale's public profile: name, positioning, tagline, focus areas, website and public contact channels.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const payload = { profile: PROFILE, contact: CONTACT };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
