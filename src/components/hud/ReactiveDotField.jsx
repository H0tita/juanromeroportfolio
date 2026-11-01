import React from 'react';
/**
 * Hero dot lattice that reacts like a radar: a mint layer of dots is revealed in a halo around
 * the pointer, and a crosshair with a live LAT/LON readout follows it (base: Madrid).
 * - Pointer tracking listens on the parent (the hero), so text over the field doesn't block it.
 * - Position updates go through CSS variables / refs — no React re-render per move.
 * - Touch devices (no hover): the halo sweeps slowly on its own while the hero is on screen.
 * - Pulse: like a slow heartbeat, a ring of lit dots expands from a random spot of the field
 *   (a new one each beat, in the visible right-hand part) to hint that it is interactive. With the pointer over the field no new pulse starts, but the one
 *   in flight finishes fading (the CSS animation is only removed at an iteration boundary). Paused
 *   off screen. Animated in CSS through a registered custom property (--jr-pr).
 * - Pulse × pointer: the ring parts around the pointer halo (a hole with a small gap, --hx/--hy)
 *   and, where it meets the halo, lights an arc that borders it.
 * - prefers-reduced-motion: no automatic sweep and no pulse (pointer tracking stays, it is user-driven).
 */
const BASE = { lat: 40.4168, lon: -3.7038 };
const DEG_PER_PX = 0.00002;
const PULSE = 'jr-dot-pulse 3200ms cubic-bezier(0.3, 0.6, 0.4, 1) infinite';

