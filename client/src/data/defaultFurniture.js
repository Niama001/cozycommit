// The furniture every new room starts with.
// width = tiles along the x direction, depth = tiles along the y direction,
// height = how tall the box is, measured in tile-heights.
export const defaultFurniture = [
  {
    id: 'bed',
    label: 'Bed',
    gridX: 0,
    gridY: 1,
    width: 2,
    depth: 3,
    height: 0.6,
    color: '#f4b6c2',
    clickable: false,
  },
  {
    id: 'desktop',
    label: 'Desktop',
    gridX: 3,
    gridY: 0,
    width: 2,
    depth: 1,
    height: 1.2,
    color: '#c9d6df',
    clickable: false,
  },
  {
    id: 'laptop',
    label: 'Laptop',
    gridX: 5,
    gridY: 1,
    width: 1,
    depth: 1,
    height: 0.5,
    color: '#b8e0c8',
    clickable: true,
  },
]