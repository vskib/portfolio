import { useState } from 'react'
import { mascot } from '../data/portfolio'
import { useMascot } from '../context/MascotContext'

const INK = '#11111b'

const sizes = {
  xs: 'h-6 w-6',
  sm: 'h-12 w-12',
  md: 'h-20 w-20',
  lg: 'h-52 w-52 sm:h-64 sm:w-64',
}

/* ---------- shared face parts (react to mood) ---------- */
// mood: 'idle' | 'happy' | 'working' | 'error'
function Eyes({ lx, rx, y, mood, color = INK }) {
  const s = { stroke: color, strokeWidth: 5, strokeLinecap: 'round', fill: 'none' }
  const one = (x) => {
    if (mood === 'happy')
      return <path d={`M${x - 8} ${y + 4} Q${x} ${y - 8} ${x + 8} ${y + 4}`} {...s} />
    if (mood === 'working') return <path d={`M${x - 8} ${y} H${x + 8}`} {...s} />
    if (mood === 'error')
      return (
        <path
          d={`M${x - 6} ${y - 6} L${x + 6} ${y + 6} M${x + 6} ${y - 6} L${x - 6} ${y + 6}`}
          {...s}
        />
      )
    return <circle cx={x} cy={y} r={7} fill={color} />
  }
  return (
    <>
      <g>{one(lx)}</g>
      <g>{one(rx)}</g>
    </>
  )
}

function Mouth({ x, y, mood, color = INK }) {
  const s = { stroke: color, strokeWidth: 4, strokeLinecap: 'round', fill: 'none' }
  if (mood === 'happy')
    return <path d={`M${x - 14} ${y} Q${x} ${y + 18} ${x + 14} ${y}Z`} fill={color} />
  if (mood === 'error')
    return <path d={`M${x - 10} ${y + 8} Q${x} ${y - 4} ${x + 10} ${y + 8}`} {...s} />
  if (mood === 'working') return <circle cx={x} cy={y + 3} r={4} fill={color} />
  return <path d={`M${x - 10} ${y} Q${x} ${y + 9} ${x + 10} ${y}`} {...s} />
}

/* ---------- mascot templates ---------- */
const Penguin = ({ mood }) => (
  <>
    <ellipse cx="100" cy="112" rx="62" ry="74" fill="#313244" />
    <path d="M40 105 Q22 130 38 160 Q50 150 52 120Z" fill="#313244" />
    <path d="M160 105 Q178 130 162 160 Q150 150 148 120Z" fill="#313244" />
    <ellipse cx="100" cy="128" rx="40" ry="52" fill="#cdd6f4" />
    <ellipse cx="80" cy="82" rx="16" ry="18" fill="#cdd6f4" />
    <ellipse cx="120" cy="82" rx="16" ry="18" fill="#cdd6f4" />
    <Eyes lx={80} rx={120} y={84} mood={mood} />
    <path d="M88 98 Q100 92 112 98 L100 114Z" fill="#fab387" />
    <ellipse cx="72" cy="182" rx="20" ry="7" fill="#fab387" />
    <ellipse cx="128" cy="182" rx="20" ry="7" fill="#fab387" />
  </>
)

const Cat = ({ mood }) => (
  <>
    <path d="M42 78 L34 28 L84 56Z" fill="#fab387" />
    <path d="M158 78 L166 28 L116 56Z" fill="#fab387" />
    <path d="M48 70 L44 42 L72 58Z" fill="#f5c2e7" />
    <path d="M152 70 L156 42 L128 58Z" fill="#f5c2e7" />
    <rect x="30" y="48" width="140" height="130" rx="62" fill="#fab387" />
    <path
      d="M100 52 V68 M86 54 L88 68 M114 54 L112 68"
      stroke="#e8935f"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <Eyes lx={72} rx={128} y={104} mood={mood} />
    <path d="M94 120 H106 L100 128Z" fill="#f38ba8" />
    <Mouth x={100} y={134} mood={mood} />
    <path
      d="M52 124 H20 M52 134 L24 142 M148 124 H180 M148 134 L176 142"
      stroke={INK}
      strokeWidth="3"
      strokeLinecap="round"
      opacity=".5"
    />
  </>
)

