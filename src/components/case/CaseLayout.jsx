import React from 'react';
import { Navbar } from '../navigation/Navbar.jsx';
import { Footer } from '../navigation/Footer.jsx';
import { Button } from '../core/Button.jsx';
import { CaseHero } from '../modules/CaseHero.jsx';
import { useLang } from '../../lib/useLang.js';
import { NAV_TARGET, NAV_ITEMS } from '../../lib/nav.js';

/**
 * Shared case-study shell: Navbar + back link + CaseHero + closing CTA + Footer.
 * `content` = { shared, ESP, ENG } (see src/content/work/); the case body is a
 * render function `children(t, lang)` so each case composes its own modules.
 */
export function CaseLayout({ content, children }) {
  const [lang, setLang] = useLang();
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', on);
    return () => window.removeEventListener('scroll', on);
  }, []);
  const { shared } = content;
  const t = content[lang];
  const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)' };
  const go = (id) => { window.location.href = '/#' + id; };
  const navigate = (label) => { const id = NAV_TARGET[label]; id && go(id); };
  return (
    <div>
      <Navbar items={NAV_ITEMS} active="Work" lang={lang} onLangChange={setLang} onNavigate={navigate} scrolled={scrolled} logoSrc="/logos/logo-color.svg" city="Madrid, Spain" />
      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '40px var(--page-margin, 64px) 96px' }}>
        <a href="/#work" style={{ ...L, display: 'inline-block', marginBottom: 24 }}>{'←'} {t.back}</a>
        <CaseHero id={shared.id} status={shared.status} tag={t.tag} title={t.title} intro={t.intro}
          meta={shared.meta.map((m) => ({ label: m.label, value: m.value[lang] }))} style={{ marginBottom: 48 }} />
        {children(t, lang)}
        <section style={{ marginTop: 64, padding: '32px 0 0', borderTop: '1px solid var(--line-strong)' }}>
          <span style={{ ...L, color: 'var(--accent-ink)' }}>{t.next.label}</span>
          <h2 style={{ margin: '12px 0 0', font: 'var(--text-h2)' }}>{t.next.heading}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 28 }}>
            <Button variant="primary" arrow size="lg" onClick={() => go('work')}>{t.next.work}</Button>
            <Button variant="secondary" size="lg" onClick={() => go('contact')}>{t.next.contact}</Button>
          </div>
        </section>
      </main>
      <Footer items={NAV_ITEMS} logoSrc="/logos/logo-white.svg" email="hello@juanromeroportfolio.com" onNavigate={navigate} />
    </div>
  );
}
