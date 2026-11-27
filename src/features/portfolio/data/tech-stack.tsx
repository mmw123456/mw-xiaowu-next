import {
  BracesIcon,
  CodeXmlIcon,
  CoffeeIcon,
  DatabaseIcon,
  FileCodeIcon,
  SparklesIcon,
} from "lucide-react"

import { GitHubIcon, DartIcon, PythonIcon, VercelIcon } from "@/components/icons"

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
    key: "python",
    title: "Python",
    href: "https://www.python.org",
    icon: <PythonIcon />,
    categories: ["语言"],
  },
  {
    // MW English 是 Flutter 写的，Dart 是它的语言。
    key: "dart",
    title: "Dart",
    href: "https://dart.dev",
    icon: <DartIcon />,
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
  {
    key: "vercel",
    title: "Vercel",
    href: "https://vercel.com",
    icon: <VercelIcon />,
    categories: ["基础设施"],
  },
]
