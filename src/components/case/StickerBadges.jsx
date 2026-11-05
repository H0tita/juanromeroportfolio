import React from 'react';
import { HoverCard } from './HoverCard.jsx';
/**
 * Badge stickers in rows (one row per set) × levels. Each sticker sits flat (front view) at rest;
 * with a mouse over its card it turns left/right with the pointer, between -MAX and +MAX degrees,
 * and a specular band slides across it like light on vinyl.
 * - Die-cut look: a white outline around the PNG's alpha + a soft shadow that shifts with the turn.
 * - Updates go through CSS variables on the stage — no React re-render per move.
 * - Touch and prefers-reduced-motion: stays static in front view.
 * - Below 550px each row becomes a horizontal scroll-snap carousel (starting at LVL.01). There is
 *   no hover there, so the sticker that lands fully in the centre plays the light sweep once
 *   (left → right with a slight turn); it can play again only after leaving the centre. Rows
 *   off screen don't play. prefers-reduced-motion: no sweep.
 */
const MAX = 15;
const CAROUSEL = '(max-width: 549px)';
const SWEEP_MS = 1300;

function Sticker({ src, alt, code, name, text, sweep = 0, carousel = false }) {
  const stage = React.useRef(null);
  const sheen = React.useRef(null);
  // Carousel sweep: same motion as dragging a mouse across the card, played with the Web
  // Animations API on top of the CSS-variable state (which stays at rest, so nothing to reset).
  React.useEffect(() => {
    if (!sweep || !stage.current || !sheen.current) return;
    const opts = { duration: SWEEP_MS, easing: 'cubic-bezier(0.45, 0, 0.25, 1)' };
    stage.current.animate([{ transform: 'rotateY(-8deg)' }, { transform: 'rotateY(8deg)', offset: 0.75 }, { transform: 'rotateY(0deg)' }], opts);
    sheen.current.animate([
      { opacity: 0, backgroundPosition: '100% 0' },
      { opacity: 1, offset: 0.15 },
      { opacity: 1, offset: 0.8 },
      { opacity: 0, backgroundPosition: '0% 0' },
    ], opts);
  }, [sweep]);
  const set = (ry, sx, lit) => {
    const el = stage.current;
    if (!el) return;
    el.style.setProperty('--ry', ry + 'deg');
    el.style.setProperty('--shx', (ry * -0.4).toFixed(1) + 'px'); // shadow falls away from the turn
    el.style.setProperty('--sx', sx + '%');
    el.style.setProperty('--lit', lit);
  };
  const move = (e) => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const k = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)); // 0 left … 1 right
    stage.current.style.transition = 'transform 80ms linear';
    set(((k - 0.5) * 2 * MAX).toFixed(2), (100 - k * 100).toFixed(1), 1);
  };
  const leave = () => {
    if (stage.current) stage.current.style.transition = 'transform var(--dur-med) var(--ease-hud)';
    set(0, 50, 0);
  };
  const mask = { WebkitMaskImage: `url(${src})`, maskImage: `url(${src})`, WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' };
  const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };
  return (
    <HoverCard style={{ padding: carousel ? '16px 16px 18px' : 'clamp(8px, 2.5vw, 16px) clamp(8px, 2.5vw, 16px) clamp(10px, 2.5vw, 18px)', display: 'flex', flexDirection: 'column', minWidth: 0, height: '100%', boxSizing: 'border-box' }}>
      <div onPointerMove={move} onPointerLeave={leave} style={{ perspective: 700, padding: carousel ? 16 : 'clamp(2px, 1.5vw, 24px)' }}>
        <div ref={stage} style={{ '--ry': '0deg', '--shx': '0px', '--sx': '50%', '--lit': 0, position: 'relative', aspectRatio: '1', transform: 'rotateY(var(--ry))', transformStyle: 'preserve-3d', willChange: 'transform',
          filter: 'drop-shadow(var(--shx) 6px 8px rgba(14,31,25,0.18))' }}>
          <img src={src} alt={alt} loading="lazy" draggable="false" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain',
            filter: 'drop-shadow(3px 0 0 #fff) drop-shadow(-3px 0 0 #fff) drop-shadow(0 3px 0 #fff) drop-shadow(0 -3px 0 #fff)' }} />
          <span ref={sheen} aria-hidden="true" style={{ position: 'absolute', inset: 0, ...mask, opacity: 'var(--lit)', transition: 'opacity var(--dur-med) var(--ease-hud)', mixBlendMode: 'screen', pointerEvents: 'none',
            backgroundImage: 'linear-gradient(105deg, transparent 45%, rgba(255,255,255,0.18) 47.5%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.18) 52.5%, transparent 55%)', backgroundSize: '300% 100%', backgroundPosition: 'var(--sx) 0' }} />
        </div>
      </div>
      <span style={{ ...L, color: 'var(--accent-ink)', marginTop: 8 }}>{code}</span>
      <span style={{ font: 'var(--text-h5)', fontSize: carousel ? 20 : 'clamp(14px, 3.8vw, 20px)', color: 'var(--ink-900)', marginTop: 4 }}>{name}</span>
      <span className={carousel ? undefined : 'jr-hide-xs'} style={{ font: 'var(--text-body-sm)', color: 'var(--ink-600)', marginTop: 4 }}>{text}</span>
    </HoverCard>
  );
}

