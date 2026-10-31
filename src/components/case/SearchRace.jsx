import React from 'react';
/**
 * "Same question, two paths" race. Both lanes share one RELATIVE time scale: the agent lane
 * stops at `ratio` (0.4 → ~60 % less time, the pilot result) and the usual lane runs to 100 %.
 * No absolute seconds are shown on purpose (the pilot only reported the relative reduction).
 * The agent answer is illustrative and never states real fees. With prefers-reduced-motion
 * the button jumps straight to the final state.
 */
const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };
const M = { font: 'var(--text-micro)', letterSpacing: 'var(--tracking-micro)', textTransform: 'uppercase' };
const TOTAL = 7000;

export function SearchRace({ data, ratio = 0.4 }) {
  const [t, setT] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const raf = React.useRef(0);
  const AGENT = TOTAL * ratio;

  React.useEffect(() => () => cancelAnimationFrame(raf.current), []);
  const run = () => {
    cancelAnimationFrame(raf.current);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setT(TOTAL); return; }
    const start = performance.now();
    setRunning(true);
    const tick = (now) => {
      const e = Math.min(now - start, TOTAL);
      setT(e);
      if (e < TOTAL) raf.current = requestAnimationFrame(tick);
      else setRunning(false);
    };
    raf.current = requestAnimationFrame(tick);
  };

  const started = t > 0;
  const done = t >= TOTAL;
  const agentDone = t >= AGENT;
  const a = Math.min(t / AGENT, 1);                       // agent lane progress 0..1
  const typed = data.question.slice(0, Math.round(Math.min(a / 0.35, 1) * data.question.length));
  const thinking = a > 0.35 && a < 0.6;
  const answer = a >= 0.6 ? data.answer.slice(0, Math.round(Math.min((a - 0.6) / 0.4, 1) * data.answer.length)) : '';

  const bar = (fraction, color, label) => (
    <div>
      <div style={{ position: 'relative', height: 8, background: 'var(--bg-0)', border: '1px solid var(--line)' }}>
        <span style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: fraction * 100 + '%', background: color }} />
      </div>
      <div style={{ ...M, display: 'flex', justifyContent: 'space-between', color: 'var(--ink-400)', marginTop: 4 }}>
        <span>{data.relative}</span><span>{label}</span>
      </div>
    </div>
  );

  const lane = (title, sub, accent, children, fraction, finished, finishLabel) => (
    <div style={{ border: '1px solid ' + (accent && finished ? 'var(--accent)' : 'var(--line)'), background: 'var(--bg-1)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid var(--line-faint)' }}>
        <span style={{ ...L, color: accent ? 'var(--accent-ink)' : 'var(--ink-600)' }}>{title}</span>
        <span style={{ ...M, color: finished ? (accent ? 'var(--accent-ink)' : 'var(--ink-900)') : 'var(--ink-400)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, background: finished ? 'var(--status-active)' : started ? 'var(--status-moderate)' : 'var(--status-off)' }} />
          {finished ? finishLabel : started ? data.searching : data.idle}
        </span>
      </div>
      <div style={{ padding: '14px', flex: 1, minHeight: 260 }}>
        <div style={{ font: 'var(--text-caption)', color: 'var(--ink-400)', marginBottom: 12 }}>{sub}</div>
        {children}
      </div>
      <div style={{ padding: '10px 14px 12px', borderTop: '1px solid var(--line-faint)' }}>
        {bar(fraction, accent ? 'var(--accent)' : 'var(--ink-600)', finished ? Math.round(fraction * 100) + ' %' : '')}
      </div>
    </div>
  );

  const usual = (
    <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {data.steps.map((s, i) => {
        const shown = t >= s.at * TOTAL;
        return (
          <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline', padding: '5px 0', opacity: shown ? 1 : 0.15, transition: 'opacity 0.25s',
            borderLeft: s.detour ? '1px dashed var(--line-strong)' : 'none', paddingLeft: s.detour ? 10 : 0, marginLeft: s.detour ? 12 : 0 }}>
            <span style={{ ...M, flex: 'none', width: 18, color: 'var(--ink-400)' }}>{s.detour ? '↳' : String(data.steps.filter((x, k) => !x.detour && k <= i).length).padStart(2, '0')}</span>
            <span style={{ font: '400 14px/1.4 var(--font-sans)', color: s.final ? 'var(--ink-900)' : 'var(--ink-600)', fontWeight: s.final ? 600 : 400 }}>
              {s.text}{s.detour && <span style={{ ...M, color: 'var(--ink-400)', marginLeft: 8 }}>{s.detour}</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );

  const bubble = (who, text, mine, extra) => (
    <div style={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
      <div style={{ maxWidth: '88%', padding: '10px 12px', background: mine ? 'var(--bg-dark)' : 'var(--accent-tint)', color: mine ? 'var(--ink-inverse)' : 'var(--ink-900)', border: mine ? 'none' : '1px solid var(--accent)' }}>
        <div style={{ ...M, color: mine ? 'var(--ink-inverse-dim)' : 'var(--accent-ink)', marginBottom: 4 }}>{who}</div>
        <div style={{ font: '400 14px/1.45 var(--font-sans)' }}>{text}</div>
        {extra}
      </div>
    </div>
  );

  const agent = (
    <div>
      {started && bubble(data.manager, typed || ' ', true)}
      {thinking && <div style={{ ...M, color: 'var(--accent-ink)', margin: '0 0 10px' }}>{data.typing}</div>}
      {answer && bubble('INTRABUDDY', answer, false, agentDone && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
          <span style={{ ...M, padding: '3px 6px', border: '1px solid var(--accent)', color: 'var(--accent-ink)', background: 'var(--bg-2)' }}>{data.source}</span>
          <span style={{ ...M, padding: '3px 6px', border: '1px solid var(--status-moderate)', color: 'var(--status-moderate-ink)' }}>{data.illustrative}</span>
        </div>
      ))}
      {!started && <div style={{ font: 'var(--text-caption)', color: 'var(--ink-400)' }}>{data.waiting}</div>}
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, padding: '14px 16px', marginBottom: 16, background: 'var(--bg-dark)' }}>
        <div>
          <div style={{ ...M, color: 'var(--ink-inverse-dim)' }}>{data.clientLabel}</div>
          <div style={{ font: '500 17px/1.4 var(--font-sans)', color: 'var(--ink-inverse)', marginTop: 4 }}>“{data.question}”</div>
        </div>
        <button type="button" onClick={run} disabled={running}
          style={{ ...L, padding: '12px 18px', cursor: running ? 'default' : 'pointer', background: 'var(--accent)', color: '#0E1F19', border: '1px solid var(--accent)', opacity: running ? 0.6 : 1 }}>
          {started ? data.replay : data.run} {'→'}
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 16 }}>
        {lane(data.withoutTitle, data.withoutSub, false, usual, t / TOTAL, done, data.found)}
        {lane(data.withTitle, data.withSub, true, agent, Math.min(t, AGENT) / TOTAL, agentDone, data.answered)}
      </div>
      <div aria-live="polite" style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginTop: 16, minHeight: 40 }}>
        {done && (
          <>
            <span style={{ font: '700 clamp(28px, 3vw, 36px)/1 var(--font-mono)', color: 'var(--accent-ink)' }}>~60%</span>
            <span style={{ ...L, color: 'var(--ink-600)' }}>{data.result}</span>
          </>
        )}
      </div>
      <p style={{ margin: '6px 0 0', font: 'var(--text-caption)', color: 'var(--ink-400)' }}>{data.note}</p>
    </div>
  );
}
