import React from 'react';
/**
 * Usability-test findings: dimension rows × pros / cons columns, HUD table. Empty cell (null)
 * renders as a dash. Below 768px each row becomes a stacked card (dimension → pros → cons).
 */
export function UsabilityTable({ cols, rows, style }) {
  const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)' };
  const cell = { padding: '12px 16px', font: 'var(--text-body-sm)', color: 'var(--ink-600)', borderTop: '1px solid var(--line)', verticalAlign: 'top', textAlign: 'left' };
  const dot = (bg) => <span style={{ display: 'inline-block', width: 8, height: 8, background: bg, marginRight: 8 }} />;
  return (
    <>
      <table className="jr-only-desktop" style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--bg-1)', border: '1px solid var(--line)', ...style }}>
        <thead>
          <tr>
            <th scope="col" style={{ ...cell, ...L, borderTop: 'none', width: '22%' }}>{cols.dim}</th>
            <th scope="col" style={{ ...cell, ...L, borderTop: 'none', color: 'var(--accent-ink)' }}>{dot('var(--status-active)')}{cols.pro}</th>
            <th scope="col" style={{ ...cell, ...L, borderTop: 'none', color: 'var(--status-alert-ink)' }}>{dot('var(--status-alert)')}{cols.con}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.dim}>
              <th scope="row" style={{ ...cell, font: 'var(--text-h6)', color: 'var(--ink-900)' }}>{r.dim}</th>
              <td style={cell}>{r.pro}</td>
              <td style={cell}>{r.con ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="jr-only-mobile" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {rows.map((r) => (
          <div key={r.dim} style={{ background: 'var(--bg-1)', border: '1px solid var(--line)', padding: '14px 16px' }}>
            <div style={{ font: 'var(--text-h6)', color: 'var(--ink-900)' }}>{r.dim}</div>
            <div style={{ marginTop: 10 }}>
              <div style={{ ...L, color: 'var(--accent-ink)' }}>{dot('var(--status-active)')}{cols.pro}</div>
              <div style={{ font: 'var(--text-body-sm)', color: 'var(--ink-600)', marginTop: 4 }}>{r.pro}</div>
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={{ ...L, color: 'var(--status-alert-ink)' }}>{dot('var(--status-alert)')}{cols.con}</div>
              <div style={{ font: 'var(--text-body-sm)', color: 'var(--ink-600)', marginTop: 4 }}>{r.con ?? '—'}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