/** One set of stickers: a 3-column grid, or (carousel) a scroll-snap track with position dots. */
function StickerRow({ row, levels, src, alt, carousel, L }) {
  const track = React.useRef(null);
  const [sweeps, setSweeps] = React.useState(() => levels.map(() => 0));
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const el = track.current;
    if (!carousel || !el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = [...el.children];
    const ratio = cards.map(() => 0);
    const played = cards.map(() => false);
    let rowVisible = false;
    const play = () => {
      const i = ratio.findIndex((r) => r >= 0.97);
      if (reduce || i < 0 || !rowVisible || played[i]) return;
      played[i] = true;
      setSweeps((s) => s.map((n, j) => (j === i ? n + 1 : n)));
    };
    // The track shows ~1.4 cards, so the only fully visible card is the centred one.
    const inTrack = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const i = cards.indexOf(e.target);
        ratio[i] = e.intersectionRatio;
        if (e.intersectionRatio < 0.6) played[i] = false; // left the centre: may sweep again on return
      }
      setCurrent(ratio.indexOf(Math.max(...ratio)));
      play();
    }, { root: el, threshold: [0, 0.6, 0.97, 1] });
    // The row itself must be on screen, or the sweep would play unseen.
    const onScreen = new IntersectionObserver(([e]) => { rowVisible = e.intersectionRatio >= 0.6; play(); }, { threshold: [0, 0.6] });
    cards.forEach((c) => inTrack.observe(c));
    onScreen.observe(el);
    return () => { inTrack.disconnect(); onScreen.disconnect(); };
  }, [carousel]);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
        <span style={{ font: 'var(--text-h5)', color: 'var(--ink-900)' }}>{row.name}</span>
        <span style={L}>{row.label}</span>
      </div>
      <div ref={track} className={carousel ? 'jr-sticker-track' : undefined} style={carousel
        ? { display: 'flex', gap: 12, overflowX: 'auto', scrollSnapType: 'x mandatory', padding: '2px 14%', scrollPaddingInline: '14%', scrollbarWidth: 'none' }
        : { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 'clamp(8px, 2vw, 16px)' }}>
        {levels.map((lv, i) => {
          const sticker = (
            <Sticker key={lv.code} src={src[row.key][i]} code={lv.code} name={lv.name} text={lv.text} sweep={sweeps[i]} carousel={carousel}
              alt={alt.replace('{level}', lv.name).replace('{row}', row.name.toLowerCase())} />
          );
          return carousel ? <div key={lv.code} style={{ flex: '0 0 72%', scrollSnapAlign: 'center' }}>{sticker}</div> : sticker;
        })}
      </div>
      {carousel && (
        <div aria-hidden="true" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 12 }}>
          {levels.map((lv, i) => <span key={lv.code} style={{ width: i === current ? 18 : 6, height: 6, background: i === current ? 'var(--accent)' : 'var(--line)', transition: 'width var(--dur-med) var(--ease-hud), background var(--dur-med) var(--ease-hud)' }} />)}
          <span style={{ ...L, marginLeft: 8 }}>{String(current + 1).padStart(2, '0')} / {String(levels.length).padStart(2, '0')}</span>
        </div>
      )}
    </div>
  );
}

export function StickerBadges({ rows, levels, src, alt, style }) {
  const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)' };
  const [carousel, setCarousel] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(CAROUSEL);
    const on = () => setCarousel(mq.matches);
    on();
    // 'resize' as well: some browsers / emulators skip the media-query change event.
    mq.addEventListener('change', on);
    window.addEventListener('resize', on);
    return () => { mq.removeEventListener('change', on); window.removeEventListener('resize', on); };
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, ...style }}>
      {rows.map((row) => <StickerRow key={row.key} row={row} levels={levels} src={src} alt={alt} carousel={carousel} L={L} />)}
      {/* Hint classes for the module intro: the hover line on the grid, the swipe line on the carousel. */}
      <style>{'.jr-sticker-track::-webkit-scrollbar{display:none}.jr-hint-swipe{display:none}@media(max-width:549px){.jr-hint-hover{display:none}.jr-hint-swipe{display:inline}}'}</style>
    </div>
  );
}
