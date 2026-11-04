import {
  ROOM_SIZE,
  TILE_H,
  WALL_H,
  ROOM_WIDTH_PX,
  ROOM_HEIGHT_PX,
  gridToScreen,
  sortByDepth,
  toPoints,
} from '../lib/iso'

const OUTLINE = '#6b4f3a'

// The two back walls, meeting at the top corner of the room.
function Walls() {
  const raise = (p) => ({ x: p.x, y: p.y - WALL_H })
  const corner = gridToScreen(0, 0)
  const rightEnd = gridToScreen(ROOM_SIZE, 0)
  const leftEnd = gridToScreen(0, ROOM_SIZE)

  return (
    <g>
      <polygon
        points={toPoints([corner, rightEnd, raise(rightEnd), raise(corner)])}
        fill="#fbe7e0"
        stroke="#e6cfc5"
      />
      <polygon
        points={toPoints([corner, leftEnd, raise(leftEnd), raise(corner)])}
        fill="#f8ddd3"
        stroke="#e6cfc5"
      />
    </g>
  )
}

// The floor: one diamond per tile, in a soft checkerboard pattern.
function Floor() {
  const tiles = []
  for (let x = 0; x < ROOM_SIZE; x++) {
    for (let y = 0; y < ROOM_SIZE; y++) {
      const corners = [
        gridToScreen(x, y),
        gridToScreen(x + 1, y),
        gridToScreen(x + 1, y + 1),
        gridToScreen(x, y + 1),
      ]
      tiles.push(
        <polygon
          key={`${x}-${y}`}
          points={toPoints(corners)}
          fill={(x + y) % 2 === 0 ? '#f0d9b5' : '#ead0a8'}
          stroke="#dcc193"
          strokeWidth="1"
        />
      )
    }
  }
  return <g>{tiles}</g>
}

// A placeholder piece of furniture: a box with a top, a left side, and a right side.
function FurnitureBox({ item, onClick }) {
  const { gridX, gridY, width, depth, height, color, label } = item
  const lift = height * TILE_H

  // The four corners of the footprint on the floor.
  const A = gridToScreen(gridX, gridY)
  const B = gridToScreen(gridX + width, gridY)
  const C = gridToScreen(gridX + width, gridY + depth)
  const D = gridToScreen(gridX, gridY + depth)
  const up = (p) => ({ x: p.x, y: p.y - lift })

  const topFace = [A, B, C, D].map(up)
  const leftFace = [D, C, up(C), up(D)]
  const rightFace = [C, B, up(B), up(C)]

  const labelX = (A.x + C.x) / 2
  const labelY = (A.y + C.y) / 2 - lift

  return (
    <g onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <polygon
        points={toPoints(leftFace)}
        fill={color}
        stroke={OUTLINE}
        style={{ filter: 'brightness(0.88)' }}
      />
      <polygon
        points={toPoints(rightFace)}
        fill={color}
        stroke={OUTLINE}
        style={{ filter: 'brightness(0.75)' }}
      />
      <polygon points={toPoints(topFace)} fill={color} stroke={OUTLINE} />
      <text
        x={labelX}
        y={labelY}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="11"
        fill="#4a3728"
        style={{ pointerEvents: 'none' }}
      >
        {label}
      </text>
    </g>
  )
}

export default function Room({ furniture, onItemClick }) {
  return (
    <svg
      className="room"
      viewBox={`0 0 ${ROOM_WIDTH_PX} ${ROOM_HEIGHT_PX}`}
      role="img"
      aria-label="Your cozy room"
    >
      <Walls />
      <Floor />
      {sortByDepth(furniture).map((item) => (
        <FurnitureBox
          key={item.id}
          item={item}
          onClick={item.clickable ? () => onItemClick(item) : undefined}
        />
      ))}
    </svg>
  )
}