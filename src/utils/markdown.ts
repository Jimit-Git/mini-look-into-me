import YAML from 'yaml';

export interface ParsedMarkdown<T = Record<string, unknown>> {
  data: T;
  content: string;
}

export function parseMarkdown<T = Record<string, unknown>>(raw: string): ParsedMarkdown<T> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {} as T, content: raw.trim() };
  }
  const [, frontmatter, content] = match;
  return {
    data: (YAML.parse(frontmatter) || {}) as T,
    content: content.trim(),
  };
}
