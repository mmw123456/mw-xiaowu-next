import { ArrowUpRightIcon } from "lucide-react"

import { TOOLS } from "../data/tools"
import { Panel, PanelHeader, PanelTitle } from "./panel"
import { PanelTitleCopy } from "./panel-title-copy"

const ID = "tools"

export function Tools() {
  if (TOOLS.length === 0) {
    return null
  }

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Tools</a>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <div className="relative [--col-left-width:--spacing(16)]">
        <div
          className="pointer-events-none absolute inset-y-0 left-(--col-left-width) -z-1 w-px border-r border-dashed border-line max-sm:hidden"
          aria-hidden
        />

        {TOOLS.map((tool, index) => (
          <div
            key={tool.key}
            className="grid items-start gap-y-1 border-b border-line p-4 last:border-none sm:grid-cols-[var(--col-left-width)_1fr]"
          >
            <span
              className="font-mono text-sm text-muted-foreground/80 select-none"
              aria-hidden
            >
              {(index + 1).toString().padStart(2, "0")}
            </span>

            <div className="flex flex-col gap-1">
              <a
                className="group inline-flex w-fit items-center gap-1 font-medium text-balance"
                href={tool.href}
                target="_blank"
                rel="noopener"
              >
                {tool.title}
                <ArrowUpRightIcon className="size-3.5 text-muted-foreground transition-[color,translate] group-hover:-translate-y-px group-hover:text-foreground" />
              </a>
              <p className="text-sm text-balance text-muted-foreground">
                {tool.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}
