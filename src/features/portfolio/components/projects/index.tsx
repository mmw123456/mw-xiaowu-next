import { cn } from "@/lib/utils"
import { CollapsibleList } from "@/components/collapsible-list"
import { GlowCardGrid } from "@/registry/components/glow-card-grid"
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import { PROJECTS } from "@/features/portfolio/data/projects"
import { getProjectStargazers } from "@/features/portfolio/lib/github-project-stars"
import { getHuggingFaceDownloads } from "@/features/portfolio/lib/hugging-face-downloads"

import { ProjectItem } from "./project-item"

const ID = "projects"

/**
 * Sections the project list is split into, rendered in this order. Projects
 * without a `group` fall into the last section so nothing silently disappears
 * from the page.
 */
const GROUPS = [
  { key: "ai", title: "AI 项目" },
  { key: "other", title: "其他项目" },
] as const

export async function Projects() {
  // Nothing to show until PROJECTS is filled in.
  if (PROJECTS.length === 0) {
    return null
  }

  const groups = GROUPS.map((group) => ({
    ...group,
    items: PROJECTS.filter(
      (project) => (project.group ?? "other") === group.key
    ),
  })).filter((group) => group.items.length > 0)

  const repos = PROJECTS.flatMap((project) =>
    project.repo ? [project.repo] : []
  )
  const models = PROJECTS.flatMap((project) =>
    project.hfModel ? [project.hfModel] : []
  )

  // Metrics are nice-to-have: each lookup resolves to null on failure and the
  // badge is skipped, so a missing number never blocks the page.
  const noMetrics: Record<string, number | null> = {}
  const [stargazers, hfDownloads] = await Promise.all([
    repos.length > 0 ? getProjectStargazers(repos) : noMetrics,
    models.length > 0 ? getHuggingFaceDownloads(models) : noMetrics,
  ])

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Projects</a>
          <PanelTitleSup>({PROJECTS.length})</PanelTitleSup>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      {/* Pointer tracking only; neutralized to a single column so the
          project list keeps its vertical layout. */}
      <GlowCardGrid className="grid-cols-1 sm:grid-cols-1 md:grid-cols-1">
        {groups.map((group, index) => (
          <section
            key={group.key}
            aria-labelledby={`${ID}-${group.key}`}
            className="[&_ul>li:last-child]:border-b-0"
          >
            <h3
              id={`${ID}-${group.key}`}
              className={cn(
                "flex items-center gap-2 border-b border-line py-2 pl-4 text-sm",
                // A rule above the heading separates it from the previous
                // group; the first heading sits right under the panel header.
                index > 0 && "border-t"
              )}
            >
              <span className="font-mono text-xs text-muted-foreground/80 select-none">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <span className="font-medium">{group.title}</span>
              <sup className="text-xs text-muted-foreground">
                {group.items.length}
              </sup>
            </h3>

            <CollapsibleList
              items={group.items}
              max={4}
              keyExtractor={(item) => item.id}
              renderItem={(item) => (
                <ProjectItem
                  project={item}
                  stargazersCount={
                    item.repo ? (stargazers[item.repo] ?? null) : null
                  }
                  hfDownloads={
                    item.hfModel ? (hfDownloads[item.hfModel] ?? null) : null
                  }
                />
              )}
            />
          </section>
        ))}
      </GlowCardGrid>
    </Panel>
  )
}
