import React from 'react';
import { Navbar } from '../navigation/Navbar.jsx';
import { Footer } from '../navigation/Footer.jsx';
import { ReactiveDotField } from '../hud/ReactiveDotField.jsx';
import { ModuleSection } from '../case/ModuleSection.jsx';
import { Body } from '../case/Body.jsx';
import { ProcessTimeline } from '../modules/ProcessTimeline.jsx';
import { GoldenRule } from './GoldenRule.jsx';
import { ColorModule } from './ColorModule.jsx';
import { TypeModule } from './TypeModule.jsx';
import { ComponentBench } from './ComponentBench.jsx';
import { useLang } from '../../lib/useLang.js';
import { NAV_ITEMS, navigateTo } from '../../lib/nav.js';
import { BRAND_BOOK } from '../../content/brandbook';

/**
 * Brand Book island (/brand-book): the design system explained with hands-on modules.
 * - Desktop: sticky module index on the left with scroll-spy; below 1024px the index is hidden
 *   and the modules stack.
 * - Each module = HUD header (MOD.0n) + editorial heading/intro + an interactive.
 * Mounted with client:load.
 */
const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)' };

export default function BrandBook() {
  const [lang, setLang] = useLang();
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState('rule');
  const t = BRAND_BOOK[lang];
  const MODULES = [
    { id: 'rule', label: 'GOLDEN RULE', heading: t.rule.heading, intro: t.rule.body, body: <GoldenRule t={t.rule} /> },
    { id: 'color', label: 'COLOR', heading: t.color.heading, intro: t.color.body, body: <ColorModule t={t.color} /> },
    { id: 'type', label: 'TYPOGRAPHY', heading: t.type.heading, intro: t.type.body, body: <TypeModule t={t.type} /> },
    { id: 'components', label: 'COMPONENTS', heading: t.components.heading, intro: t.components.body, body: <ComponentBench t={t.components} /> },
    { id: 'process', label: 'PROCESS', heading: t.process.heading, intro: t.process.body },
  ];

  React.useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 80);
      let current = MODULES[0].id;
      for (const m of MODULES) {
        const el = document.getElementById(m.id);
        if (el && el.getBoundingClientRect().top <= 160) current = m.id;
      }
      setActive(current);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const jump = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    el && window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };
  const mod = (i) => 'MOD.' + String(i + 1).padStart(2, '0');

  return (
    <div>
      <Navbar items={NAV_ITEMS} active="Brand Book" lang={lang} onLangChange={setLang} onNavigate={navigateTo} scrolled={scrolled} logoSrc="/logos/logo-color.svg" city="Madrid, Spain" />

      <header style={{ position: 'relative', overflow: 'hidden', padding: '72px var(--page-margin, 64px) 80px', borderBottom: '1px solid var(--line-strong)' }}>
        <ReactiveDotField fade="left" gap={22} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '55%' }} />
        <div style={{ position: 'relative', maxWidth: 720 }}>
          <span style={{ ...L, color: 'var(--accent-ink)' }}>JR.BRAND — MOD.00 / SYSTEM SPEC</span>
          <h1 style={{ margin: '20px 0 0', font: 'var(--text-h1)' }}>{t.title}</h1>
          <p style={{ margin: '24px 0 0', font: 'var(--text-body-lg)', color: 'var(--ink-600)', maxWidth: '54ch' }}>{t.intro}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 28px', marginTop: 40, paddingTop: 18, borderTop: '1px solid var(--line)' }}>
            {[['SYSTEM', 'TACTICAL TELEMETRY'], ['MODE', 'LIGHT'], ['LAYERS', 'HUD + EDITORIAL'], ['BUILD', 'V5']].map(([k, v]) => (
              <span key={k} style={L}>{k} <span style={{ color: 'var(--ink-900)' }}>{v}</span></span>
            ))}
          </div>
        </div>
      </header>

      <div className="jr-bb" style={{ maxWidth: 1280, margin: '0 auto', padding: '24px var(--page-margin, 64px) 96px' }}>
        <nav aria-label={t.index} className="jr-bb-index">
          <div style={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 32 }}>
            <span style={{ ...L, marginBottom: 12 }}>{t.index}</span>
            {MODULES.map((m, i) => {
              const on = active === m.id;
              return (
                <a key={m.id} href={'#' + m.id} onClick={(e) => jump(e, m.id)} aria-current={on ? 'true' : undefined}
                  style={{ ...L, display: 'flex', gap: 10, padding: '9px 10px', textDecoration: 'none', color: on ? 'var(--accent-ink)' : 'var(--ink-600)', background: on ? 'var(--accent-tint)' : 'transparent', borderLeft: '2px solid ' + (on ? 'var(--accent)' : 'var(--line)'), transition: 'background var(--dur-fast) var(--ease-hud), color var(--dur-fast)' }}>
                  <span style={{ color: on ? 'var(--accent-ink)' : 'var(--ink-400)' }}>{String(i + 1).padStart(2, '0')}</span>{m.label}
                </a>
              );
            })}
          </div>
        </nav>

        <main style={{ minWidth: 0 }}>
          {MODULES.map((m, i) => m.id === 'process' ? (
            <div key={m.id} id={m.id}>
              <ModuleSection moduleId={mod(i)} label={m.label} heading={m.heading} intro={<Body items={m.intro} />} />
              <ProcessTimeline moduleId={mod(i) + '.A'} phases={t.process.phases} style={{ borderTop: '1px solid var(--line)' }} />
              <section style={{ padding: '32px 0 0', borderTop: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ ...L, color: 'var(--accent-ink)' }}>{mod(i)}.B</span>
                  <span style={L}>RELEASE LOG / {String(t.process.releases.items.length).padStart(2, '0')} TAGS</span>
                </div>
                <h3 style={{ margin: '0 0 16px', font: 'var(--text-h5)', color: 'var(--ink-900)' }}>{t.process.releases.heading}</h3>
                <ol style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid var(--line-strong)' }}>
                  {[...t.process.releases.items].reverse().map((r, j) => (
                    <li key={r.v} style={{ display: 'grid', gridTemplateColumns: '56px 96px 1fr', gap: 16, padding: '14px 0', borderBottom: '1px solid var(--line-faint)', alignItems: 'baseline' }}>
                      <span style={{ font: '700 15px/1 var(--font-mono)', color: j === 0 ? 'var(--accent-ink)' : 'var(--ink-900)' }}>{r.v}</span>
                      <span style={L}>{r.date}</span>
                      <span style={{ font: 'var(--text-body-sm)', color: 'var(--ink-600)' }}>{r.text}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          ) : (
            <div key={m.id} id={m.id}>
              <ModuleSection moduleId={mod(i)} label={m.label} heading={m.heading} intro={<Body items={m.intro} />} style={{ paddingBottom: 56 }}>
                {m.body}
              </ModuleSection>
            </div>
          ))}
        </main>
      </div>

      <Footer items={NAV_ITEMS} logoSrc="/logos/logo-white.svg" email="hello@juanromeroportfolio.com" onNavigate={navigateTo} />
      <style>{
        '.jr-bb{display:grid;grid-template-columns:200px minmax(0,1fr);gap:48px}' +
        '@media(max-width:1023px){.jr-bb{grid-template-columns:minmax(0,1fr)}.jr-bb-index{display:none}}' +
        '.jr-range{-webkit-appearance:none;appearance:none;width:100%;height:24px;background:transparent;cursor:pointer;margin:0}' +
        '.jr-range::-webkit-slider-runnable-track{height:2px;background:var(--ink-900)}' +
        '.jr-range::-moz-range-track{height:2px;background:var(--ink-900)}' +
        '.jr-range::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;margin-top:-8px;background:var(--accent);border:1px solid var(--ink-900);border-radius:0}' +
        '.jr-range::-moz-range-thumb{width:18px;height:18px;background:var(--accent);border:1px solid var(--ink-900);border-radius:0}' +
        '.jr-range:focus-visible{outline:var(--focus-ring);outline-offset:4px}'
      }</style>
    </div>
  );
}
