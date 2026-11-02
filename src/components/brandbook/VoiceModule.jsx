import React from 'react';
/**
 * Voice & tone module: each card starts with an off-brand line (struck through, DON'T) and a
 * Rewrite button swaps in the system version (DO) plus the reason. HUD lines render in Space Mono,
 * editorial ones in Archivo, so the card also shows which layer speaks.
 */
const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };

function Pair({ p, t }) {
  const [fixed, setFixed] = React.useState(false);
  const hud = p.layer === 'HUD';
  const lineFont = hud && fixed ? { font: '700 15px/1.4 var(--font-mono)', letterSpacing: 'var(--tracking-label)' } : { font: 'var(--text-h6)', fontWeight: 500 };
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid ' + (fixed ? 'var(--accent)' : 'var(--line)'), padding: 20, display: 'flex', flexDirection: 'column', gap: 12, transition: 'border-color var(--dur-fast) var(--ease-hud)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ ...L, color: 'var(--ink-400)' }}>{p.layer}</span>
        <span style={{ ...L, color: fixed ? 'var(--accent-ink)' : 'var(--status-alert-ink)' }}>{fixed ? 'DO' : "DON'T"}</span>
      </div>
      <p aria-live="polite" style={{ margin: 0, minHeight: 48, color: fixed ? 'var(--ink-900)' : 'var(--ink-400)', textDecoration: fixed ? 'none' : 'line-through', textDecorationColor: 'var(--status-alert)', ...lineFont }}>
        {fixed ? p.good : p.bad}
      </p>
      <p style={{ margin: 0, font: 'var(--text-body-sm)', color: 'var(--ink-600)', flex: 1, visibility: fixed ? 'visible' : 'hidden' }}>{p.why}</p>
      <button type="button" aria-pressed={fixed} onClick={() => setFixed((f) => !f)}
        style={{ ...L, alignSelf: 'flex-start', padding: '8px 12px', borderRadius: 0, cursor: 'pointer', border: '1px solid var(--ink-900)', background: fixed ? 'transparent' : 'var(--ink-900)', color: fixed ? 'var(--ink-900)' : 'var(--ink-inverse)' }}>
        {fixed ? t.original : t.rewrite} {'→'}
      </button>
    </div>
  );
}

export function VoiceModule({ t }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 16 }}>
      {t.pairs.map((p) => <Pair key={p.bad} p={p} t={t} />)}
    </div>
  );
}
