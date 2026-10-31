import React from 'react';
/**
 * Results grid: big mono numbers with delta arrows, dashboard style. `source` labels data provenance
 * (VERIFIED, REPORTED...).
 * Local extensions (defaults keep the DS original):
 * - `dark`: inverse block on --bg-dark with mint figures.
 * - `fullBleed`: the band spans the whole viewport while its content stays on the page column.
 * - Count on hover for metrics with a `direction`: the first number in `value` animates to its
 *   final value from `from` (a real baseline) or, without one, from 10 below (up) / 10 above
 *   (down), so rising figures count up and falling ones count down. Prefix/suffix (~, %, min)
 *   are kept. Skipped with prefers-reduced-motion.
 */
const DURATION = 900;
const SPAN = 10;

function CountUp({ value, from: baseline, direction, play }) {
  const match = /(\d+(?:[.,]\d+)?)/.exec(value);
  const target = match ? parseFloat(match[1].replace(',', '.')) : null;
  const from = baseline ?? (direction === 'down' ? target + SPAN : Math.max(0, target - SPAN));
  const animates = play && target !== null && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [n, setN] = React.useState(animates ? from : target);
  const raf = React.useRef(0);

  React.useEffect(() => {
    if (!animates) return;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(from + (target - from) * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [animates, from, target]);

  if (!match) return value;
  return value.slice(0, match.index) + n + value.slice(match.index + match[1].length);
}

export function MetricsBlock({ moduleId = 'MOD.03', title = 'Results', heading, source = 'VERIFIED', metrics = [], note, dark = false, fullBleed = false, style }) {
  const [hovered, setHovered] = React.useState(null);
  const [plays, setPlays] = React.useState({});
  const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)' };
  const c = dark
    ? { id: 'var(--accent)', head: 'var(--ink-inverse-dim)', rule: 'rgba(241,247,244,0.14)', cell: 'var(--bg-dark)', cellHover: 'var(--bg-dark-2)', good: 'var(--accent)', bad: 'var(--status-alert)', label: 'var(--ink-inverse)', caption: 'var(--ink-inverse-dim)', note: 'var(--ink-inverse-dim)' }
    : { id: 'var(--accent-ink)', head: 'var(--ink-400)', rule: 'var(--line)', cell: 'var(--bg-1)', cellHover: 'var(--bg-1)', good: 'var(--accent-ink)', bad: 'var(--status-alert-ink)', label: 'var(--ink-600)', caption: 'var(--ink-400)', note: 'var(--ink-400)' };
  const band = fullBleed
    ? { marginInline: 'calc(50% - (50vw - var(--sbw, 0px) / 2))', paddingInline: 'calc((50vw - var(--sbw, 0px) / 2) - 50%)', paddingBlock: 48, borderTop: 'none' }
    : {};

  const enter = (i, animated) => {
    setHovered(i);
    if (animated) setPlays((p) => ({ ...p, [i]: (p[i] || 0) + 1 }));
  };

  return (
    <section style={{ padding: '32px 0', borderTop: '1px solid var(--line-strong)', background: dark ? 'var(--bg-dark)' : 'transparent', ...band, ...style }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', justifyContent: 'space-between', marginBottom: 24 }}>
        <span style={{ ...L, color: c.id }}>{moduleId}</span>
        <span style={{ ...L, color: c.head }}>{title.toUpperCase()} / {source}</span>
      </div>
      {heading && <h2 style={{ margin: '0 0 24px', font: 'var(--text-h3)', color: dark ? 'var(--ink-inverse)' : 'var(--ink-900)' }}>{heading}</h2>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 1, background: c.rule, border: '1px solid ' + c.rule }}>
        {metrics.map((m, i) => {
          const neg = m.direction === 'down';
          const good = m.positive !== false;
          const animated = Boolean(m.direction);
          return (
            <div key={i} onMouseEnter={() => enter(i, animated)} onMouseLeave={() => setHovered(null)}
              style={{ background: hovered === i ? c.cellHover : c.cell, padding: '20px', transition: 'background var(--dur-fast) var(--ease-hud)' }}>
              <div style={{ font: '700 clamp(28px, 3vw, 40px)/1 var(--font-mono)', color: good ? c.good : c.bad }}>
                {m.direction && <span aria-hidden="true">{neg ? '↓' : '↑'}</span>}
                {animated ? <CountUp key={plays[i] || 0} value={m.value} from={m.from} direction={m.direction} play={(plays[i] || 0) > 0} /> : m.value}
              </div>
              <div style={{ ...L, marginTop: 10, color: c.label }}>{m.label}</div>
              {m.caption && <div style={{ font: 'var(--text-micro)', color: c.caption, marginTop: 4 }}>{m.caption}</div>}
            </div>
          );
        })}
      </div>
      {note && <p style={{ margin: '14px 0 0', font: 'var(--text-caption)', color: c.note }}>{note}</p>}
    </section>
  );
}
