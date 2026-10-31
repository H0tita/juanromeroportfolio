import React from 'react';
/**
 * Interactive "paper sheet ↔ web form" map. The same fields are drawn twice — the
 * technician's paper sheet (left) and the office web form (right) — numbered in
 * pairs. Hover, keyboard focus or tap on either side highlights both, draws a
 * connector between them and announces where each one lives (sheet page → form step).
 * All copy and fictitious values come from `data` (bilingual content file).
 */
const M = { font: 'var(--text-micro)', letterSpacing: 'var(--tracking-micro)', textTransform: 'uppercase' };
const LBL = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };
const num = (i) => String(i + 1).padStart(2, '0');

export function SheetFormMap({ data }) {
  const [active, setActive] = React.useState(null);
  const [line, setLine] = React.useState(null);
  const wrap = React.useRef(null);
  const refs = React.useRef({});

  const fields = data.groups.flatMap((g) => g.fields.map((f) => ({ ...f, group: g })));
  const index = Object.fromEntries(fields.map((f, i) => [f.id, i]));
  const current = active ? fields[index[active]] : null;

  // Connector geometry: only when both columns sit side by side.
  const measure = React.useCallback(() => {
    if (!active || !wrap.current) return setLine(null);
    const a = refs.current['sheet:' + active], b = refs.current['form:' + active];
    if (!a || !b) return setLine(null);
    const c = wrap.current.getBoundingClientRect(), ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
    const x1 = ra.right - c.left, y1 = ra.top + ra.height / 2 - c.top;
    const x2 = rb.left - c.left, y2 = rb.top + rb.height / 2 - c.top;
    setLine(x2 > x1 + 16 ? { x1, y1, x2, y2 } : null);
  }, [active]);
  React.useLayoutEffect(measure, [measure]);
  React.useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const bind = (id) => ({
    onMouseEnter: () => setActive(id),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(id),
    onBlur: () => setActive(null),
    onClick: () => setActive((cur) => (cur === id ? null : id)),
    'aria-pressed': active === id,
    'aria-describedby': 'sfm-status',
  });
  const state = (id) => ({
    on: active === id,
    dim: active !== null && active !== id,
  });
  const btn = (id, extra) => {
    const { on, dim } = state(id);
    return {
      type: 'button',
      ...bind(id),
      style: {
        display: 'flex', alignItems: 'center', gap: 8, width: '100%', textAlign: 'left', cursor: 'pointer',
        padding: '6px 8px', background: on ? 'var(--accent-tint)' : 'transparent',
        border: '1px solid ' + (on ? 'var(--accent)' : 'transparent'), opacity: dim ? 0.4 : 1,
        transition: 'opacity var(--dur-fast) var(--ease-hud), background var(--dur-fast) var(--ease-hud), border-color var(--dur-fast) var(--ease-hud)',
        ...extra,
      },
    };
  };
  const badge = (id) => (
    <span style={{ ...M, flex: 'none', width: 20, color: active === id ? 'var(--accent-ink)' : 'var(--ink-400)' }}>{num(index[id])}</span>
  );
  const ink = { font: 'italic 500 15px/1.2 var(--font-sans)', color: 'var(--accent-ink)' };

  const sheet = (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', boxShadow: '0 1px 0 var(--line), 0 2px 0 var(--line-faint)', padding: '20px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 10, borderBottom: '2px solid var(--ink-900)', marginBottom: 12 }}>
        <span style={{ font: 'var(--text-h6)', color: 'var(--ink-900)' }}>{data.sheetTitle}</span>
        <span style={{ ...M, color: 'var(--ink-400)' }}>{data.paper}</span>
      </div>
      {data.groups.map((g) => (
        <div key={g.key} style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 0 4px' }}>
            <span style={{ font: '600 13px/1.3 var(--font-sans)', color: 'var(--ink-900)' }}>{g.sheet}</span>
            <span style={{ ...M, color: 'var(--ink-400)' }}>{data.pageLabel} {g.page}</span>
          </div>
          {g.fields.map((f) => (
            <button key={f.id} ref={(el) => { refs.current['sheet:' + f.id] = el; }} {...btn(f.id)}>
              {badge(f.id)}
              {f.kind === 'check' ? (
                <>
                  <span aria-hidden="true" style={{ flex: 'none', width: 14, height: 14, border: '1px solid var(--ink-600)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...ink, fontSize: 13 }}>{f.checked ? 'X' : ''}</span>
                  <span style={{ font: '400 13px/1.3 var(--font-sans)', color: 'var(--ink-900)' }}>{f.sheet}</span>
                  {f.value && <span style={{ ...ink, marginLeft: 'auto', flex: 'none', whiteSpace: 'nowrap' }}>{f.value}</span>}
                </>
              ) : (
                <>
                  <span style={{ font: '400 13px/1.3 var(--font-sans)', color: 'var(--ink-900)', flex: 'none' }}>{f.sheet}:</span>
                  <span style={{ ...ink, flex: 1, borderBottom: '1px solid var(--ink-600)', paddingBottom: 1 }}>{f.value}</span>
                </>
              )}
            </button>
          ))}
        </div>
      ))}
    </div>
  );

  const form = (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: '1px solid var(--line)' }}>
        <span style={{ ...LBL, color: 'var(--ink-900)' }}>{data.formTitle}</span>
        <span style={{ ...M, color: 'var(--ink-400)' }}>WEB APP</span>
      </div>
      <ol style={{ listStyle: 'none', margin: 0, padding: '12px 16px', display: 'flex', gap: 8, borderBottom: '1px solid var(--line-faint)' }}>
        {data.steps.map((s, i) => {
          const on = current && current.group.step === i;
          return (
            <li key={s} style={{ ...M, flex: 1, paddingTop: 6, borderTop: '2px solid ' + (on ? 'var(--accent)' : 'var(--line)'), color: on ? 'var(--accent-ink)' : 'var(--ink-400)', transition: 'color var(--dur-fast), border-color var(--dur-fast)' }}>
              {num(i)} {s}
            </li>
          );
        })}
      </ol>
      <div style={{ padding: '14px 16px' }}>
        {data.groups.map((g) => (
          <div key={g.key} style={{ marginBottom: 14 }}>
            <div style={{ font: '600 13px/1.3 var(--font-sans)', color: 'var(--ink-900)', margin: '0 0 4px' }}>{g.form}</div>
            {g.fields.map((f) => (
              <button key={f.id} ref={(el) => { refs.current['form:' + f.id] = el; }} {...btn(f.id)}>
                {badge(f.id)}
                {f.kind === 'check' ? (
                  <>
                    <span aria-hidden="true" style={{ flex: 'none', width: 14, height: 14, background: f.checked ? 'var(--accent)' : 'var(--bg-2)', border: '1px solid ' + (f.checked ? 'var(--accent)' : 'var(--line-strong)'), color: 'var(--bg-2)', fontSize: 10, lineHeight: '12px', textAlign: 'center' }}>{f.checked ? '✓' : ''}</span>
                    <span style={{ font: '400 13px/1.3 var(--font-sans)', color: 'var(--ink-900)' }}>{f.form}</span>
                    {f.value && <span style={{ font: 'var(--text-caption)', color: 'var(--ink-900)', marginLeft: 'auto', flex: 'none', whiteSpace: 'nowrap', padding: '2px 8px', border: '1px solid var(--line-strong)', background: 'var(--bg-2)' }}>{f.value}</span>}
                  </>
                ) : (
                  <>
                    <span style={{ font: '400 12px/1.3 var(--font-sans)', color: 'var(--ink-600)', flex: 'none', minWidth: 96 }}>{f.form}</span>
                    <span style={{ flex: 1, font: 'var(--text-caption)', color: 'var(--ink-900)', padding: '4px 8px', border: '1px solid var(--line-strong)', background: 'var(--bg-2)' }}>{f.value}</span>
                  </>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div ref={wrap} style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', columnGap: 72, rowGap: 24, alignItems: 'start' }}>
        <div>
          <div style={{ ...LBL, color: 'var(--ink-400)', marginBottom: 8 }}>{data.sheetLabel}</div>
          {sheet}
        </div>
        <div>
          <div style={{ ...LBL, color: 'var(--accent-ink)', marginBottom: 8 }}>{data.formLabel}</div>
          {form}
        </div>
        {line && (
          <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
            <path d={`M ${line.x1} ${line.y1} H ${(line.x1 + line.x2) / 2} V ${line.y2} H ${line.x2}`} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 3" />
            <rect x={line.x1 - 3} y={line.y1 - 3} width="6" height="6" fill="var(--accent)" />
            <rect x={line.x2 - 3} y={line.y2 - 3} width="6" height="6" fill="var(--accent)" />
          </svg>
        )}
      </div>
      <div id="sfm-status" aria-live="polite" style={{ marginTop: 16, padding: '10px 14px', border: '1px solid var(--line)', background: 'var(--bg-1)', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', minHeight: 42 }}>
        <span style={{ width: 8, height: 8, flex: 'none', background: current ? 'var(--status-active)' : 'var(--status-off)' }} />
        {current ? (
          <span style={{ font: 'var(--text-caption)', color: 'var(--ink-900)' }}>
            <strong style={{ fontWeight: 700 }}>{num(index[current.id])} · {current.form}</strong>
            {'  '}— {data.sheetLabelShort} {data.pageLabel} {current.group.page} {'→'} {data.formLabelShort} {data.stepLabel} {current.group.step + 1} · {data.steps[current.group.step]}
          </span>
        ) : (
          <span style={{ font: 'var(--text-caption)', color: 'var(--ink-400)' }}>{data.hint}</span>
        )}
      </div>
    </div>
  );
}
