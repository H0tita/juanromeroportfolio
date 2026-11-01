import React from 'react';
import { HoverCard } from './HoverCard.jsx';
/**
 * Badge stickers in rows (one row per set) × levels. Each sticker sits flat (front view) at rest;
 * with a mouse over its card it turns left/right with the pointer, between -MAX and +MAX degrees,
 * and a specular band slides across it like light on vinyl.
 * - Die-cut look: a white outline around the PNG's alpha + a soft shadow that shifts with the turn.
 * - Updates go through CSS variables on the stage — no React re-render per move.
 * - Touch and prefers-reduced-motion: stays static in front view.
 */
const MAX = 15;

function Sticker({ src, alt, code, name, text }) {
  const stage = React.useRef(null);
  const set = (ry, sx, lit) => {
    const el = stage.current;
    if (!el) return;
    el.style.setProperty('--ry', ry + 'deg');
    el.style.setProperty('--shx', (ry * -0.4).toFixed(1) + 'px'); // shadow falls away from the turn
    el.style.setProperty('--sx', sx + '%');
    el.style.setProperty('--lit', lit);
  };
  const move = (e) => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const k = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)); // 0 left … 1 right
    stage.current.style.transition = 'transform 80ms linear';
    set(((k - 0.5) * 2 * MAX).toFixed(2), (100 - k * 100).toFixed(1), 1);
  };
  const leave = () => {
    if (stage.current) stage.current.style.transition = 'transform var(--dur-med) var(--ease-hud)';
    set(0, 50, 0);
  };
  const mask = { WebkitMaskImage: `url(${src})`, maskImage: `url(${src})`, WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' };
  const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };
  return (
    <HoverCard style={{ padding: 'clamp(8px, 2.5vw, 16px) clamp(8px, 2.5vw, 16px) clamp(10px, 2.5vw, 18px)', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      <div onPointerMove={move} onPointerLeave={leave} style={{ perspective: 700, padding: 'clamp(2px, 1.5vw, 24px)' }}>
        <div ref={stage} style={{ '--ry': '0deg', '--shx': '0px', '--sx': '50%', '--lit': 0, position: 'relative', aspectRatio: '1', transform: 'rotateY(var(--ry))', transformStyle: 'preserve-3d', willChange: 'transform',
          filter: 'drop-shadow(var(--shx) 6px 8px rgba(14,31,25,0.18))' }}>
          <img src={src} alt={alt} loading="lazy" draggable="false" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain',
            filter: 'drop-shadow(3px 0 0 #fff) drop-shadow(-3px 0 0 #fff) drop-shadow(0 3px 0 #fff) drop-shadow(0 -3px 0 #fff)' }} />
          <span aria-hidden="true" style={{ position: 'absolute', inset: 0, ...mask, opacity: 'var(--lit)', transition: 'opacity var(--dur-med) var(--ease-hud)', mixBlendMode: 'screen', pointerEvents: 'none',
            backgroundImage: 'linear-gradient(105deg, transparent 45%, rgba(255,255,255,0.18) 47.5%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.18) 52.5%, transparent 55%)', backgroundSize: '300% 100%', backgroundPosition: 'var(--sx) 0' }} />
        </div>
      </div>
      <span style={{ ...L, color: 'var(--accent-ink)', marginTop: 8 }}>{code}</span>
      <span style={{ font: 'var(--text-h5)', fontSize: 'clamp(14px, 3.8vw, 20px)', color: 'var(--ink-900)', marginTop: 4 }}>{name}</span>
      <span className="jr-hide-xs" style={{ font: 'var(--text-body-sm)', color: 'var(--ink-600)', marginTop: 4 }}>{text}</span>
    </HoverCard>
  );
}

export function StickerBadges({ rows, levels, src, alt, style }) {
  const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, ...style }}>
      {rows.map((row) => (
        <div key={row.key}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <span style={{ font: 'var(--text-h5)', color: 'var(--ink-900)' }}>{row.name}</span>
            <span style={L}>{row.label}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 'clamp(8px, 2vw, 16px)' }}>
            {levels.map((lv, i) => (
              <Sticker key={lv.code} src={src[row.key][i]} code={lv.code} name={lv.name} text={lv.text}
                alt={alt.replace('{level}', lv.name).replace('{row}', row.name.toLowerCase())} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
