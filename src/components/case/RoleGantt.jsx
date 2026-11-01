import React from 'react';
/**
 * Role timeline as a Gantt chart: month grid with dashed rules, square bars (ink = designer,
 * accent = product owner, outline = support), a final milestone and activity groups under each
 * stage. Positions are in months from the first column (fractions allowed, e.g. 4.75 = late Nov).
 * Below 768px it becomes a stacked list (period + role).
 */
const M = { font: 'var(--text-micro)', letterSpacing: 'var(--tracking-micro)', textTransform: 'uppercase' };
const TONES = {
  ink: { background: 'var(--bg-dark)', color: 'var(--ink-inverse)', border: '1px solid var(--bg-dark)', sub: 'var(--ink-inverse-dim)' },
  accent: { background: 'var(--accent)', color: '#0E1F19', border: '1px solid var(--accent)', sub: '#0E1F19' },
  outline: { background: 'var(--bg-1)', color: 'var(--ink-900)', border: '1px solid var(--ink-900)', sub: 'var(--ink-600)' },
};

export function RoleGantt({ data }) {
  const n = data.months.length;
  const pct = (x) => (x / n) * 100 + '%';
  const rule = { position: 'absolute', top: 0, bottom: 0, width: 0, borderLeft: '1px dashed var(--line)' };

  const desktop = (
    <div className="jr-only-desktop" role="img" aria-label={data.aria}>
      <div style={{ position: 'relative', paddingTop: 28 }}>
        {data.months.map((_, i) => <span key={i} aria-hidden="true" style={{ ...rule, left: pct(i) }} />)}
        <span aria-hidden="true" style={{ ...rule, right: 0, left: 'auto', borderLeft: 'none', borderRight: '2px solid var(--accent)' }} />
        <span style={{ ...M, position: 'absolute', top: 0, right: 8, color: 'var(--accent-ink)', fontWeight: 700 }}>{data.milestone} ■</span>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {data.rows.map((r) => {
            const t = TONES[r.tone];
            return (
              <div key={r.title + r.sub} style={{ position: 'relative', height: 44 }}>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: pct(r.start), width: `calc(${pct(r.end - r.start)} - 4px)`, background: t.background, border: t.border, color: t.color, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  <span style={{ font: '500 14px/1.2 var(--font-sans)', flex: 'none' }}>{r.title}</span>
                  <span style={{ ...M, color: t.sub, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>· {r.sub}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${n}, 1fr)`, marginTop: 10, borderTop: '1px solid var(--line)' }}>
        {data.months.map((m, i) => (
          <div key={m} style={{ ...M, color: 'var(--ink-400)', padding: '8px 0 0 6px', borderLeft: '1px dashed var(--line)' }}>
            {m}{data.years[i] && <span style={{ color: 'var(--accent-ink)', marginLeft: 6 }}>{data.years[i]}</span>}
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${n * 4}, 1fr)`, marginTop: 18 }}>
        {data.groups.map((g, i) => (
          <ul key={i} style={{ gridColumn: `${Math.round(g.start * 4) + 1} / ${Math.round(g.end * 4) + 1}`, gridRow: 1, margin: 0, padding: '0 12px 0 6px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {g.items.map((it) => (
              <li key={it} style={{ display: 'flex', gap: 8, font: 'var(--text-body-sm)', color: 'var(--ink-600)' }}>
                <span aria-hidden="true" style={{ flex: 'none', width: 6, height: 6, marginTop: 8, background: 'var(--accent)' }} />{it}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );

  const mobile = (
    <ol className="jr-only-mobile" aria-label={data.aria} style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {data.rows.map((r) => {
        const t = TONES[r.tone];
        return (
          <li key={r.title + r.sub} style={{ background: t.background, border: t.border, color: t.color, padding: '12px 14px' }}>
            <div style={{ ...M, color: t.sub }}>{r.period}</div>
            <div style={{ font: '500 15px/1.3 var(--font-sans)', marginTop: 4 }}>{r.title}</div>
            <div style={{ ...M, color: t.sub, marginTop: 2 }}>{r.sub}</div>
          </li>
        );
      })}
      <li style={{ ...M, color: 'var(--accent-ink)', fontWeight: 700, padding: '6px 0 0' }}>■ {data.milestone} · FEB 2026</li>
    </ol>
  );

  return <>{desktop}{mobile}</>;
}
