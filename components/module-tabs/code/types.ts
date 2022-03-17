export type Environment = "javascript" | "typescript" | "python";

export interface SupportedEnvironment {
  environment: Environment;
  title: string;
  icon: React.FC;
}

export type CodeSnippet = Partial<Record<Environment, string>>;

export interface SnippetSchema {
  name: string;
  summary: string | null;
  remarks?: string | null;
  examples: CodeSnippet;
  signature: string;
  methods?: SnippetSchema[];
}

export interface SnippetApiResponse {
  [key: string]: SnippetSchema;
}
