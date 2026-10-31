import React from 'react';
/**
 * Before/after time bars on a shared hour scale. "Before" is a range (solid up to the
 * minimum, hatched up to the maximum); "after" is a single value, nearly invisible at
 * this scale — which is the point. Bars grow when the block scrolls into view; with
 * prefers-reduced-motion they render at full size without animating.
 */
const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };
const M = { font: 'var(--text-micro)', letterSpacing: 'var(--tracking-micro)', textTransform: 'uppercase' };

export function TimeCompare({ data, scaleMax = 240, beforeMin = 120, beforeMax = 240, after = 3 }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  const [animate, setAnimate] = React.useState(true);
  React.useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setAnimate(!reduce);
    if (reduce || !('IntersectionObserver' in window)) return setShown(true);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const pct = (min) => (min / scaleMax) * 100 + '%';
  const grow = (delay) => (animate ? `width 1.2s var(--ease-hud) ${delay}s` : 'none');
  const track = { position: 'relative', height: 28, background: 'var(--bg-0)', border: '1px solid var(--line)' };
  const ticks = Array.from({ length: scaleMax / 60 + 1 }, (_, i) => i);

  const row = (label, value, valueColor, bar) => (
    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr 72px', gap: 16, alignItems: 'center' }}>
      <span style={{ ...L, color: 'var(--ink-600)' }}>{label}</span>
      {bar}
      <span style={{ font: '700 18px/1 var(--font-mono)', color: valueColor, textAlign: 'right' }}>{value}</span>
    </div>
  );

  return (
    <div ref={ref} role="img" aria-label={data.aria} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: 32, alignItems: 'center', padding: '24px 20px', background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
        {row(data.before, data.beforeValue, 'var(--ink-600)', (
          <div style={track}>
            <span style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: shown ? pct(beforeMax) : 0, transition: grow(0), background: 'repeating-linear-gradient(45deg, var(--line-strong) 0 4px, transparent 4px 9px)' }} />
            <span style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: shown ? pct(beforeMin) : 0, transition: grow(0), background: 'var(--ink-600)' }} />
          </div>
        ))}
        {row(data.after, data.afterValue, 'var(--accent-ink)', (
          <div style={track}>
            <span style={{ position: 'absolute', top: 0, bottom: 0, left: 0, minWidth: shown ? 3 : 0, width: shown ? pct(after) : 0, transition: grow(1), background: 'var(--accent)' }} />
          </div>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr 72px', gap: 16 }}>
          <span />
          <div style={{ position: 'relative', height: 16 }}>
            {ticks.map((h) => (
              <span key={h} style={{ ...M, position: 'absolute', left: pct(h * 60), transform: h === 0 ? 'none' : h === ticks.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)', color: 'var(--ink-400)', borderLeft: h === ticks.length - 1 ? 'none' : '1px solid var(--line)', borderRight: h === ticks.length - 1 ? '1px solid var(--line)' : 'none', padding: '0 4px', textTransform: 'none', whiteSpace: 'nowrap' }}>{h} h</span>
            ))}
          </div>
          <span />
        </div>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 4 }}>
          <span style={{ ...M, color: 'var(--ink-400)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 14, height: 8, background: 'var(--ink-600)' }} />{data.legendMin}
          </span>
          <span style={{ ...M, color: 'var(--ink-400)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 14, height: 8, background: 'repeating-linear-gradient(45deg, var(--line-strong) 0 3px, transparent 3px 6px)', border: '1px solid var(--line)' }} />{data.legendRange}
          </span>
        </div>
      </div>
      <div style={{ textAlign: 'right', paddingLeft: 24, borderLeft: '1px solid var(--line)' }}>
        <div style={{ font: '700 clamp(36px, 4.5vw, 56px)/1 var(--font-mono)', color: 'var(--accent-ink)', opacity: shown ? 1 : 0, transition: animate ? 'opacity 0.6s ease 1.6s' : 'none' }}>{data.factor}</div>
        <div style={{ ...L, color: 'var(--ink-600)', marginTop: 8 }}>{data.factorCaption}</div>
      </div>
    </div>
  );
}
