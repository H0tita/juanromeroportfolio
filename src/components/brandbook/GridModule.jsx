import React from 'react';
/**
 * Grid & spacing module: the 4px spacing scale (read from the live --sp-* tokens), a live readout
 * of the visitor's viewport (width, breakpoint, page margin) and a toggle that draws the 12-column
 * grid over the whole page (fixed, pointer-events: none, so the page stays usable). Esc hides it.
 */
const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };
const STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const BPS = [[1440, 'XL ≥1440'], [1024, 'LG 1024'], [768, 'MD 768'], [480, 'SM 480'], [0, 'XS <480']];

export function GridModule({ t }) {
  const [sp, setSp] = React.useState({});
  const [view, setView] = React.useState({ w: 0, margin: '' });
  const [overlay, setOverlay] = React.useState(false);
  React.useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    setSp(Object.fromEntries(STEPS.map((n) => [n, css.getPropertyValue('--sp-' + n).trim()])));
    const read = () => setView({ w: window.innerWidth, margin: getComputedStyle(document.documentElement).getPropertyValue('--page-margin').trim() });
    read();
    window.addEventListener('resize', read);
    return () => window.removeEventListener('resize', read);
  }, []);
  React.useEffect(() => {
    if (!overlay) return;
    const esc = (e) => e.key === 'Escape' && setOverlay(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [overlay]);
  const bp = BPS.find(([min]) => view.w >= min)[1];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 32, alignItems: 'start' }}>
      <div>
        <div style={{ ...L, color: 'var(--ink-400)', marginBottom: 12 }}>{t.scale} / 4PX BASE</div>
        <div style={{ borderTop: '1px solid var(--line-strong)' }}>
          {STEPS.map((n) => (
            <div key={n} style={{ display: 'grid', gridTemplateColumns: '64px 52px 1fr', gap: 12, alignItems: 'center', padding: '7px 0', borderBottom: '1px solid var(--line-faint)' }}>
              <span style={{ font: 'var(--text-caption)', color: 'var(--ink-900)' }}>--sp-{n}</span>
              <span style={{ font: 'var(--text-caption)', color: 'var(--ink-400)', textAlign: 'right' }}>{sp[n]}</span>
              <span style={{ display: 'block', height: 10, width: sp[n] || 0, maxWidth: '100%', background: 'var(--accent)' }} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ background: 'var(--bg-dark)', color: 'var(--ink-inverse)', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ ...L, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, background: 'var(--status-active)', animation: 'jr-blink 1.2s steps(2,start) infinite' }} />{t.live}
          </span>
          {[[t.labels.width, view.w + 'PX'], [t.labels.breakpoint, bp], [t.labels.margin, view.margin.toUpperCase()], [t.labels.columns, '12 / GUTTER 24PX']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, paddingTop: 10, borderTop: '1px solid var(--bg-dark-2)' }}>
              <span style={{ ...L, color: 'var(--ink-inverse-dim)' }}>{k}</span><span style={{ ...L, color: 'var(--ink-inverse)' }}>{v}</span>
            </div>
          ))}
        </div>
        {/* Mini 12-col diagram */}
        <div aria-hidden="true" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4, height: 64, padding: '0 8px', border: '1px solid var(--line)', background: 'var(--bg-1)' }}>
          {Array.from({ length: 12 }, (_, i) => <span key={i} style={{ background: 'var(--accent-tint)', borderLeft: '1px solid var(--accent-dim)', borderRight: '1px solid var(--accent-dim)' }} />)}
        </div>
        <button type="button" aria-pressed={overlay} onClick={() => setOverlay((o) => !o)}
          style={{ ...L, alignSelf: 'flex-start', padding: '12px 18px', borderRadius: 0, cursor: 'pointer', border: '1px solid var(--ink-900)', background: overlay ? 'var(--ink-900)' : 'transparent', color: overlay ? 'var(--ink-inverse)' : 'var(--ink-900)' }}>
          {overlay ? t.overlayOff : t.overlay} {overlay ? '[ESC]' : ''}
        </button>
      </div>

      {overlay && (
        <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 1000, pointerEvents: 'none', padding: '0 var(--page-margin, 64px)' }}>
          <div style={{ height: '100%', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--grid-gutter, 24px)' }}>
            {Array.from({ length: 12 }, (_, i) => <span key={i} style={{ background: 'rgba(72,181,154,0.10)', borderLeft: '1px solid rgba(72,181,154,0.45)', borderRight: '1px solid rgba(72,181,154,0.45)' }} />)}
          </div>
        </div>
      )}
      <style>{'@keyframes jr-blink{to{visibility:hidden}}'}</style>
    </div>
  );
}
