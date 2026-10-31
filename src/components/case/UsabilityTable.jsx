import React from 'react';
/** Usability-test findings: dimension rows × pros / cons columns, HUD table. Empty cell (null) renders as a dash. */
export function UsabilityTable({ cols, rows, style }) {
  const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)' };
  const cell = { padding: '12px 16px', font: 'var(--text-body-sm)', color: 'var(--ink-600)', borderTop: '1px solid var(--line)', verticalAlign: 'top', textAlign: 'left' };
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--bg-1)', border: '1px solid var(--line)', ...style }}>
      <thead>
        <tr>
          <th scope="col" style={{ ...cell, ...L, borderTop: 'none', width: '22%' }}>{cols.dim}</th>
          <th scope="col" style={{ ...cell, ...L, borderTop: 'none', color: 'var(--accent-ink)' }}>
            <span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--status-active)', marginRight: 8 }} />{cols.pro}
          </th>
          <th scope="col" style={{ ...cell, ...L, borderTop: 'none', color: 'var(--status-alert-ink)' }}>
            <span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--status-alert)', marginRight: 8 }} />{cols.con}
          </th>
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
  );
}
