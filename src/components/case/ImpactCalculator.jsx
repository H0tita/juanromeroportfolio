import React from 'react';
/**
 * Business-impact projection, clearly labelled as an ESTIMATE. Each input carries its source
 * (measured in the pilot / assumption / ING data) and the formula is shown with live numbers:
 *   extra visits = 1 / (1 − share × reduction) − 1
 *   extra sales per 100 current visits = 100 × extra visits × conversion
 */
const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };
const M = { font: 'var(--text-micro)', letterSpacing: 'var(--tracking-micro)', textTransform: 'uppercase' };
const DEFAULTS = { reduction: 60, share: 40, conversion: 58 };
const RANGES = { reduction: [0, 90, 5], share: [10, 70, 1], conversion: [0, 100, 1] };
const SOURCE_TONE = {
  measured: { color: 'var(--accent-ink)', border: 'var(--accent)' },
  assumption: { color: 'var(--status-moderate-ink)', border: 'var(--status-moderate)' },
  data: { color: 'var(--ink-600)', border: 'var(--line-strong)' },
};

export function ImpactCalculator({ ui, lang }) {
  const [v, setV] = React.useState(DEFAULTS);
  const locale = lang === 'ENG' ? 'en-GB' : 'es-ES';
  const num = (n, d = 2) => n.toLocaleString(locale, { minimumFractionDigits: d, maximumFractionDigits: d });

  const r = v.reduction / 100, s = v.share / 100, c = v.conversion / 100;
  const extraVisits = 1 / (1 - s * r) - 1;
  const extraSales = 100 * extraVisits * c;
  const changed = Object.keys(DEFAULTS).some((k) => v[k] !== DEFAULTS[k]);

  const slider = (key) => {
    const [min, max, step] = RANGES[key];
    const f = ui.inputs[key];
    const tone = SOURCE_TONE[f.source];
    const id = 'ic-' + key;
    return (
      <div key={key} style={{ padding: '14px 0', borderBottom: '1px solid var(--line-faint)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <label htmlFor={id} style={{ font: '500 14px/1.35 var(--font-sans)', color: 'var(--ink-900)' }}>{f.label}</label>
          <span style={{ font: '700 18px/1 var(--font-mono)', color: 'var(--ink-900)' }}>{v[key]} %</span>
        </div>
        <input id={id} type="range" min={min} max={max} step={step} value={v[key]}
          onChange={(e) => setV((x) => ({ ...x, [key]: Number(e.target.value) }))}
          aria-valuetext={v[key] + ' %'}
          style={{ width: '100%', margin: '10px 0 6px', accentColor: 'var(--accent-ink)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ ...M, padding: '2px 6px', border: '1px solid ' + tone.border, color: tone.color }}>{ui.sources[f.source]}</span>
          <span style={{ font: 'var(--text-caption)', color: 'var(--ink-400)' }}>{f.hint}</span>
        </div>
      </div>
    );
  };

  const out = (value, label, caption) => (
    <div style={{ padding: '16px 0', borderBottom: '1px solid var(--line-faint)' }}>
      <div style={{ font: '700 clamp(36px, 4vw, 52px)/1 var(--font-mono)', color: 'var(--accent-ink)' }}>{value}</div>
      <div style={{ ...L, color: 'var(--ink-600)', marginTop: 8 }}>{label}</div>
      <div style={{ font: 'var(--text-caption)', color: 'var(--ink-400)', marginTop: 4 }}>{caption}</div>
    </div>
  );

  return (
    <div style={{ border: '1px solid var(--line-strong)', background: 'var(--bg-1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, padding: '10px 16px', borderBottom: '1px solid var(--line)' }}>
        <span style={{ ...L, color: 'var(--ink-900)' }}>{ui.title}</span>
        <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ ...M, color: 'var(--status-moderate-ink)', border: '1px solid var(--status-moderate)', padding: '3px 8px' }}>{ui.badge}</span>
          {changed && (
            <button type="button" onClick={() => setV(DEFAULTS)}
              style={{ ...M, background: 'none', border: 'none', color: 'var(--accent-ink)', cursor: 'pointer', padding: 4 }}>{ui.reset}</button>
          )}
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', columnGap: 40, padding: '6px 16px 0' }}>
        <div>{['reduction', 'share', 'conversion'].map(slider)}</div>
        <div aria-live="polite">
          {out('+' + Math.round(extraVisits * 100) + ' %', ui.visitsLabel, ui.visitsCaption)}
          {out('+' + Math.round(extraSales), ui.salesLabel, ui.salesCaption)}
        </div>
      </div>
      <div style={{ margin: '16px', padding: '12px 14px', background: 'var(--bg-0)', border: '1px dashed var(--line-strong)' }}>
        <div style={{ ...M, color: 'var(--accent-ink)', marginBottom: 6 }}>{ui.formulaLabel}</div>
        <div style={{ font: 'var(--text-caption)', color: 'var(--ink-900)', overflowWrap: 'anywhere' }}>
          {ui.formulaVisits} = 1 / (1 − {num(s)} × {num(r)}) − 1 = +{num(extraVisits * 100, 1)} %
        </div>
        <div style={{ font: 'var(--text-caption)', color: 'var(--ink-900)', marginTop: 4, overflowWrap: 'anywhere' }}>
          {ui.formulaSales} = 100 × {num(extraVisits, 3)} × {num(c)} = +{num(extraSales, 1)}
        </div>
      </div>
      <p style={{ margin: 0, padding: '10px 16px', borderTop: '1px solid var(--line-faint)', font: 'var(--text-caption)', color: 'var(--ink-400)' }}>{ui.note}</p>
    </div>
  );
}
