import React from 'react';
/** Horizontal process timeline: numbered phases on a ruled track. */
export function ProcessTimeline({ moduleId = 'MOD.02', phases = [], activeIndex = -1, style }) {
  const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)' };
  return (
    <section style={{ padding: '32px 0', borderTop: '1px solid var(--line-strong)', ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <span style={{ ...L, color: 'var(--accent-ink)' }}>{moduleId}</span>
        <span style={L}>PROCESS / {phases.length} PHASES</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + Math.max(phases.length, 1) + ', 1fr)', gap: 0 }}>
        {phases.map((p, i) => {
          const on = i <= activeIndex || activeIndex === -1;
          return (
            <div key={i} style={{ borderTop: '2px solid ' + (on ? 'var(--accent)' : 'var(--line)'), padding: '16px 16px 0 0', position: 'relative' }}>
              <span style={{ position: 'absolute', top: -5, left: 0, width: 8, height: 8, background: on ? 'var(--accent)' : 'var(--line)' }} />
              <div style={{ font: 'var(--text-data-lg)', color: on ? 'var(--ink-900)' : 'var(--ink-400)' }}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{ font: 'var(--text-h6)', color: 'var(--ink-900)', marginTop: 8 }}>{p.title}</div>
              {p.duration && <div style={{ ...L, marginTop: 6 }}>{p.duration}</div>}
              {p.description && <p style={{ margin: '10px 0 0', font: 'var(--text-body-sm)', color: 'var(--ink-600)', paddingRight: 8 }}>{p.description}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
