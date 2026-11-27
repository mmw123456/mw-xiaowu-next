import type { PortfolioSection } from "../types/sections"
import { EDUCATION } from "./education"
import { PROJECTS } from "./projects"
import { TECH_STACK } from "./tech-stack"
import { TOOLS } from "./tools"
import { WRITING } from "./writing"

export function getPortfolioSections(): PortfolioSection[] {
  // Mirror the sections' empty-list guards before serializing search targets.
  const sections: (PortfolioSection & { visible: boolean })[] = [
    { id: "hello", title: "About", visible: true },
    { id: "stack", title: "Stack", visible: TECH_STACK.length > 0 },
    { id: "education", title: "Education", visible: EDUCATION.length > 0 },
    { id: "projects", title: "Projects", visible: PROJECTS.length > 0 },
    { id: "writing", title: "Writing", visible: WRITING.length > 0 },
    { id: "tools", title: "Tools", visible: TOOLS.length > 0 },
  ]

  return sections
    .filter((section) => section.visible)
    .map(({ id, title }) => ({
      id,
      title,
    }))
}
