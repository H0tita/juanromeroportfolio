import React from 'react';
/** Console-style micro label: KEY — VALUE pair in Space Mono. */
export function CoordLabel({ label, value, color = 'var(--ink-400)', valueColor = 'var(--ink-900)', style }) {
  return (
    <span style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color, display: 'inline-flex', gap: 8, alignItems: 'baseline', ...style }}>
      {label}{value != null && <span style={{ color: valueColor }}>{value}</span>}
    </span>
  );
}
