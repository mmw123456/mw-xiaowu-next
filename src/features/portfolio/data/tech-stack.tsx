import {
  BracesIcon,
  CodeXmlIcon,
  CoffeeIcon,
  DatabaseIcon,
  FileCodeIcon,
  SparklesIcon,
} from "lucide-react"

import { GitHubIcon } from "@/components/icons"

import type { TechStack } from "../types/tech-stack"

export const TECH_STACK: TechStack[] = [
  // Grouped by category, in the order the section should read.
  {
    key: "java",
    title: "Java",
    href: "https://www.java.com",
    icon: <CoffeeIcon />,
    categories: ["语言"],
  },
  {
    key: "sql",
    title: "SQL",
    href: "https://developer.mozilla.org/en-US/docs/Glossary/SQL",
    icon: <DatabaseIcon />,
    categories: ["语言"],
  },
  {
    key: "html",
    title: "HTML",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    icon: <CodeXmlIcon />,
    categories: ["前端"],
  },
  {
    key: "css",
    title: "CSS",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    icon: <FileCodeIcon />,
    categories: ["前端"],
  },
  {
    key: "javascript",
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    icon: <BracesIcon />,
    categories: ["前端"],
  },
  {
    key: "deepseek-api",
    title: "DeepSeek API",
    href: "https://platform.deepseek.com",
    icon: <SparklesIcon />,
    categories: ["AI"],
  },
  {
    key: "github-pages",
    title: "GitHub Pages",
    href: "https://pages.github.com",
    icon: <GitHubIcon />,
    categories: ["基础设施"],
  },
]
