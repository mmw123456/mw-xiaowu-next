"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

const VIEWBOX_WIDTH = 704

/**
 * The glyphs are rectangles on a 32-unit cell grid, emitted per horizontal run.
 * The same data drives both layers: filled for the body, stroked for the
 * technical-drawing keyline the original logotype had.
 */
const GLYPH_PATH =
  "M0 0h64v32h-64zM256 0h64v32h-64zM0 32h96v32h-96zM224 32h96v32h-96zM0 64h64v32h-64zM96 64h32v32h-32zM192 64h32v32h-32zM256 64h64v32h-64zM0 96h64v32h-64zM128 96h64v32h-64zM256 96h64v32h-64zM0 128h64v32h-64zM256 128h64v32h-64zM0 160h64v32h-64zM256 160h64v32h-64zM0 192h64v32h-64zM256 192h64v32h-64zM0 224h64v32h-64zM256 224h64v32h-64zM384 0h64v32h-64zM640 0h64v32h-64zM384 32h64v32h-64zM640 32h64v32h-64zM384 64h64v32h-64zM640 64h64v32h-64zM384 96h64v32h-64zM640 96h64v32h-64zM384 128h64v32h-64zM512 128h64v32h-64zM640 128h64v32h-64zM384 160h64v32h-64zM480 160h32v32h-32zM576 160h32v32h-32zM640 160h64v32h-64zM384 192h96v32h-96zM608 192h96v32h-96zM384 224h64v32h-64zM640 224h64v32h-64z"

export function SiteFooterInteractiveLogotype() {
  const shouldReduceMotion = useReducedMotion()

  const gradientX1Raw = useMotionValue(0.5)
  const gradientX1 = useSpring(
    useTransform(gradientX1Raw, [0, 1], [0, VIEWBOX_WIDTH]),
    {
      stiffness: 150,
      damping: 25,
    }
  )

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return

    const containerRect = event.currentTarget.getBoundingClientRect()
    gradientX1Raw.set(
      (event.clientX - containerRect.left) / containerRect.width
    )
  }

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return
    gradientX1Raw.set(0.5)
  }

  return (
    <div className="screen-line-bottom after:z-1 after:bg-foreground/15">
      <div
        className="mx-auto w-full max-w-3xl px-2"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex w-full items-end justify-center">
          <svg
            className="h-auto w-full"
            viewBox="0 0 704 256"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={GLYPH_PATH} fill="url(#paint0_linear_1145_73)" />
            <path
              className="stroke-foreground/20"
              d={GLYPH_PATH}
              strokeWidth="2"
            />
            <defs>
              <motion.linearGradient
                id="paint0_linear_1145_73"
                x1={gradientX1}
                y1="1"
                x2="352"
                y2="256"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.625"
                  stopColor="var(--foreground)"
                  stopOpacity="0"
                />
                <stop
                  offset="1"
                  stopColor="var(--foreground)"
                  stopOpacity="0.3"
                />
              </motion.linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-1/2 hidden h-px w-[50%] max-w-full -translate-x-1/2 dark:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0) 0%, rgba(228, 228, 231, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
        aria-hidden
      />
    </div>
  )
}
