import React from 'react';
/** Crosshair / registration mark glyph. variant: 'plus' | 'x' | 'dot' */
export function Crosshair({ size = 16, variant = 'plus', color = 'var(--ink-400)', style }) {
  const s = size, m = s / 2;
  return (
    <svg width={s} height={s} viewBox={'0 0 ' + s + ' ' + s} style={style} aria-hidden="true">
      {variant === 'plus' && <g stroke={color} strokeWidth="1"><line x1={m} y1="0" x2={m} y2={s} /><line x1="0" y1={m} x2={s} y2={m} /></g>}
      {variant === 'x' && <g stroke={color} strokeWidth="1"><line x1="1" y1="1" x2={s - 1} y2={s - 1} /><line x1={s - 1} y1="1" x2="1" y2={s - 1} /></g>}
      {variant === 'dot' && <g><circle cx={m} cy={m} r={m - 1.5} fill="none" stroke={color} strokeWidth="1" /><circle cx={m} cy={m} r="1.5" fill={color} /></g>}
    </svg>
  );
}
