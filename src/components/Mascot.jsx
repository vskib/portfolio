import { useEffect, useRef, useState } from 'react'
import { mascot } from '../data/portfolio'

// Sizes are set by height because your poses are different shapes (full body vs head)
const sizes = {
  xs: 'h-7',
  sm: 'h-14',
  md: 'h-28',
  lg: 'h-72 sm:h-96',
}

// Warm the cache so pose swaps don't flash (the GIFs are large)
export function preload(...keys) {
  keys.forEach((k) => {
    const src = mascot.poses[k]
    if (src) new Image().src = src
  })
}

// Smoothly tilts + shifts the element toward the cursor
function useFollowCursor(ref, enabled, rotate, shift) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let tx = 0, ty = 0 // target (-1..1)
    let x = 0, y = 0   // current, eased toward target
    let raf = 0
    const clamp = (v) => Math.max(-1, Math.min(1, v))

    const apply = () => {
      el.style.transform = `perspective(700px) rotateY(${x * rotate}deg) rotateX(${
        -y * rotate * 0.7
      }deg) translate3d(${x * shift}px, ${y * shift * 0.6}px, 0)`
    }
    const tick = () => {
      x += (tx - x) * 0.1
      y += (ty - y) * 0.1
      apply()
      raf =
        Math.abs(tx - x) > 0.002 || Math.abs(ty - y) > 0.002
          ? requestAnimationFrame(tick)
          : 0
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height * 0.3 // aim at the head
      tx = clamp((e.clientX - cx) / (window.innerWidth / 2))
      ty = clamp((e.clientY - cy) / (window.innerHeight / 2))
      kick()
    }
    const onLeave = () => {
      tx = 0
      ty = 0
      kick()
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
      el.style.transform = ''
    }
  }, [ref, enabled, rotate, shift])
}

/**
 * pose:      key from mascot.poses (wave, peace, hips, laugh, head, waiting, ok)
 * hoverPose: optional pose to show while hovering
 * follow:    tilt toward the cursor
 */
export default function Mascot({
  pose = 'wave',
  hoverPose,
  size = 'lg',
  follow = true,
  float = false,
  rotate = 14,
  shift = 10,
  className = '',
}) {
  const wrapRef = useRef(null)
  const [hover, setHover] = useState(false)
  const [failedSrc, setFailedSrc] = useState(null)
  useFollowCursor(wrapRef, follow, rotate, shift)

  const key = hover && hoverPose ? hoverPose : pose
  const src = mascot.poses[key] ?? mascot.poses.wave
  const alt = `${mascot.name}, my portfolio mascot`

  return (
    <div
      ref={wrapRef}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className={`inline-block shrink-0 will-change-transform ${className}`}
    >
      {failedSrc === src ? (
        <div
          role="img"
          aria-label={alt}
          className={`${sizes[size]} grid aspect-square place-items-center rounded-full bg-mauve/20 font-bold text-mauve`}
        >
          {mascot.name.charAt(0)}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          draggable={false}
          decoding="async"
          onError={() => setFailedSrc(src)}
          className={`${sizes[size]} block w-auto select-none ${
            float ? 'animate-float motion-reduce:animate-none' : ''
          }`}
        />
      )}
    </div>
  )
}