import React from 'react';
import { HoverCard } from './HoverCard.jsx';
/**
 * Gallery of design pieces (`ratio` = plate shape, `min` = min column width): each image shown
 * whole (contain) on a white plate, HUD label + caption.
 */
export function PiecesGallery({ items, ratio = '4/5', min = 240, style }) {
  const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, ' + min + 'px), 1fr))', gap: 16, ...style }}>
      {items.map((it) => (
        <HoverCard key={it.label} style={{ padding: 16, display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'relative', aspectRatio: ratio, background: 'var(--bg-2)' }}>
            <img src={it.src} alt={it.alt} loading="lazy" style={{ position: 'absolute', inset: 16, width: 'calc(100% - 32px)', height: 'calc(100% - 32px)', objectFit: 'contain' }} />
          </div>
          <span style={{ ...L, color: 'var(--accent-ink)', marginTop: 14 }}>{it.label}</span>
          {it.caption && <span style={{ font: 'var(--text-body-sm)', color: 'var(--ink-600)', marginTop: 4 }}>{it.caption}</span>}
        </HoverCard>
      ))}
    </div>
  );
}
