import React from 'react';
import { HoverCard } from '../case/HoverCard.jsx';
import { PROJECTS, projectIndex } from '../../lib/projects.js';
/**
 * "More cases" carousel closing a case study: the other projects as compact thumbnails
 * (smaller than the landing ProjectCard) in a horizontal track.
 * - Native scroll + scroll-snap: swipe on touch, trackpad/shift-wheel on desktop, and focus
 *   (Tab) brings each link into view. The arrow buttons only appear when the track overflows
 *   and disable themselves at each end.
 * - prefers-reduced-motion: arrow jumps are instant instead of smooth.
 */
const COPY = {
  ESP: { heading: 'Más casos', view: 'VER', prev: 'Casos anteriores', next: 'Casos siguientes' },
  ENG: { heading: 'More cases', view: 'VIEW', prev: 'Previous cases', next: 'Next cases' },
};
const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)' };
const GAP = 16;

function Thumb({ p, lang, view }) {
  const t = p[lang];
  return (
    <a href={p.href} style={{ flex: '0 0 clamp(220px, 72vw, 270px)', scrollSnapAlign: 'start', textDecoration: 'none', color: 'var(--ink-900)', display: 'flex' }}>
      <HoverCard style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{ position: 'relative', aspectRatio: '16/10', background: '#8FA69B', overflow: 'hidden' }}>
          <img src={p.image} alt="" loading="lazy" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
          <span style={{ position: 'absolute', top: 8, right: 10, font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--ink-inverse)', background: 'rgba(14,31,25,0.55)', padding: '3px 6px' }}>{projectIndex(p)}</span>
        </div>
        <div style={{ padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          <span style={{ font: 'var(--text-h6)' }}>{t.title}</span>
          <span style={{ font: 'var(--text-body-sm)', color: 'var(--ink-600)', flex: 1 }}>{t.excerpt}</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, marginTop: 4, paddingTop: 8, borderTop: '1px solid var(--line-faint)' }}>
            <span style={{ font: '700 15px/1.2 var(--font-mono)', color: 'var(--accent-ink)', whiteSpace: 'nowrap' }}>{t.metric.value}</span>
            <span style={{ ...L, whiteSpace: 'nowrap' }}>{view} {'↗'}</span>
          </div>
        </div>
      </HoverCard>
    </a>
  );
}

function Arrow({ dir, disabled, label, onClick }) {
  return (
    <button type="button" aria-label={label} disabled={disabled} onClick={onClick}
      style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', background: 'var(--bg-1)', border: '1px solid ' + (disabled ? 'var(--line)' : 'var(--line-strong)'), color: disabled ? 'var(--ink-400)' : 'var(--ink-900)', cursor: disabled ? 'default' : 'pointer', font: '400 16px/1 var(--font-mono)', borderRadius: 0 }}>
      {dir < 0 ? '←' : '→'}
    </button>
  );
}

export function MoreCases({ current, lang = 'ESP', style }) {
  const c = COPY[lang];
  const items = PROJECTS.filter((p) => p.slug !== current);
  const track = React.useRef(null);
  const [edges, setEdges] = React.useState({ overflow: false, start: true, end: false });

  React.useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setEdges({
      overflow: el.scrollWidth > el.clientWidth + 1,
      start: el.scrollLeft <= 1,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    el.addEventListener('scroll', update, { passive: true });
    return () => { ro.disconnect(); el.removeEventListener('scroll', update); };
  }, []);

  // One card per click (width of the first card + the gap).
  const step = (dir) => {
    const el = track.current;
    const card = el && el.firstElementChild;
    if (!card) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * (card.offsetWidth + GAP), behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <section aria-label={c.heading} style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid var(--line-strong)', ...style }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 16px', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <span style={{ ...L, color: 'var(--accent-ink)' }}>JR.WORK — MORE CASES / {String(items.length).padStart(2, '0')} REC</span>
          <h2 style={{ margin: '12px 0 0', font: 'var(--text-h3)' }}>{c.heading}</h2>
        </div>
        {edges.overflow && (
          <div style={{ display: 'flex', gap: 8 }}>
            <Arrow dir={-1} label={c.prev} disabled={edges.start} onClick={() => step(-1)} />
            <Arrow dir={1} label={c.next} disabled={edges.end} onClick={() => step(1)} />
          </div>
        )}
      </div>
      {/* 2px padding keeps the HoverCard corner brackets (offset -1px) from being clipped by the scroller. */}
      <div ref={track} className="jr-more-track" style={{ display: 'flex', gap: GAP, overflowX: 'auto', scrollSnapType: 'x mandatory', scrollPaddingLeft: 2, padding: 2, scrollbarWidth: 'none' }}>
        {items.map((p) => <Thumb key={p.slug} p={p} lang={lang} view={c.view} />)}
      </div>
      <style>{'.jr-more-track::-webkit-scrollbar{display:none}'}</style>
    </section>
  );
}
