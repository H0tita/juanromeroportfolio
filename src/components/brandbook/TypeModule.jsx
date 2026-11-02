import React from 'react';
/**
 * Typography module: the two families with their role, then a type tester that renders the
 * visitor's text at every step of the scale. Specs (weight / size / line height) are parsed
 * from the live tokens, so they always match typography.css. Filter by layer.
 */
const SCALE = [
  { tk: '--text-h1', layer: 'editorial' }, { tk: '--text-h2', layer: 'editorial' }, { tk: '--text-h3', layer: 'editorial' },
  { tk: '--text-h4', layer: 'editorial' }, { tk: '--text-h5', layer: 'editorial' }, { tk: '--text-h6', layer: 'editorial' },
  { tk: '--text-body-lg', layer: 'editorial' }, { tk: '--text-body', layer: 'editorial' }, { tk: '--text-body-sm', layer: 'editorial' },
  { tk: '--text-data-lg', layer: 'hud' }, { tk: '--text-caption', layer: 'hud' },
  { tk: '--text-label', layer: 'hud', upper: true }, { tk: '--text-micro', layer: 'hud', upper: true },
];
const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };

export function TypeModule({ t }) {
  const [text, setText] = React.useState(t.sample);
  const [filter, setFilter] = React.useState('all');
  const [specs, setSpecs] = React.useState({});
  React.useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    const out = {};
    for (const { tk } of SCALE) {
      const m = css.getPropertyValue(tk).trim().match(/^(\d+)\s+(.+?)\/(\S+)\s/);
      if (m) out[tk] = `${m[1]} · ${m[2].replace(/\s+/g, ' ')} / ${m[3]}`;
    }
    setSpecs(out);
  }, []);
  const rows = SCALE.filter((s) => filter === 'all' || s.layer === filter);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
        {t.families.map((f) => (
          <div key={f.name} style={{ background: f.role === 'HUD' ? 'var(--bg-dark)' : 'var(--bg-1)', color: f.role === 'HUD' ? 'var(--ink-inverse)' : 'var(--ink-900)', border: '1px solid ' + (f.role === 'HUD' ? 'var(--bg-dark-2)' : 'var(--line)'), padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', ...L, color: f.role === 'HUD' ? 'var(--accent)' : 'var(--accent-ink)' }}><span>{f.role}</span><span style={{ textTransform: 'none' }}>{f.token}</span></div>
            <div style={{ fontFamily: `var(${f.token})`, fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 1, fontWeight: f.role === 'HUD' ? 700 : 600 }}>Aa</div>
            <div style={{ fontFamily: `var(${f.token})`, fontSize: 22, fontWeight: 600 }}>{f.name}</div>
            <div style={{ font: 'var(--text-body-sm)', color: f.role === 'HUD' ? 'var(--ink-inverse-dim)' : 'var(--ink-600)' }}>{f.use}</div>
            <div style={{ fontFamily: `var(${f.token})`, fontSize: 14, letterSpacing: '0.04em', color: f.role === 'HUD' ? 'var(--ink-inverse-dim)' : 'var(--ink-600)', wordBreak: 'break-all' }}>ABCDEFGHIJKLMNÑOPQRSTUVWXYZ 0123456789 ↗ → / ·</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: '1 1 280px', maxWidth: 520 }}>
          <span style={{ ...L, color: 'var(--ink-400)' }}>{t.tester}</span>
          <input value={text} onChange={(e) => setText(e.target.value)} maxLength={80}
            style={{ font: 'var(--text-body)', padding: '10px 12px', border: '1px solid var(--line-strong)', background: 'var(--bg-2)', color: 'var(--ink-900)', borderRadius: 0 }} />
        </label>
        <div role="radiogroup" aria-label="Layer" style={{ display: 'flex', border: '1px solid var(--line-strong)' }}>
          {Object.entries(t.filters).map(([k, label]) => (
            <button key={k} type="button" role="radio" aria-checked={filter === k} onClick={() => setFilter(k)}
              style={{ ...L, padding: '10px 14px', border: 0, borderRadius: 0, cursor: 'pointer', background: filter === k ? 'var(--ink-900)' : 'transparent', color: filter === k ? 'var(--ink-inverse)' : 'var(--ink-900)' }}>{label}</button>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--line-strong)' }}>
        {rows.map((s) => (
          <div key={s.tk} style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 200px) 1fr', gap: '6px 24px', padding: '16px 0', borderBottom: '1px solid var(--line-faint)', alignItems: 'baseline' }} className="jr-type-row">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ ...L, color: s.layer === 'hud' ? 'var(--accent-ink)' : 'var(--ink-900)' }}>{s.tk.replace('--text-', '')}</span>
              <span style={{ font: 'var(--text-micro)', letterSpacing: 'var(--tracking-micro)', color: 'var(--ink-400)' }}>{specs[s.tk] || ''}</span>
            </div>
            <div style={{ font: `var(${s.tk})`, color: 'var(--ink-900)', overflowWrap: 'anywhere', ...(s.upper && { textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)' }) }}>{text || '—'}</div>
          </div>
        ))}
      </div>
      <style>{'@media(max-width:560px){.jr-type-row{grid-template-columns:1fr !important}}'}</style>
    </div>
  );
}
