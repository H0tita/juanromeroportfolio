import React from 'react';
import { Button } from '../core/Button.jsx';
import { StatusIndicator } from '../hud/StatusIndicator.jsx';
import { HoverCard } from '../case/HoverCard.jsx';
/**
 * Component playground: pick a real site component, change its props with segmented controls
 * and see the live render next to the JSX it corresponds to (design → code traceability).
 */
const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };

const SPECS = {
  button: { variant: ['primary', 'secondary', 'ghost'], layer: ['hud', 'editorial'], size: ['sm', 'md', 'lg'], arrow: [true, false], disabled: [false, true] },
  status: { status: ['active', 'moderate', 'alert', 'off'] },
  card: {},
};
const DEFAULTS = {
  button: { variant: 'primary', layer: 'hud', size: 'md', arrow: true, disabled: false },
  status: { status: 'active' },
  card: {},
};

function Segmented({ label, options, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ ...L, color: 'var(--ink-400)' }}>{label}</span>
      <div role="radiogroup" aria-label={label} style={{ display: 'inline-flex', flexWrap: 'wrap', border: '1px solid var(--line-strong)', alignSelf: 'flex-start' }}>
        {options.map((o) => (
          <button key={String(o)} type="button" role="radio" aria-checked={value === o} onClick={() => onChange(o)}
            style={{ ...L, padding: '8px 12px', border: 0, borderRadius: 0, cursor: 'pointer', background: value === o ? 'var(--ink-900)' : 'transparent', color: value === o ? 'var(--ink-inverse)' : 'var(--ink-900)' }}>{String(o)}</button>
        ))}
      </div>
    </div>
  );
}

const jsx = (name, props, child) => {
  const attrs = Object.entries(props).map(([k, v]) => (v === true ? k : v === false ? null : `${k}="${v}"`)).filter(Boolean);
  return `<${name}${attrs.length ? ' ' + attrs.join(' ') : ''}${child ? `>\n  ${child}\n</${name}>` : ' />'}`;
};

export function ComponentBench({ t }) {
  const [kind, setKind] = React.useState('button');
  const [props, setProps] = React.useState(DEFAULTS);
  const p = props[kind];
  const set = (k, v) => setProps((s) => ({ ...s, [kind]: { ...s[kind], [k]: v } }));
  const code = kind === 'button' ? jsx('Button', p, t.buttonText) : kind === 'status' ? jsx('StatusIndicator', p) : jsx('HoverCard', {}, '…');
  return (
    <div style={{ border: '1px solid var(--line-strong)' }}>
      <div role="tablist" style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '1px solid var(--line-strong)' }}>
        {Object.keys(SPECS).map((k) => (
          <button key={k} type="button" role="tab" aria-selected={kind === k} onClick={() => setKind(k)}
            style={{ ...L, padding: '14px 18px', border: 0, borderRight: '1px solid var(--line)', borderRadius: 0, cursor: 'pointer', background: kind === k ? 'var(--accent-tint)' : 'transparent', color: kind === k ? 'var(--accent-ink)' : 'var(--ink-900)', boxShadow: kind === k ? 'inset 0 -2px 0 var(--accent)' : 'none' }}>{t.pick[k]}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' }}>
        <div style={{ minHeight: 240, display: 'grid', placeItems: 'center', padding: 32, background: 'var(--bg-0)', backgroundImage: 'radial-gradient(circle, var(--line-faint) 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }}>
          {kind === 'button' && <Button {...p}>{t.buttonText}</Button>}
          {kind === 'status' && <StatusIndicator status={p.status} />}
          {kind === 'card' && (
            <HoverCard style={{ padding: 24, maxWidth: 320 }}>
              <span style={{ ...L, color: 'var(--accent-ink)' }}>JR.CARD.001</span>
              <div style={{ font: 'var(--text-h5)', color: 'var(--ink-900)', marginTop: 10 }}>{t.card.title}</div>
              <p style={{ margin: '8px 0 0', font: 'var(--text-body-sm)', color: 'var(--ink-600)' }}>{t.card.text}</p>
            </HoverCard>
          )}
        </div>
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18, borderLeft: '1px solid var(--line)', background: 'var(--bg-1)' }}>
          {Object.entries(SPECS[kind]).map(([k, opts]) => (
            <Segmented key={k} label={t.props[k]} options={opts} value={p[k]} onChange={(v) => set(k, v)} />
          ))}
          {kind === 'card' && <p style={{ margin: 0, font: 'var(--text-body-sm)', color: 'var(--ink-600)' }}>{t.cardHint}</p>}
          <pre style={{ margin: 'auto 0 0', padding: 16, background: 'var(--bg-dark)', color: 'var(--ink-inverse)', font: 'var(--text-caption)', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}><code>{code}</code></pre>
        </div>
      </div>
    </div>
  );
}
