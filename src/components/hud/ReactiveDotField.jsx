import React from 'react';
/**
 * Hero dot lattice that reacts like a radar: a mint layer of dots is revealed in a halo around
 * the pointer, and a crosshair with a live LAT/LON readout follows it (base: Madrid).
 * - Pointer tracking listens on the parent (the hero), so text over the field doesn't block it.
 * - Position updates go through CSS variables / refs — no React re-render per move.
 * - Touch devices (no hover): the halo sweeps slowly on its own while the hero is on screen.
 * - prefers-reduced-motion: no automatic sweep (pointer tracking stays, it is user-driven).
 */
const BASE = { lat: 40.4168, lon: -3.7038 };
const DEG_PER_PX = 0.00002;

export function ReactiveDotField({ gap = 22, dot = 1.5, color = 'var(--line)', litColor = 'var(--accent)', radius = 150, fade = 'left', style }) {
  const field = React.useRef(null);
  const cross = React.useRef(null);
  const readout = React.useRef(null);

  React.useEffect(() => {
    const el = field.current;
    const host = el && el.parentElement;
    if (!el || !host) return;
    let sweep = 0, visible = true;
    const set = (x, y, on, showCross) => {
      el.style.setProperty('--mx', x + 'px');
      el.style.setProperty('--my', y + 'px');
      el.style.setProperty('--lit', on ? '1' : '0');
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

    if (touch) {
      if (reduce) return;
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) loop(); });
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
    };
    const leave = () => { el.style.setProperty('--lit', '0'); if (cross.current) cross.current.style.opacity = '0'; };
    host.addEventListener('pointermove', move);
    host.addEventListener('pointerleave', leave);
    return () => { host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave); };
  }, []);

  const masks = {
    none: undefined,
    left: 'linear-gradient(to right, transparent, black 40%)',
    right: 'linear-gradient(to left, transparent, black 40%)',
  };
  const lattice = (c, d) => ({ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, ${c} ${d}px, transparent ${d}px)`, backgroundSize: `${gap}px ${gap}px` });
  const halo = `radial-gradient(circle ${radius}px at var(--mx, -999px) var(--my, -999px), black 0%, transparent 100%)`;

  return (
    <div ref={field} aria-hidden="true" style={{ position: 'relative', pointerEvents: 'none', ...style }}>
      <div style={{ position: 'absolute', inset: 0, WebkitMaskImage: masks[fade], maskImage: masks[fade] }}>
        <div style={lattice(color, dot)} />
        <div style={{ ...lattice(litColor, dot + 0.7), WebkitMaskImage: halo, maskImage: halo, opacity: 'var(--lit, 0)', transition: 'opacity var(--dur-med) var(--ease-hud)' }} />
      </div>
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
