// Shared TypeScript types for VibeLaunch

export type ModelType = "CLOUD" | "LOCAL" | "HYBRID";

export type MCPCategory =
  | "DATABASE"
  | "FILESYSTEM"
  | "WEB"
  | "CODE"
  | "COMMUNICATION"
  | "AI"
  | "UTILITY"
  | "DEVTOOLS";

export type SkillCategory =
  | "GENERAL"
  | "CODING"
  | "WRITING"
  | "ANALYSIS"
  | "DEVOPS"
  | "RESEARCH"
  | "CREATIVE";

export type TargetPlatform = "antigravity" | "cursor" | "claude";

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  type: ModelType;
  contextWindow: number;
  description?: string;
  releaseDate?: string;
  apiSlug?: string;
  iconUrl?: string;
  tags: string[];
  githubUrl?: string;
  youtubeUrl?: string;
  docsUrl?: string;
  paperUrl?: string;
  latestUpdate?: string;
  updateDate?: string;
  compatibleLLMs?: string[];
  quickstartSnippet?: string;
  updateHighlights?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MCPServer {
  id: string;
  name: string;
  repoUrl: string;
  githubUrl?: string;
  installCommand: string;
  description?: string;
  category: MCPCategory;
  author?: string;
  stars: number;
  npmPackage?: string;
  tags: string[];
  youtubeUrl?: string;
  docsUrl?: string;
  latestUpdate?: string;
  updateDate?: string;
  compatibleLLMs?: string[];
  quickstartSnippet?: string;
  updateHighlights?: string[];
  lastSyncedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  title: string;
  description?: string;
  category: SkillCategory;
  systemPrompt: string;
  tags: string[];
  author?: string;
  useCount: number;
  githubUrl?: string;
  youtubeUrl?: string;
  docsUrl?: string;
  latestUpdate?: string;
  updateDate?: string;
  compatibleLLMs?: string[];
  quickstartSnippet?: string;
  updateHighlights?: string[];
  createdAt: string;
  updatedAt: string;
}

export type CatalogItem = AIModel | MCPServer | Skill;
export type CatalogItemType = "model" | "mcp" | "skill";

export interface WorkspaceCartItem {
  id: string;
  type: CatalogItemType;
  item: CatalogItem;
}

export interface GeneratedConfig {
  platform: TargetPlatform;
  content: string;
  filename: string;
}
