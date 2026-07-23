import React from 'react';
/** System button. variant: primary|secondary|ghost. layer: 'hud' (mono, uppercase) | 'editorial' (Archivo). */
export function Button({ children, variant = 'primary', layer = 'hud', arrow = false, disabled = false, size = 'md', onClick, style }) {
  const [hover, setHover] = React.useState(false);
  const pad = size === 'sm' ? '8px 14px' : size === 'lg' ? '16px 28px' : '12px 20px';
  const fontHud = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };
  const fontEd = { font: '500 15px/1 var(--font-sans)', letterSpacing: '0.01em' };
  const variants = {
    primary: { background: hover ? 'var(--accent-ink)' : 'var(--accent)', color: '#0E1F19', border: '1px solid transparent', ...(hover && { color: '#FFFFFF' }) },
    secondary: { background: hover ? 'var(--ink-900)' : 'transparent', color: hover ? 'var(--ink-inverse)' : 'var(--ink-900)', border: '1px solid var(--ink-900)' },
    ghost: { background: hover ? 'var(--accent-tint)' : 'transparent', color: 'var(--accent-ink)', border: '1px solid transparent' }
  };
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: pad, whiteSpace: 'nowrap', cursor: disabled ? 'not-allowed' : 'pointer', borderRadius: 0, transition: 'all var(--dur-fast) var(--ease-hud)', ...(layer === 'hud' ? fontHud : fontEd), ...variants[variant], ...(disabled && { opacity: 0.45, pointerEvents: 'none' }), ...style }}>
      {children}
      {arrow && <span aria-hidden="true" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1 }}>{'↗'}</span>}
    </button>
  );
}
