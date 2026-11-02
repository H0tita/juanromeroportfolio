import React from 'react';
import { HoverCard } from '../case/HoverCard.jsx';
/**
 * Iconography module: the HUD glyph set drawn as primitive 1px SVG on a 24-unit box, shown at a
 * selectable size. Strokes use currentColor, so the hover state (ink → mint) is plain CSS colour.
 */
const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };
const GLYPHS = {
  plus: <g><line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /></g>,
  x: <g><line x1="4" y1="4" x2="20" y2="20" /><line x1="20" y1="4" x2="4" y2="20" /></g>,
  target: <g><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /><line x1="12" y1="0" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="24" /></g>,
  brackets: <g><path d="M3 8V3h5M16 3h5v5M21 16v5h-5M8 21H3v-5" /></g>,
  square: <g><rect x="8" y="8" width="8" height="8" fill="currentColor" stroke="none" /><rect x="4" y="4" width="16" height="16" /></g>,
  sparkle: <g strokeWidth="1.5"><line x1="12" y1="3" x2="12" y2="21" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="5.6" y1="5.6" x2="18.4" y2="18.4" /><line x1="18.4" y1="5.6" x2="5.6" y2="18.4" /></g>,
  arrowUp: <g><line x1="6" y1="18" x2="18" y2="6" /><path d="M9 6h9v9" /></g>,
  arrow: <g><line x1="3" y1="12" x2="21" y2="12" /><path d="M15 6l6 6-6 6" /></g>,
  lattice: <g fill="currentColor" stroke="none">{[5, 12, 19].flatMap((x) => [5, 12, 19].map((y) => <circle key={x + '-' + y} cx={x} cy={y} r="1.2" />))}</g>,
};
const SIZES = [16, 24, 48];

export function IconModule({ t }) {
  const [size, setSize] = React.useState(48);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ ...L, color: 'var(--ink-400)' }}>{t.size}</span>
        <div role="radiogroup" aria-label={t.size} style={{ display: 'inline-flex', border: '1px solid var(--line-strong)' }}>
          {SIZES.map((s) => (
            <button key={s} type="button" role="radio" aria-checked={size === s} onClick={() => setSize(s)}
              style={{ ...L, padding: '8px 12px', border: 0, borderRadius: 0, cursor: 'pointer', background: size === s ? 'var(--ink-900)' : 'transparent', color: size === s ? 'var(--ink-inverse)' : 'var(--ink-900)' }}>{s}PX</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
        {Object.entries(GLYPHS).map(([k, g], i) => (
          <HoverCard key={k} style={{ padding: 0 }}>
            <div className="jr-glyph" style={{ height: 112, display: 'grid', placeItems: 'center', borderBottom: '1px solid var(--line-faint)', backgroundImage: 'linear-gradient(var(--line-faint) 1px, transparent 1px), linear-gradient(90deg, var(--line-faint) 1px, transparent 1px)', backgroundSize: '14px 14px', backgroundPosition: 'center' }}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" style={{ transition: 'width var(--dur-med) var(--ease-hud), height var(--dur-med) var(--ease-hud)' }}>{g}</svg>
            </div>
            <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ ...L, color: 'var(--accent-ink)' }}>GLY.{String(i + 1).padStart(2, '0')}</span>
              <span style={{ font: 'var(--text-body-sm)', color: 'var(--ink-900)' }}>{t.names[k]}</span>
            </div>
          </HoverCard>
        ))}
      </div>
      <style>{'.jr-glyph{color:var(--ink-900);transition:color var(--dur-fast) var(--ease-hud)}*:hover>.jr-glyph{color:var(--accent-ink)}'}</style>
    </div>
  );
}
