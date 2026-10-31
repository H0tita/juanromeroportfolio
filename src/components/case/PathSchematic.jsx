import React from 'react';
/** Illustrative click path to a piece of content: numbered steps on a rail, last step = the document. */
const M = { font: 'var(--text-micro)', letterSpacing: 'var(--tracking-micro)', textTransform: 'uppercase' };

export function PathSchematic({ steps = [], after = false, clicksLabel = 'CLICKS', aria }) {
  const tone = after ? 'var(--accent)' : 'var(--line-strong)';
  const clicks = steps.length - 1;
  return (
    <div role="img" aria-label={aria}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, paddingBottom: 10, marginBottom: 12, borderBottom: '1px solid var(--line)' }}>
        <span style={{ font: 'var(--text-data-lg)', color: after ? 'var(--accent-ink)' : 'var(--ink-600)' }}>{String(clicks).padStart(2, '0')}</span>
        <span style={{ ...M, color: 'var(--ink-400)' }}>{clicksLabel}</span>
      </div>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={i} style={{ position: 'relative', padding: '0 0 10px 22px' }}>
              {!last && <span style={{ position: 'absolute', left: 3, top: 10, bottom: 0, width: 2, background: tone }} />}
              <span style={{ position: 'absolute', left: 0, top: 3, width: 8, height: 8, background: last ? (after ? 'var(--accent)' : 'var(--ink-600)') : 'var(--bg-1)', border: '2px solid ' + tone }} />
              <span style={{ ...M, color: last ? 'var(--ink-900)' : 'var(--ink-600)', fontWeight: last ? 700 : 400 }}>{s}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
