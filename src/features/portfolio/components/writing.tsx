import { ArrowUpRightIcon } from "lucide-react"

import { WRITING } from "../data/writing"
import { Panel, PanelHeader, PanelTitle } from "./panel"
import { PanelTitleCopy } from "./panel-title-copy"

const ID = "writing"

export function Writing() {
  // 还没有成篇的内容时整块隐藏，不挂空面板。
  if (WRITING.length === 0) {
    return null
  }

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Writing</a>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <div className="relative [--col-left-width:--spacing(16)]">
        <div
          className="pointer-events-none absolute inset-y-0 left-(--col-left-width) -z-1 w-px border-r border-dashed border-line max-sm:hidden"
          aria-hidden
        />

        {WRITING.map((item, index) => (
          <div
            key={item.key}
            className="grid items-start gap-y-1 border-b border-line p-4 last:border-none sm:grid-cols-[var(--col-left-width)_1fr]"
          >
            <span
              className="font-mono text-sm text-muted-foreground/80 select-none"
              aria-hidden
            >
              {(index + 1).toString().padStart(2, "0")}
            </span>

            <div className="flex flex-col gap-1">
              {/*
                The arrow is inline rather than a flex child: a long title wraps
                at narrow widths, and a flex child would be pinned to the right
                edge of the full-width anchor instead of following the text.
              */}
              <a
                className="group font-medium"
                href={item.href}
                target="_blank"
                rel="noopener"
              >
                {item.title}
                <ArrowUpRightIcon className="ml-1 inline-block size-3.5 align-[-0.125em] text-muted-foreground transition-[color,translate] group-hover:-translate-y-px group-hover:text-foreground" />
              </a>
              <p className="text-sm text-balance text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}
