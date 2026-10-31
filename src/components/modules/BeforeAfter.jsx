import React from 'react';
/** Before/after comparison: two bracketed image fields with A/B labels, or content slots (beforeContent/afterContent, e.g. schematics). Optional `kicker` (small lead-in line) + `heading` (local extension). */
export function BeforeAfter({ moduleId = 'MOD.04', kicker, heading, beforeImage, afterImage, beforeContent, afterContent, beforeLabel = 'BEFORE / REV.A', afterLabel = 'AFTER / REV.B', beforeNote, afterNote, style }) {
  const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)' };
  const panel = (img, content, label, note, after) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ ...L, color: after ? 'var(--accent-ink)' : 'var(--ink-400)' }}>{label}</span>
        <span style={{ width: 8, height: 8, background: after ? 'var(--status-active)' : 'var(--status-off)' }} />
      </div>
      {content
        ? <div style={{ flex: 1, border: '1px solid ' + (after ? 'var(--accent)' : 'var(--line)'), background: 'var(--bg-1)', padding: 16 }}>{content}</div>
        : <div style={{ position: 'relative', aspectRatio: '4/3', border: '1px solid ' + (after ? 'var(--accent)' : 'var(--line)'), background: 'var(--bg-1)' }}>
            {img ? <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: after ? 'none' : 'grayscale(0.7)' }} />
              : <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, var(--bg-1) 0 10px, var(--line-faint) 10px 20px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ font: 'var(--text-caption)', color: 'var(--ink-600)', background: 'var(--bg-2)', padding: '4px 10px', border: '1px solid var(--line)' }}>{after ? 'after screen' : 'before screen'}</span>
                </div>}
          </div>}
      {note && <p style={{ margin: '10px 0 0', font: 'var(--text-body-sm)', color: 'var(--ink-600)' }}>{note}</p>}
    </div>
  );
  return (
    <section style={{ padding: '32px 0', borderTop: '1px solid var(--line-strong)', ...style }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', justifyContent: 'space-between', marginBottom: 20 }}>
        <span style={{ ...L, color: 'var(--accent-ink)' }}>{moduleId}</span>
        <span style={L}>COMPARATIVE / A-B</span>
      </div>
      {kicker && <div style={{ ...L, color: 'var(--accent-ink)', marginBottom: 8 }}>{kicker}</div>}
      {heading && <h2 style={{ margin: '0 0 24px', font: 'var(--text-h3)', color: 'var(--ink-900)' }}>{heading}</h2>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 24 }}>
        {panel(beforeImage, beforeContent, beforeLabel, beforeNote, false)}
        {panel(afterImage, afterContent, afterLabel, afterNote, true)}
      </div>
    </section>
  );
}
