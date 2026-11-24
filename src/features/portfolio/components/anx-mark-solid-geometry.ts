export const VIEW_WIDTH = 704
export const VIEW_HEIGHT = 256

/** Extrusion direction and depth, in viewBox units. */
export const DEPTH_X = 26
export const DEPTH_Y = 26
export const STEPS = 14

/** How far the face retreats when pressed, as a fraction of the depth. */
export const PRESS_FRACTION = 0.62

export const GLYPH_PATH =
  "M0 0h64v32h-64zM256 0h64v32h-64zM0 32h96v32h-96zM224 32h96v32h-96zM0 64h64v32h-64zM96 64h32v32h-32zM192 64h32v32h-32zM256 64h64v32h-64zM0 96h64v32h-64zM128 96h64v32h-64zM256 96h64v32h-64zM0 128h64v32h-64zM256 128h64v32h-64zM0 160h64v32h-64zM256 160h64v32h-64zM0 192h64v32h-64zM256 192h64v32h-64zM0 224h64v32h-64zM256 224h64v32h-64zM384 0h64v32h-64zM640 0h64v32h-64zM384 32h64v32h-64zM640 32h64v32h-64zM384 64h64v32h-64zM640 64h64v32h-64zM384 96h64v32h-64zM640 96h64v32h-64zM384 128h64v32h-64zM512 128h64v32h-64zM640 128h64v32h-64zM384 160h64v32h-64zM480 160h32v32h-32zM576 160h32v32h-32zM640 160h64v32h-64zM384 192h96v32h-96zM608 192h96v32h-96zM384 224h64v32h-64zM640 224h64v32h-64z"

/** Offset fractions from the face (0) back to the full depth (1). */
export function getLayers() {
  return Array.from({ length: STEPS + 1 }, (_, i) => 1 - i / STEPS)
}
