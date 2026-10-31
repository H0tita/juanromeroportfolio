import React from 'react';
/** Results grid: big mono numbers with delta arrows, dashboard style. `source` labels data provenance (VERIFIED, REPORTED...). */
export function MetricsBlock({ moduleId = 'MOD.03', title = 'Results', source = 'VERIFIED', metrics = [], note, style }) {
  const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)' };
  return (
    <section style={{ padding: '32px 0', borderTop: '1px solid var(--line-strong)', ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <span style={{ ...L, color: 'var(--accent-ink)' }}>{moduleId}</span>
        <span style={L}>{title.toUpperCase()} / {source}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 1, background: 'var(--line)', border: '1px solid var(--line)' }}>
        {metrics.map((m, i) => {
          const neg = m.direction === 'down';
          const good = m.positive !== false;
          return (
            <div key={i} style={{ background: 'var(--bg-1)', padding: '20px' }}>
              <div style={{ font: '700 clamp(28px, 3vw, 40px)/1 var(--font-mono)', color: good ? 'var(--accent-ink)' : 'var(--status-alert-ink)' }}>
                {m.direction && <span aria-hidden="true">{neg ? '↓' : '↑'}</span>}{m.value}
              </div>
              <div style={{ ...L, marginTop: 10, color: 'var(--ink-600)' }}>{m.label}</div>
              {m.caption && <div style={{ font: 'var(--text-micro)', color: 'var(--ink-400)', marginTop: 4 }}>{m.caption}</div>}
            </div>
          );
        })}
      </div>
      {note && <p style={{ margin: '14px 0 0', font: 'var(--text-caption)', color: 'var(--ink-400)' }}>{note}</p>}
    </section>
  );
}
