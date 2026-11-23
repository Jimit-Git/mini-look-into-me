import type { IconType } from 'react-icons';
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiGo,
  SiRust,
  SiCplusplus,
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiFastapi,
  SiVuedotjs,
  SiLangchain,
  SiLanggraph,
  SiCrewai,
  SiHuggingface,
  SiPytorch,
  SiTensorflow,
  SiAnthropic,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiLinux,
  SiSpringboot,
  SiSpring,
  SiTerraform,
} from 'react-icons/si';
import {
  RiOpenaiFill,
  RiCodeSSlashLine,
  RiDatabase2Line,
  RiBrainLine,
  RiSparklingLine,
} from 'react-icons/ri';
import { FaAws, FaJava } from 'react-icons/fa6';

const iconMap: Record<string, IconType> = {
  // Languages
  python: SiPython,
  py: SiPython,
  java: FaJava,
  typescript: SiTypescript,
  ts: SiTypescript,
  javascript: SiJavascript,
  js: SiJavascript,
  go: SiGo,
  golang: SiGo,
  rust: SiRust,
  'c++': SiCplusplus,
  cpp: SiCplusplus,

  // Frameworks & Backend
  react: SiReact,
  fastapi: SiFastapi,
  'spring boot': SiSpringboot,
  springboot: SiSpringboot,
  spring: SiSpring,
  'node.js': SiNodedotjs,
  nodejs: SiNodedotjs,
  node: SiNodedotjs,
  'next.js': SiNextdotjs,
  nextjs: SiNextdotjs,
  vue: SiVuedotjs,

  // Agentic AI & LLMs
  langgraph: SiLanggraph,
  langchain: SiLangchain,
  crewai: SiCrewai,
  'crew.ai': SiCrewai,
  openai: RiOpenaiFill,
  huggingface: SiHuggingface,
  'hugging face': SiHuggingface,
  anthropic: SiAnthropic,
  claude: SiAnthropic,
  pytorch: SiPytorch,
  tensorflow: SiTensorflow,

  // RAG & Retrieval
  chromadb: RiDatabase2Line,
  chroma: RiDatabase2Line,
  'vector dbs': RiDatabase2Line,
  'vector databases': RiDatabase2Line,
  embeddings: RiSparklingLine,
  'prompt engineering': RiBrainLine,
  'rag evaluation': RiSparklingLine,

  // Cloud & DevOps
  aws: FaAws,
  'aws bedrock': FaAws,
  bedrock: FaAws,
  docker: SiDocker,
  terraform: SiTerraform,
  kubernetes: SiKubernetes,
  k8s: SiKubernetes,
  git: SiGit,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mongodb: SiMongodb,
  redis: SiRedis,
  linux: SiLinux,
};

export function resolveSkillIcon(name: string): IconType {
  const normalized = name.toLowerCase().trim();
  return iconMap[normalized] || RiCodeSSlashLine;
}
