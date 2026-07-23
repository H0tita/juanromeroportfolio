import React from 'react';
/** Dot-lattice background field (the hero texture). Wraps children or stands alone. */
export function DotField({ children, gap = 22, dot = 1.5, color = 'var(--line)', fade = 'none', style }) {
  const masks = {
    none: undefined,
    left: 'linear-gradient(to right, transparent, black 40%)',
    right: 'linear-gradient(to left, transparent, black 40%)',
    radial: 'radial-gradient(circle at center, black 30%, transparent 75%)'
  };
  return (
    <div style={{ position: 'relative', ...style }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, ' + color + ' ' + dot + 'px, transparent ' + dot + 'px)', backgroundSize: gap + 'px ' + gap + 'px', WebkitMaskImage: masks[fade], maskImage: masks[fade], pointerEvents: 'none' }} />
      {children != null && <div style={{ position: 'relative' }}>{children}</div>}
    </div>
  );
}
