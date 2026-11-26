import { formatCompactNumber, formatNumber } from "@/utils/format"
import { addQueryParams } from "@/utils/url"
import {
  BoxIcon,
  DownloadIcon,
  InfinityIcon,
  LinkIcon,
  StarIcon,
} from "lucide-react"

import { UTM_PARAMS } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { IconTile } from "@/components/ui/icon-tile"
import { Tag } from "@/components/ui/tag"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Collapsible,
  CollapsibleChevronsUpDownIcon,
} from "@/components/collapsible-animated"
import { Markdown } from "@/components/markdown"

import type { Project } from "../../types/projects"
import { ProjectTitle } from "./project-title"

/** Badge shown on the row for a known publication state. */
const STATUS_META: Record<
  NonNullable<Project["status"]>,
  { label: string; dotClassName: string }
> = {
  live: { label: "已上线", dotClassName: "bg-emerald-500" },
  wip: { label: "进行中", dotClassName: "bg-amber-500" },
}

export function ProjectItem({
  className,
  project,
  stargazersCount,
  hfDownloads,
}: {
  className?: string
  project: Project
  /** Star count for `project.repo`; null hides the badge. */
  stargazersCount?: number | null
  /** Download count for `project.hfModel`; null hides the badge. */
  hfDownloads?: number | null
}) {
  const { period, repo, hfModel, status } = project
  const isOngoing = !period?.end
  const isSinglePeriod = period?.end === period?.start
  const showStars =
    repo && typeof stargazersCount === "number" && stargazersCount > 0
  const showHfDownloads =
    hfModel && typeof hfDownloads === "number" && hfDownloads > 0
  const statusMeta = status ? STATUS_META[status] : null
  // Skills sit in the collapsed row, so only a description gives the card
  // something extra to reveal. Without one the row stays flat — no chevron
  // that opens an empty panel.
  const hasDetails = Boolean(project.description)

  const row = (
    <div
      className="group relative flex items-center overflow-hidden hover:bg-accent-muted"
      data-slot="glow-card"
    >
      {/* Spotlight follows the cursor; --pointer-x/y are written by the
          GlowCardGrid wrapper in the Projects panel. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at calc(var(--pointer-x, -10) * 50% + 50%) calc(var(--pointer-y, -10) * 50% + 50%), color-mix(in oklab, var(--foreground) 7%, transparent), transparent 70%)",
        }}
      />

      <IconTile className="mx-4">{project.icon ?? <BoxIcon />}</IconTile>

      <div className="flex min-w-0 flex-1 items-center gap-2 border-l border-dashed border-line p-4">
        <div className="min-w-0 flex-1">
          <h3 className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1 leading-snug font-medium text-balance">
            {hasDetails ? (
              <CollapsibleTrigger className="text-left">
                <span className="absolute inset-0" aria-hidden />
                <ProjectTitle
                  title={project.title}
                  effect={project.titleEffect}
                />
              </CollapsibleTrigger>
            ) : (
              <ProjectTitle
                title={project.title}
                effect={project.titleEffect}
              />
            )}

            {statusMeta && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-line px-1.5 py-0.5 text-[10px] font-normal whitespace-nowrap text-muted-foreground">
                <span
                  aria-hidden
                  className={cn(
                    "size-1.5 rounded-full",
                    statusMeta.dotClassName
                  )}
                />
                {statusMeta.label}
              </span>
            )}
          </h3>

          {project.summary && (
            <p className="text-sm/relaxed text-pretty text-muted-foreground">
              {project.summary}
            </p>
          )}

          {project.skills.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-1">
              {project.skills.map((skill, index) => (
                <li key={index} className="flex">
                  <Tag className="px-1.5 py-0 text-[11px]">{skill}</Tag>
                </li>
              ))}
            </ul>
          )}

          {period && (
            <dl className="text-sm text-muted-foreground">
              <dt className="sr-only">Period</dt>
              <dd className="flex items-center gap-0.5">
                <span>{period.start}</span>
                {!isSinglePeriod && (
                  <>
                    <span className="font-mono">—</span>
                    {isOngoing ? (
                      <InfinityIcon
                        className="size-4.5 translate-y-[0.5px]"
                        aria-label="Present"
                      />
                    ) : (
                      <span>{period.end}</span>
                    )}
                  </>
                )}
              </dd>
            </dl>
          )}
        </div>

        {showStars && (
          <Tooltip>
            <TooltipTrigger
              render={
                <a
                  className="relative flex shrink-0 items-center gap-1 text-sm text-muted-foreground after:absolute after:-inset-1.5 hover:text-foreground"
                  href={addQueryParams(`https://github.com/${repo}`, UTM_PARAMS)}
                  target="_blank"
                  rel="noopener"
                >
                  <StarIcon className="size-3.5" />
                  <span className="tabular-nums">
                    {formatCompactNumber(stargazersCount).toLowerCase()}
                  </span>
                  <span className="sr-only">GitHub stars</span>
                </a>
              }
            />
            <TooltipContent className="tabular-nums">
              {formatNumber(stargazersCount)} stars on GitHub
            </TooltipContent>
          </Tooltip>
        )}

        {showHfDownloads && (
          <Tooltip>
            <TooltipTrigger
              render={
                <a
                  className="relative flex shrink-0 items-center gap-1 text-sm text-muted-foreground after:absolute after:-inset-1.5 hover:text-foreground"
                  href={addQueryParams(`https://huggingface.co/${hfModel}`, UTM_PARAMS)}
                  target="_blank"
                  rel="noopener"
                >
                  <DownloadIcon className="size-3.5" />
                  <span className="tabular-nums">
                    {formatCompactNumber(hfDownloads).toLowerCase()}
                  </span>
                  <span className="sr-only">Hugging Face downloads</span>
                </a>
              }
            />
            <TooltipContent className="tabular-nums">
              {formatNumber(hfDownloads)} downloads on Hugging Face (last 30
              days)
            </TooltipContent>
          </Tooltip>
        )}

        {project.link && (
          <Tooltip>
            <TooltipTrigger
              render={
                <a
                  className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                  href={addQueryParams(project.link, UTM_PARAMS)}
                  target="_blank"
                  rel="noopener"
                  aria-label="Open project"
                >
                  <LinkIcon className="pointer-events-none size-4" />
                </a>
              }
            />
            <TooltipContent>
              <p>Open project</p>
            </TooltipContent>
          </Tooltip>
        )}

        {hasDetails && (
          <div className="shrink-0 text-muted-foreground [&_svg]:size-4">
            <CollapsibleChevronsUpDownIcon duration={0.15} />
          </div>
        )}
      </div>
    </div>
  )

  if (!hasDetails) {
    return <div className={className}>{row}</div>
  }

  return (
    <Collapsible className={className} defaultOpen={project.isExpanded}>
      {/* Only the title is the trigger (accordion pattern); its overlay keeps
          the whole row clickable, while the project link sits above it. */}
      {row}

      <CollapsibleContent className="overflow-hidden">
        <div className="space-y-4 border-t border-line p-4">
          <div className="typeset typeset-description">
            <Markdown>{project.description}</Markdown>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
