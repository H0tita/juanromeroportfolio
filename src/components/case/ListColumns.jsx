import React from 'react';
import { HoverCard } from './HoverCard.jsx';
/**
 * Side-by-side bullet lists in cards (e.g. "the result" vs "the goal"). `tone` sets the bullet
 * colour: 'muted' (grey, for problems) or 'accent' (green, for goals). Stacks on narrow screens.
 */
export function ListColumns({ columns, style }) {
  const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 16, ...style }}>
      {columns.map((c) => {
        const accent = c.tone === 'accent';
        return (
          <HoverCard key={c.title} style={{ padding: '20px 20px 22px' }}>
            <span style={{ ...L, color: accent ? 'var(--accent-ink)' : 'var(--ink-400)' }}>{c.label}</span>
            <h3 style={{ margin: '10px 0 0', font: 'var(--text-h5)', color: 'var(--ink-900)' }}>{c.title}</h3>
            <ul style={{ margin: '14px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {c.items.map((it) => (
                <li key={it} style={{ display: 'flex', gap: 10, font: 'var(--text-body-sm)', color: 'var(--ink-600)' }}>
                  <span aria-hidden="true" style={{ flex: 'none', width: 6, height: 6, marginTop: 8, background: accent ? 'var(--accent)' : 'var(--ink-400)' }} />{it}
                </li>
              ))}
            </ul>
          </HoverCard>
        );
      })}
    </div>
  );
}
