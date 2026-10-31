import React from 'react';
/**
 * Case study hero: spec-sheet header. HUD frame (id, status, coords) + editorial title/intro + metadata grid.
 * Local change vs the DS original: the top strip and the metadata row are inverse blocks
 * (--bg-dark, light text) for contrast. Not pushed back yet.
 */
export function CaseHero({ id = 'JR.CASE.001', title = 'Case Study', intro = '', tag = 'Case Study', status = 'SHIPPED', meta = [], style }) {
  const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)' };
  const rule = '1px solid rgba(241,247,244,0.18)';
  return (
    <section style={{ background: 'var(--bg-1)', border: '1px solid var(--line)', ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', background: 'var(--bg-dark)' }}>
        <span style={{ ...L, color: 'var(--ink-inverse)' }}>{id}</span>
        <span style={{ ...L, color: 'var(--ink-inverse)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, background: 'var(--status-active)' }} />{status}
        </span>
      </div>
      <div style={{ padding: '40px 24px 32px' }}>
        <span style={{ ...L, color: 'var(--accent-ink)' }}>{tag}</span>
        <h1 style={{ margin: '14px 0 0', font: 'var(--text-h1)', color: 'var(--ink-900)', maxWidth: '16ch' }}>{title}</h1>
        {intro && <p style={{ margin: '20px 0 0', font: 'var(--text-body-lg)', color: 'var(--ink-600)', maxWidth: '58ch' }}>{intro}</p>}
      </div>
      {meta.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', background: 'var(--bg-dark)' }}>
          {meta.map((m, i) => (
            <div key={i} style={{ padding: '14px 24px', borderLeft: i > 0 ? rule : 'none' }}>
              <div style={{ ...L, color: 'var(--ink-inverse-dim)' }}>{m.label}</div>
              <div style={{ font: 'var(--text-caption)', color: 'var(--ink-inverse)', marginTop: 6 }}>{m.value}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
