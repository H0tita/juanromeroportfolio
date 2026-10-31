import React from 'react';
/**
 * Playable, reduced version of the Piscilona budgeting tool: Details → Works → Review → Quote.
 * Rates are FICTITIOUS and the geometry is simplified; the point is to show the technician's
 * know-how turned into explicit rules (each quote line shows the rule that produced it).
 * Inputs are validated per field (inline errors, cannot advance while invalid), as the real
 * product requires. A stopwatch starts on first interaction and stops at the quote.
 */
const RATES = { floor: 60, coping: 50, lining: 30, deck: 60, labour: 0.25, vat: 0.21 };
const LIMITS = { l: [2, 25], a: [1.5, 12], dmin: [0.5, 3], dmax: [0.5, 3.5], newMin: [0.3, 3], newMax: [0.3, 3.5], deck: [1, 200] };
const SHAPES = {
  rect: { area: (l, a) => l * a, perimeter: (l, a) => 2 * (l + a) },
  kidney: { area: (l, a) => 0.8 * l * a, perimeter: (l, a) => 0.9 * 2 * (l + a) },
  roman: { area: (l, a) => l * a + 3, perimeter: (l, a) => 2 * (l + a) + 2 },
};

const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };
const M = { font: 'var(--text-micro)', letterSpacing: 'var(--tracking-micro)', textTransform: 'uppercase' };
const parse = (v) => { const n = parseFloat(String(v).replace(',', '.')); return Number.isFinite(n) ? n : NaN; };
const tpl = (s, vars) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k]);

const ShapeIcon = ({ type }) => (
  <svg width="44" height="28" viewBox="0 0 44 28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    {type === 'rect' && <rect x="3" y="4" width="38" height="20" />}
    {type === 'kidney' && <path d="M6 14c0-7 7-10 13-8 3 1 5 1 8-1 6-3 13 1 13 8 0 8-8 11-14 9-3-1-5-1-8 0-6 2-12-1-12-8z" />}
    {type === 'roman' && <path d="M3 3h38v16H3zM15 19a7 7 0 0 0 14 0" />}
  </svg>
);

