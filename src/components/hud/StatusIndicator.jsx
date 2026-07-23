import React from 'react';
const COLORS = { active: 'var(--status-active)', moderate: 'var(--status-moderate)', alert: 'var(--status-alert)', off: 'var(--status-off)' };
/** System status chip: blinking square dot + mono label. status: active|moderate|alert|off */
export function StatusIndicator({ status = 'active', label, blink = true, style }) {
  const text = label || { active: 'ACTIVE', moderate: 'MODERATE', alert: 'ALERT', off: 'DISABLED' }[status];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-900)', ...style }}>
      <span style={{ width: 8, height: 8, background: COLORS[status] || COLORS.active, animation: blink && status !== 'off' ? 'jr-blink 1.2s steps(2,start) infinite' : 'none' }} />
      {text}
      <style>{'@keyframes jr-blink{to{visibility:hidden}}'}</style>
    </span>
  );
}
