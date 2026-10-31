import React from 'react';
/** Full-width case module: HUD header (module id + label), editorial heading/intro, then free content (interactives, tables). */
export function ModuleSection({ moduleId, label, heading, intro, children, style }) {
  const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)' };
  return (
    <section style={{ padding: '32px 0', borderTop: '1px solid var(--line-strong)', ...style }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', justifyContent: 'space-between', marginBottom: 20 }}>
        <span style={{ ...L, color: 'var(--accent-ink)' }}>{moduleId}</span>
        <span style={L}>{label}</span>
      </div>
      {heading && <h2 style={{ margin: 0, font: 'var(--text-h3)', color: 'var(--ink-900)' }}>{heading}</h2>}
      {intro && <div style={{ margin: '14px 0 0', font: 'var(--text-body)', color: 'var(--ink-600)', maxWidth: 'var(--reading-max)' }}>{intro}</div>}
      {children && <div style={{ marginTop: 28 }}>{children}</div>}
    </section>
  );
}