export function BudgetSimulator({ ui, lang }) {
  const [step, setStep] = React.useState(0);
  const [attempted, setAttempted] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [pool, setPool] = React.useState({ type: 'rect', l: '8', a: '4', dmin: '1,2', dmax: '2' });
  const [works, setWorks] = React.useState({ floor: false, coping: true, lining: false, deck: false, newMin: '1', newMax: '1,6', deck_m2: '20' });
  const [t0, setT0] = React.useState(null);
  const [tEnd, setTEnd] = React.useState(null);
  const [now, setNow] = React.useState(0);

  React.useEffect(() => {
    if (!t0 || tEnd) return;
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, [t0, tEnd]);
  const start = () => { if (!t0) { setT0(Date.now()); setNow(Date.now()); } };
  const elapsed = t0 ? Math.max(0, Math.round(((tEnd || now) - t0) / 1000)) : 0;
  const clock = String(Math.floor(elapsed / 60)).padStart(2, '0') + ':' + String(elapsed % 60).padStart(2, '0');

  const locale = lang === 'ENG' ? 'en-GB' : 'es-ES';
  const num = (n, d = 1) => n.toLocaleString(locale, { maximumFractionDigits: d });
  const eur = (n) => n.toLocaleString(locale, { style: 'currency', currency: 'EUR' });

  // ---- validation -------------------------------------------------------
  const v = { l: parse(pool.l), a: parse(pool.a), dmin: parse(pool.dmin), dmax: parse(pool.dmax), newMin: parse(works.newMin), newMax: parse(works.newMax), deck: parse(works.deck_m2) };
  const range = (k, val) => {
    const [lo, hi] = LIMITS[k];
    return !(val >= lo && val <= hi) ? tpl(ui.errors.range, { min: num(lo), max: num(hi) }) : null;
  };
  const errors = {
    l: range('l', v.l), a: range('a', v.a), dmin: range('dmin', v.dmin),
    dmax: range('dmax', v.dmax) || (v.dmin > v.dmax ? ui.errors.order : null),
  };
  if (works.floor) {
    errors.newMin = range('newMin', v.newMin) || (v.newMin >= v.dmin ? tpl(ui.errors.lower, { v: num(v.dmin) }) : null);
    errors.newMax = range('newMax', v.newMax) || (v.newMax >= v.dmax ? tpl(ui.errors.lower, { v: num(v.dmax) }) : null)
      || (v.newMin > v.newMax ? ui.errors.order : null);
  }
  if (works.deck) errors.deck = range('deck', v.deck);
  const noWorks = !works.floor && !works.coping && !works.lining && !works.deck;
  const stepFields = [['l', 'a', 'dmin', 'dmax'], ['newMin', 'newMax', 'deck']];
  const stepValid = (s) => s > 1 || (stepFields[s].every((k) => !errors[k]) && (s !== 1 || !noWorks));
  const show = (k) => (attempted[step] || touched[k]) && errors[k];

  // ---- rules ------------------------------------------------------------
  const shape = SHAPES[pool.type];
  const area = shape.area(v.l, v.a);
  const perimeter = shape.perimeter(v.l, v.a);
  const vessel = area + perimeter * ((v.dmin + v.dmax) / 2);
  const lines = [
    works.floor && { k: 'floor', rule: `${num(area)} m² × ${RATES.floor} €/m²`, amount: area * RATES.floor },
    works.coping && { k: 'coping', rule: `${num(perimeter)} m × ${RATES.coping} €/m`, amount: perimeter * RATES.coping },
    works.lining && { k: 'lining', rule: `${num(vessel)} m² × ${RATES.lining} €/m²`, amount: vessel * RATES.lining },
    works.deck && { k: 'deck', rule: `${num(v.deck)} m² × ${RATES.deck} €/m²`, amount: v.deck * RATES.deck },
  ].filter(Boolean);
  const items = lines.reduce((s, x) => s + x.amount, 0);
  const labour = items * RATES.labour;
  const base = items + labour;
  const vat = base * RATES.vat;

  // ---- navigation -------------------------------------------------------
  const go = (to) => {
    start();
    if (to > step) {
      for (let s = step; s < to; s++) {
        if (!stepValid(s)) { setAttempted((a) => ({ ...a, [s]: true })); setStep(s); return; }
      }
    }
    setStep(to);
    setTEnd(to === 3 ? Date.now() : null);
  };
  const restart = () => {
    setStep(0); setAttempted({}); setTouched({}); setT0(null); setTEnd(null);
  };

  // ---- pieces -----------------------------------------------------------
  const field = (k, label, value, onChange, opts = {}) => {
    const err = show(k);
    const id = 'bs-' + k;
    const edge = '1px solid ' + (err ? 'var(--status-alert)' : 'var(--line-strong)');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
        <label htmlFor={id} style={{ font: '400 13px/1.3 var(--font-sans)', color: 'var(--ink-600)' }}>{label}</label>
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <input id={id} inputMode="decimal" value={value} disabled={opts.disabled}
            onChange={(e) => { start(); onChange(e.target.value); }}
            onBlur={() => setTouched((x) => ({ ...x, [k]: true }))}
            aria-invalid={!!err} aria-describedby={err ? id + '-err' : undefined}
            style={{ width: '100%', minWidth: 0, padding: '8px 10px', font: 'var(--text-caption)', color: 'var(--ink-900)', background: 'var(--bg-2)', borderTop: edge, borderBottom: edge, borderLeft: edge, borderRight: 'none' }} />
          <span style={{ ...M, textTransform: 'none', display: 'flex', alignItems: 'center', padding: '0 8px', color: 'var(--ink-400)', border: edge, background: 'var(--bg-1)' }}>{opts.unit || 'm'}</span>
        </div>
        {err && <span id={id + '-err'} role="alert" style={{ font: '400 12px/1.4 var(--font-sans)', color: 'var(--status-alert-ink)' }}>{err}</span>}
      </div>
    );
  };
  const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 };
  const h = (txt) => <h3 style={{ margin: '0 0 14px', font: 'var(--text-h6)', color: 'var(--ink-900)' }}>{txt}</h3>;
  const stat = (label, value) => (
    <div><div style={{ ...M, color: 'var(--ink-400)' }}>{label}</div><div style={{ font: 'var(--text-caption)', color: 'var(--ink-900)', marginTop: 4 }}>{value}</div></div>
  );
  const geometryOk = !errors.l && !errors.a && !errors.dmin && !errors.dmax;

  const btn = (variant) => ({
    padding: '10px 18px', cursor: 'pointer', ...L,
    background: variant === 'primary' ? 'var(--accent)' : 'transparent',
    color: variant === 'primary' ? '#0E1F19' : 'var(--ink-900)',
    border: '1px solid ' + (variant === 'primary' ? 'var(--accent)' : 'var(--ink-900)'),
  });

  const stepDetails = (
    <div>
      {h(ui.poolHeading)}
      <div role="radiogroup" aria-label={ui.typeLabel} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
        {Object.keys(SHAPES).map((k) => {
          const on = pool.type === k;
          return (
            <button key={k} type="button" role="radio" aria-checked={on} onClick={() => { start(); setPool((p) => ({ ...p, type: k })); }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', cursor: 'pointer', background: on ? 'var(--accent-tint)' : 'var(--bg-2)', border: '1px solid ' + (on ? 'var(--accent)' : 'var(--line-strong)'), color: on ? 'var(--accent-ink)' : 'var(--ink-600)' }}>
              <ShapeIcon type={k} />
              <span style={{ font: '500 13px/1.2 var(--font-sans)', color: 'var(--ink-900)' }}>{ui.types[k]}</span>
            </button>
          );
        })}
      </div>
      <div style={grid}>
        {field('l', ui.fields.l, pool.l, (x) => setPool((p) => ({ ...p, l: x })))}
        {field('a', ui.fields.a, pool.a, (x) => setPool((p) => ({ ...p, a: x })))}
        {field('dmin', ui.fields.dmin, pool.dmin, (x) => setPool((p) => ({ ...p, dmin: x })))}
        {field('dmax', ui.fields.dmax, pool.dmax, (x) => setPool((p) => ({ ...p, dmax: x })))}
      </div>
      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', marginTop: 18, padding: '12px 14px', border: '1px dashed var(--line-strong)' }}>
        <span style={{ ...M, color: 'var(--accent-ink)', alignSelf: 'center' }}>{ui.geometry}</span>
        {stat(ui.area, geometryOk ? num(area) + ' m²' : '—')}
        {stat(ui.perimeter, geometryOk ? num(perimeter) + ' m' : '—')}
        {stat(ui.vessel, geometryOk ? num(vessel) + ' m²' : '—')}
      </div>
    </div>
  );

  const workRow = (k, extra) => {
    const on = works[k];
    return (
      <div key={k} style={{ border: '1px solid ' + (on ? 'var(--accent)' : 'var(--line)'), background: on ? 'var(--bg-2)' : 'transparent', marginBottom: 8 }}>
        <label style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 10px', padding: '10px 12px', cursor: 'pointer' }}>
          <input type="checkbox" checked={on} onChange={(e) => { start(); setWorks((w) => ({ ...w, [k]: e.target.checked })); }} style={{ width: 16, height: 16, accentColor: 'var(--accent-ink)' }} />
          <span style={{ font: '500 14px/1.3 var(--font-sans)', color: 'var(--ink-900)' }}>{ui.works[k]}</span>
          <span style={{ ...M, color: 'var(--ink-400)', marginLeft: 'auto', textAlign: 'right' }}>{ui.workHints[k]}</span>
        </label>
        {on && extra && <div style={{ ...grid, padding: '0 12px 12px 38px' }}>{extra}</div>}
      </div>
    );
  };
  const stepWorks = (
    <div>
      {h(ui.worksHeading)}
      {workRow('floor', <>
        {field('newMin', ui.newMin, works.newMin, (x) => setWorks((w) => ({ ...w, newMin: x })))}
        {field('newMax', ui.newMax, works.newMax, (x) => setWorks((w) => ({ ...w, newMax: x })))}
      </>)}
      {workRow('coping')}
      {workRow('lining')}
      {workRow('deck', field('deck', ui.deckArea, works.deck_m2, (x) => setWorks((w) => ({ ...w, deck_m2: x })), { unit: 'm²' }))}
      {attempted[1] && noWorks && <p role="alert" style={{ margin: '8px 0 0', font: '400 13px/1.4 var(--font-sans)', color: 'var(--status-alert-ink)' }}>{ui.errors.noWorks}</p>}
    </div>
  );

  const row = (k, val) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '6px 0', borderBottom: '1px solid var(--line-faint)' }}>
      <span style={{ font: '400 13px/1.4 var(--font-sans)', color: 'var(--ink-600)' }}>{k}</span>
      <span style={{ font: 'var(--text-caption)', color: 'var(--ink-900)', textAlign: 'right' }}>{val}</span>
    </div>
  );
  const reviewBlock = (title, to, children) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <span style={{ font: 'var(--text-h6)', color: 'var(--ink-900)' }}>{title}</span>
        <button type="button" onClick={() => go(to)} style={{ ...L, background: 'none', border: 'none', color: 'var(--accent-ink)', cursor: 'pointer', padding: 4 }}>{ui.edit}</button>
      </div>
      {children}
    </div>
  );
  const stepReview = (
    <div>
      {h(ui.reviewHeading)}
      {reviewBlock(ui.poolHeading, 0, <>
        {row(ui.typeLabel, ui.types[pool.type])}
        {row(ui.fields.l + ' × ' + ui.fields.a, num(v.l) + ' × ' + num(v.a) + ' m')}
        {row(ui.fields.dmin + ' / ' + ui.fields.dmax, num(v.dmin) + ' / ' + num(v.dmax) + ' m')}
      </>)}
      {reviewBlock(ui.worksHeading, 1, <>
        {works.floor && row(ui.works.floor, num(v.newMin) + ' / ' + num(v.newMax) + ' m')}
        {works.coping && row(ui.works.coping, '✓')}
        {works.lining && row(ui.works.lining, '✓')}
        {works.deck && row(ui.works.deck, num(v.deck) + ' m²')}
      </>)}
    </div>
  );

  const money = (label, val, strong) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', font: strong ? '700 16px/1.3 var(--font-mono)' : 'var(--text-caption)', color: 'var(--ink-900)' }}>
      <span>{label}</span><span>{eur(val)}</span>
    </div>
  );
  const stepQuote = (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
        {h(ui.quoteHeading)}
        <span style={{ ...M, color: 'var(--accent-ink)' }}>{ui.doneIn} {clock}</span>
      </div>
      <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', padding: '16px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', ...M, color: 'var(--ink-400)', paddingBottom: 8, borderBottom: '2px solid var(--ink-900)' }}>
          <span>{ui.concept}</span><span>{ui.amount}</span>
        </div>
        {lines.map((x) => (
          <div key={x.k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '10px 0', borderBottom: '1px solid var(--line-faint)' }}>
            <div>
              <div style={{ font: '500 14px/1.3 var(--font-sans)', color: 'var(--ink-900)' }}>{ui.works[x.k]}</div>
              <div style={{ ...M, textTransform: 'none', color: 'var(--accent-ink)', marginTop: 4 }}>{ui.ruleLabel} · {x.rule}</div>
            </div>
            <span style={{ font: 'var(--text-caption)', color: 'var(--ink-900)', whiteSpace: 'nowrap' }}>{eur(x.amount)}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '10px 0', borderBottom: '1px solid var(--line-faint)' }}>
          <div>
            <div style={{ font: '500 14px/1.3 var(--font-sans)', color: 'var(--ink-900)' }}>{ui.labour}</div>
            <div style={{ ...M, textTransform: 'none', color: 'var(--accent-ink)', marginTop: 4 }}>{ui.ruleLabel} · {RATES.labour * 100} % × {eur(items)}</div>
          </div>
          <span style={{ font: 'var(--text-caption)', color: 'var(--ink-900)', whiteSpace: 'nowrap' }}>{eur(labour)}</span>
        </div>
        <div style={{ marginTop: 10, marginLeft: 'auto', maxWidth: 300 }}>
          {money(ui.base, base)}
          {money(ui.vat, vat)}
          <div style={{ borderTop: '2px solid var(--ink-900)', marginTop: 4 }}>{money(ui.total, base + vat, true)}</div>
        </div>
      </div>
    </div>
  );

  const panels = [stepDetails, stepWorks, stepReview, stepQuote];
  const canVisit = (i) => i <= step;

  return (
    <div style={{ border: '1px solid var(--line-strong)', background: 'var(--bg-1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, padding: '10px 16px', borderBottom: '1px solid var(--line)' }}>
        <span style={{ ...L, color: 'var(--ink-900)' }}>{ui.title}</span>
        <span style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ ...M, color: 'var(--status-moderate-ink)', border: '1px solid var(--status-moderate)', padding: '3px 8px' }}>{ui.badge}</span>
          <span style={{ ...M, color: 'var(--ink-600)' }} aria-live="off">
            <span style={{ display: 'inline-block', width: 8, height: 8, marginRight: 6, background: t0 && !tEnd ? 'var(--status-active)' : 'var(--status-off)' }} />
            {ui.elapsed} {clock}
          </span>
        </span>
      </div>
      <ol style={{ listStyle: 'none', margin: 0, padding: '14px 16px 0', display: 'flex', gap: 8 }}>
        {ui.steps.map((s, i) => {
          const on = i === step, done = i < step;
          return (
            <li key={s} style={{ flex: 1 }}>
              <button type="button" disabled={!canVisit(i)} onClick={() => go(i)} aria-current={on ? 'step' : undefined}
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 0 0', cursor: canVisit(i) ? 'pointer' : 'default',
                  borderTop: '2px solid ' + (on || done ? 'var(--accent)' : 'var(--line)'), ...M, color: on ? 'var(--ink-900)' : done ? 'var(--accent-ink)' : 'var(--ink-400)' }}>
                {done ? '✓' : String(i + 1).padStart(2, '0')} {s}
              </button>
            </li>
          );
        })}
      </ol>
      <div style={{ padding: '20px 16px', minHeight: 300 }}>{panels[step]}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '12px 16px', borderTop: '1px solid var(--line)' }}>
        {step > 0 ? <button type="button" onClick={() => go(step - 1)} style={btn('secondary')}>{'←'} {ui.back}</button> : <span />}
        {step < 2 && <button type="button" onClick={() => go(step + 1)} style={btn('primary')}>{ui.next} {'→'}</button>}
        {step === 2 && <button type="button" onClick={() => go(3)} style={btn('primary')}>{ui.calc} {'→'}</button>}
        {step === 3 && <button type="button" onClick={restart} style={btn('primary')}>{ui.restart}</button>}
      </div>
      <p style={{ margin: 0, padding: '10px 16px', borderTop: '1px solid var(--line-faint)', font: 'var(--text-caption)', color: 'var(--ink-400)' }}>{ui.note}</p>
    </div>
  );
}
