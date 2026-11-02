import React from 'react';
/**
 * Landing band inviting to the Brand Book, between Work and About: mint surface, title + CTA on
 * the left, an animated system illustration on the right (inline SVG + CSS keyframes, 6s loop):
 * a floating card settles into its slot, a toggle flips, chart bars grow, header lines draw in and
 * the dashed connector flows. prefers-reduced-motion shows the final, static composition.
 */
const COPY = {
  ESP: { title: 'Esta web tiene su propio sistema de diseño', text: 'Color, tipografía, componentes y reglas: explicados y para probar.', cta: 'Abrir Brand Book' },
  ENG: { title: 'This site runs on its own design system', text: 'Colour, type, components and rules: explained and hands-on.', cta: 'Open the Brand Book' },
};
const INK = 'var(--ink-900)', DARK = 'var(--bg-dark)', MINT = 'var(--accent)', TINT = 'var(--accent-tint)', PAPER = 'var(--bg-2)', LINE = 'var(--line)';

function Illustration() {
  return (
    <svg viewBox="0 0 560 300" role="img" aria-label="Design system illustration" className="jr-bbt-svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
      <defs>
        <pattern id="jr-bbt-dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="1" fill="rgba(14,31,25,0.22)" /></pattern>
      </defs>
      <rect x="0" y="0" width="560" height="300" fill="url(#jr-bbt-dots)" />

      {/* Dashed connectors */}
      <g fill="none" stroke={INK} strokeWidth="1" strokeDasharray="4 5" opacity="0.55">
        <path className="jr-bbt-flow" d="M210 60 C 250 10, 330 10, 360 60" />
        <path className="jr-bbt-flow" d="M510 120 C 545 150, 545 220, 510 250" />
        <path className="jr-bbt-flow" d="M60 210 C 25 190, 25 110, 60 90" />
      </g>

      {/* Mobile panel */}
      <g>
        <rect x="60" y="30" width="150" height="240" fill={PAPER} stroke={INK} strokeWidth="1.5" />
        <rect x="60.75" y="30.75" width="148.5" height="90" fill={DARK} />
        <rect x="74" y="44" width="16" height="16" fill={MINT} />
        <rect className="jr-bbt-line" x="74" y="74" width="118" height="3" fill="var(--ink-inverse)" />
        <rect className="jr-bbt-line jr-bbt-d1" x="74" y="83" width="46" height="3" fill="var(--ink-inverse-dim)" />
        <rect x="74" y="96" width="54" height="14" fill={MINT} />
        <rect x="84" y="102" width="34" height="2" fill={INK} />
        {/* list row with toggle */}
        <rect x="70" y="134" width="130" height="28" fill={PAPER} stroke={INK} strokeWidth="1" />
        <rect x="78" y="141" width="14" height="14" fill={MINT} />
        <rect x="98" y="144" width="50" height="3" fill={INK} />
        <rect x="98" y="151" width="30" height="2" fill={LINE} />
        <rect className="jr-bbt-track" x="170" y="144" width="20" height="8" fill={LINE} />
        <rect className="jr-bbt-knob" x="170" y="142" width="12" height="12" fill={INK} />
        {/* placeholders */}
        <rect x="70" y="172" width="130" height="28" fill="none" stroke={LINE} strokeDasharray="3 3" />
        <rect x="70" y="208" width="130" height="28" fill="none" stroke={LINE} strokeDasharray="3 3" />
        <rect x="70.5" y="246" width="129" height="18" fill={TINT} />
      </g>

      {/* Desktop panel */}
      <g>
        <rect x="230" y="60" width="280" height="210" fill={PAPER} stroke={INK} strokeWidth="1.5" />
        <rect x="244" y="74" width="252" height="88" fill={DARK} />
        <rect className="jr-bbt-line jr-bbt-d2" x="258" y="92" width="150" height="3" fill="var(--ink-inverse)" />
        <rect className="jr-bbt-line jr-bbt-d3" x="258" y="101" width="60" height="3" fill="var(--ink-inverse-dim)" />
        <rect x="258" y="134" width="50" height="14" fill={MINT} />
        <rect x="268" y="140" width="30" height="2" fill={INK} />
        <rect x="244" y="174" width="120" height="28" fill={PAPER} stroke={INK} strokeWidth="1" />
        <rect x="254" y="184" width="90" height="3" fill={INK} />
        <rect x="254" y="191" width="40" height="2" fill={LINE} />
        <rect x="244" y="210" width="120" height="50" fill={PAPER} stroke={INK} strokeWidth="1" />
        {[[256, 26, LINE], [272, 34, LINE], [288, 18, LINE], [304, 30, MINT], [320, 22, LINE], [336, 36, INK]].map(([x, h, c], i) => (
          <rect key={x} className="jr-bbt-bar" style={{ animationDelay: i * 0.12 + 's' }} x={x} y={254 - h} width="6" height={h} fill={c} />
        ))}
        {/* slot for the floating card */}
        <rect x="378" y="174" width="118" height="86" fill="none" stroke={LINE} strokeDasharray="3 3" />
      </g>

      {/* Floating card (popover → settles into the slot) */}
      <g className="jr-bbt-card">
        <rect x="378" y="174" width="118" height="70" fill={PAPER} stroke={INK} strokeWidth="1.5" />
        <rect x="388" y="186" width="26" height="3" fill={MINT} />
        <rect x="388" y="196" width="96" height="3" fill={INK} />
        <rect x="388" y="222" width="44" height="12" fill={MINT} />
        <rect x="397" y="227" width="26" height="2" fill={INK} />
        <path d="M374 170v8M374 170h8M500 248v-8M500 248h-8" stroke={MINT} strokeWidth="2" fill="none" />
      </g>

      {/* Swatch block + type tile */}
      <g>
        <rect x="150" y="246" width="22" height="22" fill={MINT} stroke={INK} strokeWidth="1" />
        <rect x="172" y="246" width="22" height="22" fill={TINT} stroke={INK} strokeWidth="1" />
        <rect x="150" y="268" width="22" height="22" fill={PAPER} stroke={INK} strokeWidth="1" />
        <rect x="172" y="268" width="22" height="22" fill={DARK} stroke={INK} strokeWidth="1" />
      </g>
      <g className="jr-bbt-type">
        <rect x="438" y="236" width="52" height="52" fill={DARK} />
        <text x="464" y="271" textAnchor="middle" fill={MINT} style={{ font: '600 26px var(--font-sans)' }}>Aa</text>
      </g>

      {/* Sparkle from the logo */}
      <g className="jr-bbt-spark" stroke={INK} strokeWidth="2">
        <line x1="530" y1="22" x2="530" y2="46" /><line x1="518" y1="34" x2="542" y2="34" />
        <line x1="521.5" y1="25.5" x2="538.5" y2="42.5" /><line x1="538.5" y1="25.5" x2="521.5" y2="42.5" />
      </g>
    </svg>
  );
}

