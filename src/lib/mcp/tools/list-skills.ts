import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { SKILLS } from "../data";

export default defineTool({
  name: "list_skills",
  title: "List skills",
  description:
    "List skills and tools grouped by category (AI & Productivity, Creative, Business & Marketing, Tech & Execution). Optionally filter to one category.",
  inputSchema: {
    category: z
      .string()
      .optional()
      .describe("Optional category name filter, matched case-insensitively as a substring."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const q = category?.trim().toLowerCase();
    const groups = q ? SKILLS.filter((g) => g.category.toLowerCase().includes(q)) : SKILLS;
    return {
      content: [{ type: "text", text: JSON.stringify(groups, null, 2) }],
      structuredContent: { skills: groups },
    };
  },
});