export function ReactiveDotField({ gap = 22, dot = 1.5, color = 'var(--line)', litColor = 'var(--accent)', radius = 150, fade = 'left', style }) {
  const field = React.useRef(null);
  const cross = React.useRef(null);
  const readout = React.useRef(null);
  const ringEl = React.useRef(null);

  React.useEffect(() => {
    const el = field.current;
    const host = el && el.parentElement;
    if (!el || !host) return;
    const ring = ringEl.current;
    let sweep = 0, visible = true, hovering = false, beating = false;
    let ox = 0.6, oy = 0.5;
    // New origin for the next beat, far enough from the last one so it reads as a different spot.
    const relocate = () => {
      let x, y;
      do { x = 0.4 + Math.random() * 0.5; y = 0.15 + Math.random() * 0.7; } while (Math.hypot(x - ox, y - oy) < 0.25);
      ox = x; oy = y;
      ring.style.setProperty('--jr-cx', (x * 100).toFixed(1) + '%');
      ring.style.setProperty('--jr-cy', (y * 100).toFixed(1) + '%');
    };
    const beat = (delay) => { beating = true; relocate(); ring.style.animation = `${PULSE} ${delay}ms`; };
    // Each iteration ends with the ring faded out: move it (invisible jump), or stop there if the
    // pointer is in the field.
    const onIteration = () => { if (hovering) { ring.style.animation = 'none'; beating = false; } else relocate(); };
    const pause = (paused) => { ring.style.animationPlayState = paused ? 'paused' : 'running'; };
    const set = (x, y, on, showCross) => {
      el.style.setProperty('--mx', x + 'px');
      el.style.setProperty('--my', y + 'px');
      el.style.setProperty('--lit', on ? '1' : '0');
      el.style.setProperty('--hx', on ? x + 'px' : '-9999px');
      el.style.setProperty('--hy', on ? y + 'px' : '-9999px');
      if (cross.current) {
        cross.current.style.opacity = showCross ? '1' : '0';
        cross.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (readout.current && showCross) {
        const r = el.getBoundingClientRect();
        const lat = BASE.lat - (y - r.height / 2) * DEG_PER_PX;
        const lon = BASE.lon + (x - r.width / 2) * DEG_PER_PX;
        readout.current.textContent = `LAT ${lat.toFixed(4)} · LON ${lon.toFixed(4)}`;
        // Flip the readout to the left of the crosshair near the right edge so it isn't clipped.
        readout.current.style.transform = x > r.width - readout.current.offsetWidth - 32 ? 'translateX(calc(-100% - 32px))' : 'none';
      }
    };

    const touch = window.matchMedia('(hover: none)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) { ring.addEventListener('animationiteration', onIteration); beat(800); }

    if (touch) {
      if (reduce) return;
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; pause(!visible); if (visible) loop(); });
      const start = performance.now();
      const loop = () => {
        cancelAnimationFrame(sweep);
        if (!visible) return;
        const t = (performance.now() - start) / 1000;
        const r = el.getBoundingClientRect();
        set(r.width * (0.5 + 0.35 * Math.sin(t * 0.35)), r.height * (0.5 + 0.35 * Math.sin(t * 0.22 + 1)), true, false);
        sweep = requestAnimationFrame(loop);
      };
      io.observe(el);
      return () => { io.disconnect(); cancelAnimationFrame(sweep); };
    }

    // Pointer events already arrive at frame rate and only two CSS variables change, so the
    // update runs directly in the handler (no rAF needed).
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      set(x, y, inside, inside);
      hovering = inside;
      if (!inside && !beating && !reduce) beat(600);
    };
    const leave = () => {
      el.style.setProperty('--lit', '0');
      el.style.setProperty('--hx', '-9999px');
      if (cross.current) cross.current.style.opacity = '0';
      hovering = false;
      if (!beating && !reduce) beat(600);
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; pause(!visible); });
    io.observe(el);
    host.addEventListener('pointermove', move);
    host.addEventListener('pointerleave', leave);
    return () => {
      io.disconnect();
      ring.removeEventListener('animationiteration', onIteration);
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerleave', leave);
    };
  }, []);

  const masks = {
    none: undefined,
    left: 'linear-gradient(to right, transparent, black 30%)',
    right: 'linear-gradient(to left, transparent, black 30%)',
  };
  const lattice = (c, d) => ({ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, ${c} ${d}px, transparent ${d}px)`, backgroundSize: `${gap}px ${gap}px` });
  const halo = `radial-gradient(circle ${radius}px at var(--mx, -999px) var(--my, -999px), black 0%, transparent 100%)`;
  const ringMask = 'radial-gradient(circle at var(--jr-cx, 50%) var(--jr-cy, 50%), transparent calc(var(--jr-pr) - 90px), black calc(var(--jr-pr) - 12px), transparent var(--jr-pr))';
  const hole = (a, b) => `radial-gradient(circle at var(--hx, -9999px) var(--hy, -9999px), ${a})`;
  const outsideHalo = hole(`transparent ${radius + 6}px, black ${radius + 20}px`);
  const haloEdge = hole(`transparent ${radius + 8}px, black ${radius + 16}px, black ${radius + 30}px, transparent ${radius + 40}px`);
  // Wider band around the ring: decides which part of the halo edge the passing ring lights up.
  const nearRing = 'radial-gradient(circle at var(--jr-cx, 50%) var(--jr-cy, 50%), transparent calc(var(--jr-pr) - 220px), black calc(var(--jr-pr) - 60px), black calc(var(--jr-pr) + 40px), transparent calc(var(--jr-pr) + 120px))';
  const both = (a, b) => ({ WebkitMaskImage: `${a}, ${b}`, maskImage: `${a}, ${b}`, WebkitMaskComposite: 'source-in', maskComposite: 'intersect' });

  return (
    <div ref={field} aria-hidden="true" style={{ position: 'relative', pointerEvents: 'none', ...style }}>
      <div style={{ position: 'absolute', inset: 0, WebkitMaskImage: masks[fade], maskImage: masks[fade] }}>
        <div style={lattice(color, dot)} />
        <div style={{ ...lattice(litColor, dot + 0.7), WebkitMaskImage: halo, maskImage: halo, opacity: 'var(--lit, 0)', transition: 'opacity var(--dur-med) var(--ease-hud)' }} />
        <div ref={ringEl} style={{ position: 'absolute', inset: 0, opacity: 0 }}>
          <div style={{ ...lattice(litColor, dot + 1.1), ...both(ringMask, outsideHalo) }} />
          <div style={{ ...lattice(litColor, dot + 1.1), ...both(haloEdge, nearRing) }} />
        </div>
      </div>
      <style>{'@property --jr-pr{syntax:"<length>";inherits:true;initial-value:0px}@keyframes jr-dot-pulse{0%{--jr-pr:0px;opacity:1}30%{opacity:1}85%{--jr-pr:820px;opacity:0}100%{--jr-pr:820px;opacity:0}}'}</style>
      <div ref={cross} style={{ position: 'absolute', left: 0, top: 0, opacity: 0, transition: 'opacity var(--dur-fast) var(--ease-hud)', willChange: 'transform' }}>
        <svg width="22" height="22" viewBox="0 0 22 22" style={{ position: 'absolute', left: -11, top: -11 }}>
          <g stroke="var(--accent-ink)" strokeWidth="1"><line x1="11" y1="0" x2="11" y2="8" /><line x1="11" y1="14" x2="11" y2="22" /><line x1="0" y1="11" x2="8" y2="11" /><line x1="14" y1="11" x2="22" y2="11" /></g>
          <rect x="9.5" y="9.5" width="3" height="3" fill="var(--accent)" />
        </svg>
        <span ref={readout} style={{ position: 'absolute', left: 16, top: 14, whiteSpace: 'nowrap', font: 'var(--text-micro)', letterSpacing: 'var(--tracking-micro)', color: 'var(--accent-ink)', background: 'var(--bg-0)', padding: '2px 6px', border: '1px solid var(--line)' }} />
      </div>
    </div>
  );
}
