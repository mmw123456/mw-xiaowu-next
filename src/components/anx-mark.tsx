/**
 * Monogram: "MW", drawn on the same 32-unit cell grid the rest of the brand
 * geometry uses. Regenerate the path by editing the glyph matrices, not by
 * hand — every run is a whole number of cells.
 */
export function AnxMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 704 256"
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        d="M0 0h64v32h-64zM256 0h64v32h-64zM0 32h96v32h-96zM224 32h96v32h-96zM0 64h64v32h-64zM96 64h32v32h-32zM192 64h32v32h-32zM256 64h64v32h-64zM0 96h64v32h-64zM128 96h64v32h-64zM256 96h64v32h-64zM0 128h64v32h-64zM256 128h64v32h-64zM0 160h64v32h-64zM256 160h64v32h-64zM0 192h64v32h-64zM256 192h64v32h-64zM0 224h64v32h-64zM256 224h64v32h-64zM384 0h64v32h-64zM640 0h64v32h-64zM384 32h64v32h-64zM640 32h64v32h-64zM384 64h64v32h-64zM640 64h64v32h-64zM384 96h64v32h-64zM640 96h64v32h-64zM384 128h64v32h-64zM512 128h64v32h-64zM640 128h64v32h-64zM384 160h64v32h-64zM480 160h32v32h-32zM576 160h32v32h-32zM640 160h64v32h-64zM384 192h96v32h-96zM608 192h96v32h-96zM384 224h64v32h-64zM640 224h64v32h-64z"
      />
    </svg>
  )
}

export function getMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 704 256"><path fill="currentColor" d="M0 0h64v32h-64zM256 0h64v32h-64zM0 32h96v32h-96zM224 32h96v32h-96zM0 64h64v32h-64zM96 64h32v32h-32zM192 64h32v32h-32zM256 64h64v32h-64zM0 96h64v32h-64zM128 96h64v32h-64zM256 96h64v32h-64zM0 128h64v32h-64zM256 128h64v32h-64zM0 160h64v32h-64zM256 160h64v32h-64zM0 192h64v32h-64zM256 192h64v32h-64zM0 224h64v32h-64zM256 224h64v32h-64zM384 0h64v32h-64zM640 0h64v32h-64zM384 32h64v32h-64zM640 32h64v32h-64zM384 64h64v32h-64zM640 64h64v32h-64zM384 96h64v32h-64zM640 96h64v32h-64zM384 128h64v32h-64zM512 128h64v32h-64zM640 128h64v32h-64zM384 160h64v32h-64zM480 160h32v32h-32zM576 160h32v32h-32zM640 160h64v32h-64zM384 192h96v32h-96zM608 192h96v32h-96zM384 224h64v32h-64zM640 224h64v32h-64z"/></svg>`
}
