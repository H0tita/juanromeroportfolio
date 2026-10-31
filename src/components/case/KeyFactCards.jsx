import React from 'react';
import { HoverCard } from './HoverCard.jsx';
/** Row of key-fact cards: HUD label, big mono figure + editorial unit, short explanation. Long figures (words) step down in size; 4 cards lay out 2×2 to avoid an orphan. Shared HoverCard state. */
export function KeyFactCards({ facts, style }) {
  const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)' };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: facts.length === 4 ? 'repeat(auto-fit, minmax(min(100%, max(190px, calc(50% - 8px))), 1fr))' : 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16, ...style }}>
      {facts.map((f) => (
        <HoverCard key={f.label} style={{ padding: '20px 20px 22px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ ...L, color: 'var(--accent-ink)' }}>{f.label}</span>
          <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', columnGap: 8, marginTop: 14 }}>
            <span style={{ font: (f.value.length > 3 ? '700 clamp(32px, 3vw, 40px)' : '700 clamp(56px, 6vw, 80px)') + '/0.95 var(--font-mono)', color: 'var(--ink-900)', letterSpacing: '-0.02em' }}>{f.value}</span>
            <span style={{ font: 'var(--text-h5)', color: 'var(--ink-900)' }}>{f.unit}</span>
          </div>
          <p style={{ margin: '14px 0 0', font: 'var(--text-body-sm)', color: 'var(--ink-600)' }}>{f.text}</p>
        </HoverCard>
      ))}
    </div>
  );
}
