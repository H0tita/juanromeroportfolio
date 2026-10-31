import React from 'react';
/**
 * Horizontal process timeline: numbered phases on a ruled track. Local extensions: optional
 * `heading`, and hover focus — the hovered phase's number and title turn green while the other
 * phases shift to light grey (colour change, not opacity), to guide reading.
 */
export function ProcessTimeline({ moduleId = 'MOD.02', heading, phases = [], activeIndex = -1, style }) {
  const [hovered, setHovered] = React.useState(null);
  const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)' };
  const ease = 'var(--dur-fast) var(--ease-hud)';
  return (
    <section style={{ padding: '32px 0', borderTop: '1px solid var(--line-strong)', ...style }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', justifyContent: 'space-between', marginBottom: 24 }}>
        <span style={{ ...L, color: 'var(--accent-ink)' }}>{moduleId}</span>
        <span style={L}>PROCESS / {phases.length} PHASES</span>
      </div>
      {heading && <h2 style={{ margin: '0 0 28px', font: 'var(--text-h3)', color: 'var(--ink-900)' }}>{heading}</h2>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', rowGap: 28 }} onMouseLeave={() => setHovered(null)}>
        {phases.map((p, i) => {
          const on = i <= activeIndex || activeIndex === -1;
          const focus = hovered === i;
          const muted = hovered !== null && !focus;
          const rule = muted || !on ? 'var(--line)' : 'var(--accent)';
          return (
            <div key={i} onMouseEnter={() => setHovered(i)}
              style={{ borderTop: '2px solid ' + rule, padding: '16px 16px 0 0', position: 'relative', transition: 'border-color ' + ease }}>
              <span style={{ position: 'absolute', top: -5, left: 0, width: 8, height: 8, background: rule, transition: 'background ' + ease }} />
              <div style={{ font: 'var(--text-data-lg)', color: focus ? 'var(--accent-ink)' : muted || !on ? 'var(--ink-400)' : 'var(--ink-900)', transition: 'color ' + ease }}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{ font: 'var(--text-h6)', color: focus ? 'var(--accent-ink)' : muted ? 'var(--ink-400)' : 'var(--ink-900)', marginTop: 8, transition: 'color ' + ease }}>{p.title}</div>
              {p.duration && <div style={{ ...L, marginTop: 6 }}>{p.duration}</div>}
              {p.description && <p style={{ margin: '10px 0 0', font: 'var(--text-body-sm)', color: muted ? 'var(--ink-400)' : 'var(--ink-600)', paddingRight: 8, transition: 'color ' + ease }}>{p.description}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