export function BrandBookTeaser({ lang = 'ESP' }) {
  const c = COPY[lang];
  const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };
  return (
    <section data-screen-label="Brand Book" style={{ background: 'var(--accent)', borderTop: '1px solid var(--line-strong)', padding: '40px var(--page-margin, 64px)', overflow: 'hidden' }}>
      <div className="jr-bbt" style={{ display: 'grid', gap: 32, alignItems: 'center' }}>
        <div>
          <span style={{ ...L, color: 'var(--ink-900)' }}>JR.BRAND — SYSTEM SPEC / 10 MOD</span>
          <h2 style={{ margin: '16px 0 0', font: 'var(--text-h2)', color: 'var(--ink-900)', maxWidth: '16ch' }}>{c.title}</h2>
          <p style={{ margin: '14px 0 0', font: 'var(--text-body)', color: 'var(--ink-900)', maxWidth: '44ch' }}>{c.text}</p>
          <a href="/brand-book" className="jr-bbt-cta" style={{ ...L, display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 28, padding: '16px 28px', textDecoration: 'none' }}>
            {c.cta} <span aria-hidden="true" style={{ fontSize: 13 }}>{'↗'}</span>
          </a>
        </div>
        <Illustration />
      </div>
      <style>{`
        .jr-bbt{grid-template-columns:minmax(0,5fr) minmax(0,7fr)}
        @media(max-width:899px){.jr-bbt{grid-template-columns:minmax(0,1fr)}.jr-bbt-svg{max-width:560px}}
        .jr-bbt-cta{background:var(--ink-900);color:var(--ink-inverse);border:1px solid var(--ink-900);transition:background var(--dur-fast) var(--ease-hud),color var(--dur-fast) var(--ease-hud)}
        .jr-bbt-cta:hover{background:var(--bg-2);color:var(--ink-900)}
        .jr-bbt-cta:active{transform:translateY(1px)}
        .jr-bbt-cta:focus-visible{outline:2px solid var(--ink-900);outline-offset:3px}
        .jr-bbt-svg *{transform-box:fill-box}
        .jr-bbt-flow{animation:jr-bbt-flow 1.6s linear infinite}
        .jr-bbt-line{transform-origin:left center;animation:jr-bbt-line 6s cubic-bezier(0.2,0,0,1) infinite}
        .jr-bbt-d1{animation-delay:.15s}.jr-bbt-d2{animation-delay:.3s}.jr-bbt-d3{animation-delay:.45s}
        .jr-bbt-knob{animation:jr-bbt-knob 6s cubic-bezier(0.2,0,0,1) infinite}
        .jr-bbt-bar{transform-origin:center bottom;animation:jr-bbt-bar 6s cubic-bezier(0.2,0,0,1) infinite}
        .jr-bbt-card{animation:jr-bbt-card 6s cubic-bezier(0.2,0,0,1) infinite}
        .jr-bbt-type{transform-origin:center;animation:jr-bbt-type 6s cubic-bezier(0.2,0,0,1) infinite}
        .jr-bbt-spark{transform-origin:center;animation:jr-bbt-spark 6s cubic-bezier(0.2,0,0,1) infinite}
        @keyframes jr-bbt-flow{to{stroke-dashoffset:-18}}
        @keyframes jr-bbt-line{0%,4%{transform:scaleX(0)}16%,90%{transform:scaleX(1)}100%{transform:scaleX(0)}}
        @keyframes jr-bbt-knob{0%,40%{transform:translateX(0)}48%,82%{transform:translateX(8px)}90%,100%{transform:translateX(0)}}
        @keyframes jr-bbt-bar{0%,20%{transform:scaleY(0.15)}34%,90%{transform:scaleY(1)}100%{transform:scaleY(0.15)}}
        @keyframes jr-bbt-card{0%,8%{transform:translate(46px,-58px);opacity:0}14%{opacity:1;transform:translate(46px,-58px)}30%,88%{transform:translate(0,0);opacity:1}96%,100%{transform:translate(0,0);opacity:0}}
        @keyframes jr-bbt-type{0%,52%{transform:translateY(0)}58%{transform:translateY(-6px)}64%,100%{transform:translateY(0)}}
        @keyframes jr-bbt-spark{0%,60%{transform:rotate(0)}72%,100%{transform:rotate(45deg)}}
        @media(prefers-reduced-motion:reduce){.jr-bbt-svg *{animation:none !important}}
      `}</style>
    </section>
  );
}
