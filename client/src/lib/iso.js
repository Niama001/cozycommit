// Size of one floor tile, in pixels (a flat diamond, twice as wide as it is tall).
export const TILE_W = 64
export const TILE_H = 32

// The room is ROOM_SIZE x ROOM_SIZE tiles. Walls are WALL_H pixels tall.
export const ROOM_SIZE = 8
export const WALL_H = 120

// Where tile (0, 0) sits on screen: the top corner of the floor.
export const ORIGIN = { x: (ROOM_SIZE * TILE_W) / 2, y: WALL_H + 10 }

// Size of the whole drawing, used for the SVG viewBox.
export const ROOM_WIDTH_PX = ROOM_SIZE * TILE_W
export const ROOM_HEIGHT_PX = ORIGIN.y + ROOM_SIZE * TILE_H + 10

// Convert a grid position into pixel coordinates on screen.
// Moving +1 in x goes down-right; moving +1 in y goes down-left.
export function gridToScreen(gridX, gridY) {
  return {
    x: ORIGIN.x + (gridX - gridY) * (TILE_W / 2),
    y: ORIGIN.y + (gridX + gridY) * (TILE_H / 2),
  }
}

// Draw order: items closer to the viewer (bigger x + y) are drawn later,
// so they appear in front of items behind them.
export function sortByDepth(items) {
  const depth = (item) => item.gridX + item.width + item.gridY + item.depth
  return [...items].sort((a, b) => depth(a) - depth(b))
}

// Turn a list of {x, y} points into the "x,y x,y ..." text that SVG polygons need.
export function toPoints(points) {
  return points.map((p) => `${p.x},${p.y}`).join(' ')
}