const Robot = ({ mood }) => (
  <>
    <line x1="100" y1="24" x2="100" y2="46" stroke="#7f849c" strokeWidth="5" strokeLinecap="round" />
    <circle cx="100" cy="20" r="8" fill="#f38ba8" />
    <rect x="14" y="88" width="16" height="36" rx="6" fill="#74c7ec" />
    <rect x="170" y="88" width="16" height="36" rx="6" fill="#74c7ec" />
    <rect x="26" y="44" width="148" height="124" rx="26" fill="#89b4fa" />
    <rect x="42" y="62" width="116" height="80" rx="16" fill={INK} />
    <Eyes lx={74} rx={126} y={96} mood={mood} color="#a6e3a1" />
    <Mouth x={100} y={120} mood={mood} color="#a6e3a1" />
    <rect x="70" y="168" width="60" height="16" rx="6" fill="#585b70" />
  </>
)

const Ghost = ({ mood }) => (
  <>
    <path
      d="M36 100 C36 50 66 26 100 26 C134 26 164 50 164 100 V176 L142 160 L121 178 L100 160 L79 178 L58 160 L36 176 Z"
      fill="#cdd6f4"
    />
    <ellipse cx="58" cy="116" rx="11" ry="6" fill="#f5c2e7" opacity=".75" />
    <ellipse cx="142" cy="116" rx="11" ry="6" fill="#f5c2e7" opacity=".75" />
    <Eyes lx={78} rx={122} y={96} mood={mood} />
    <Mouth x={100} y={122} mood={mood} />
  </>
)

const Blob = ({ mood }) => (
  <>
    <path d="M100 48 C100 30 112 22 124 24 C122 38 112 46 100 48Z" fill="#94e2d5" />
    <path
      d="M30 160 C20 100 50 46 100 46 C150 46 180 100 170 160 C168 176 150 182 100 182 C50 182 32 176 30 160Z"
      fill="#a6e3a1"
    />
    <ellipse cx="72" cy="80" rx="14" ry="8" fill="#fff" opacity=".35" transform="rotate(-25 72 80)" />
    <Eyes lx={74} rx={126} y={116} mood={mood} />
    <Mouth x={100} y={140} mood={mood} />
  </>
)

export const templates = [
  { id: 'penguin', label: 'Penguin', Art: Penguin },
  { id: 'cat', label: 'Cat', Art: Cat },
  { id: 'robot', label: 'Robot', Art: Robot },
  { id: 'ghost', label: 'Ghost', Art: Ghost },
  { id: 'blob', label: 'Blob', Art: Blob },
]

export const pickerOptions = [
  ...templates,
  ...(mascot.customSrc ? [{ id: 'custom', label: 'Custom' }] : []),
]

/* ---------- renderers ---------- */
export function MascotArt({ id, size = 'md', mood = 'idle', float = false, className = '' }) {
  const [imgFailed, setImgFailed] = useState(false)
  const alt = `${mascot.name}, my portfolio mascot`
  const base = `${sizes[size]} shrink-0 select-none ${
    float ? 'animate-float motion-reduce:animate-none' : ''
  } ${className}`

  if (id === 'custom' && mascot.customSrc && !imgFailed) {
  const small = size === 'xs' || size === 'sm'
  const src =
    (small && mascot.customHeads?.[mood]) ||
    mascot.customPoses?.[mood] ||
    mascot.customSrc

  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      onError={() => setImgFailed(true)}
      className={`${base} object-contain`}
    />
  )
}

  const { Art } = templates.find((t) => t.id === id) ?? templates[0]
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={alt} className={base}>
      <ellipse cx="100" cy="190" rx="52" ry="6" fill="#000" opacity=".3" />
      <Art mood={mood} />
    </svg>
  )
}

// Uses whichever mascot the visitor picked
export default function Mascot(props) {
  const { template } = useMascot()
  return <MascotArt id={template} {...props} />
}