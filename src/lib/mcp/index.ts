import { defineMcp } from "@lovable.dev/mcp-js";
import getProfileTool from "./tools/get-profile";
import listServicesTool from "./tools/list-services";
import listSkillsTool from "./tools/list-skills";
import listAiFilmsTool from "./tools/list-ai-films";
import listSocialAccountsTool from "./tools/list-social-accounts";

export default defineMcp({
  name: "neon-canvas",
  title: "Neon Canvas",
  version: "0.1.0",
  instructions:
    "Read-only tools for Harshad Pakhale's AI portfolio. Use `get_profile` for identity, positioning and contact channels, `list_services` for offerings, `list_skills` for tools and capabilities, `list_ai_films` for AI-generated film links, and `list_social_accounts` for managed social profiles. All data is public portfolio content.",
  tools: [
    getProfileTool,
    listServicesTool,
    listSkillsTool,
    listAiFilmsTool,
    listSocialAccountsTool,
  ],
});
