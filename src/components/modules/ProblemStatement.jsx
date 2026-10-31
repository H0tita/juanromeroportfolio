import React from 'react';
/**
 * Problem framing block: HUD header row (module id left, label right) + editorial statement,
 * left-aligned like every other case module. `label` lets the same layout frame other
 * narrative blocks (role, IA...); `extra` renders full width (e.g. fact cards) between the
 * text and the highlight; `aside` sits to the right of the text (e.g. a small infographic)
 * and wraps below it on narrow screens.
 * Local change vs the DS original (which used a left label rail): not pushed back yet.
 */
export function ProblemStatement({ moduleId = 'MOD.01', label = 'PROBLEM STATEMENT', heading = 'The problem', children, extra, aside, highlight, style }) {
  const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)' };
  const main = (
    <>
      <h2 style={{ margin: 0, font: 'var(--text-h3)', color: 'var(--ink-900)' }}>{heading}</h2>
      {children && <div style={{ margin: '16px 0 0', font: 'var(--text-body)', color: 'var(--ink-600)', maxWidth: 'var(--reading-max)' }}>{children}</div>}
      {extra && <div style={{ marginTop: 24 }}>{extra}</div>}
      {highlight && (
        <div style={{ marginTop: 20, padding: '16px 20px', background: 'var(--accent-tint)', borderLeft: '2px solid var(--accent)', font: 'var(--text-body)', color: 'var(--ink-900)', maxWidth: '58ch' }}>{highlight}</div>
      )}
    </>
  );
  return (
    <section style={{ padding: '32px 0', borderTop: '1px solid var(--line-strong)', ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <span style={{ ...L, color: 'var(--accent-ink)' }}>{moduleId}</span>
        <span style={L}>{label}</span>
      </div>
      {aside ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px 48px', alignItems: 'center' }}>
          <div style={{ flex: '1 1 420px', minWidth: 0 }}>{main}</div>
          <div style={{ flex: '0 1 260px', display: 'flex', justifyContent: 'center' }}>{aside}</div>
        </div>
      ) : main}
    </section>
  );
}
