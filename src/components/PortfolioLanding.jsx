import React from 'react';
import { Navbar } from './navigation/Navbar.jsx';
import { Footer } from './navigation/Footer.jsx';
import { Button } from './core/Button.jsx';
import { ProjectCard } from './work/ProjectCard.jsx';
import { ReactiveDotField } from './hud/ReactiveDotField.jsx';
import { CoordLabel } from './hud/CoordLabel.jsx';
import { StatusIndicator } from './hud/StatusIndicator.jsx';
import { Crosshair } from './hud/Crosshair.jsx';
import { AboutSection } from './sections/AboutSection.jsx';
import { ContactSection } from './sections/ContactSection.jsx';
import { useLang } from '../lib/useLang.js';
import { NAV_TARGET, NAV_ITEMS } from '../lib/nav.js';

/**
 * Portfolio landing island — ported from the design-system reference
 * ui_kits/landing/index.html. Holds the shared lang (ESP|ENG) + scroll state
 * that coordinate the Navbar and section copy. Mounted with client:load.
 */
const COPY = {
  ESP: {
    heroLabel: 'JR.SYS.2026 — PORTFOLIO ONLINE',
    title: 'Diseño de experiencias End To End',
    intro: 'Product designer híbrido — UX, tecnología y negocio. Diseño, valido y construyo flujos complejos de extremo a extremo.',
    cta: 'Ver proyectos', cta2: 'Contacto',
    workTitle: 'My Work',
    workIntro: 'Casos seleccionados. Cada proyecto documenta problema, proceso y resultado con métricas verificadas.',
    p1: { title: 'Intranet ING', excerpt: 'Rediseño y migración a SharePoint Online', metric: { value: '60% → 85%', label: 'satisfacción' } },
    p2: { title: 'Presupuestador Piscilona', excerpt: 'Ficha técnica + web app', metric: { value: '2–4 h → 3 min', label: 'por presupuesto' } },
    p3: { title: 'Intrabuddy · ING', excerpt: 'Agente de IA en la intranet de ING', metric: { value: '~60%', label: 'menos tiempo de búsqueda' } },
    p4: { title: 'Digisfera · ING', excerpt: 'Marca e insignias para digitalizar oficinas', metric: { value: '3 × 2', label: 'insignias en pegatina' } },
    aboutTitle: 'Juan Romero',
    aboutRole: 'UX Product Designer | Product + Tech + Business | AI Enthusiastic',
    aboutBio: 'Me considero un perfil híbrido capaz de desarrollar proyectos End To End, haciendo de puente entre las ramas de Producto, Tech y Negocio.',
    expLabel: 'EXPERIENCIA',
    exp: [
      { company: 'Telefónica Tech (Novanotio)', role: 'UX Product Manager', current: true, bullets: ['Diseño UX/UI de dashboards y PPTs.', 'Planificación de proyectos en sectores IoT, IA, robótica, cyber e innovación.', 'Market research.'], period: 'JUL 2026 — PRESENT', location: 'MADRID, ES' },
      { company: 'ING Spain & Portugal', role: 'Product Designer & AI Implementator', bullets: ['Diseño UX/UI de la Intranet del banco.', 'Product Owner, comunicación y colaboración con stakeholders.', 'Implementación de agentes IA.'], period: 'JUL 2025 — JUL 2026', location: 'MADRID, ES' },
      { company: 'Freelance', role: 'UX/UI & Service Design', bullets: ['Piscilona S.L. (ene – mar 2025): diseño UX/UI de un presupuestador automático.', 'Diseño de proceso End-To-End.', 'Diseño de ficha técnica física.'], period: 'JUL 2024 — JUN 2025', location: 'MADRID, ES' }
    ],
    contactTitle: 'Contact',
    contactIntro: 'Si quieres ponerte en contacto conmigo puedes hacerlo a través de este formulario.',
    contactAlt: 'O directamente mandando un mail a',
    contactSent: 'Mensaje recibido. Te respondo en <48h.',
    contactSending: 'Enviando…',
    contactError: 'No se ha podido enviar el mensaje. Escríbeme directamente a',
    fEmail: 'Email', fSubject: 'Asunto', fMessage: 'Mensaje', fSubmit: 'Enviar'
  },
  ENG: {
    heroLabel: 'JR.SYS.2026 — PORTFOLIO ONLINE',
    title: 'End To End experience design',
    intro: 'Hybrid product designer — UX, tech and business. I design, validate and build complex end-to-end flows.',
    cta: 'View work', cta2: 'Contact',
    workTitle: 'My Work',
    workIntro: 'Selected cases. Each project documents problem, process and outcome with verified metrics.',
    p1: { title: 'ING Intranet', excerpt: 'Redesign and migration to SharePoint Online', metric: { value: '60% → 85%', label: 'satisfaction' } },
    p2: { title: 'Piscilona Budgeting Tool', excerpt: 'Data sheet + web app', metric: { value: '2–4 h → 3 min', label: 'per quote' } },
    p3: { title: 'Intrabuddy · ING', excerpt: 'AI agent in the ING intranet', metric: { value: '~60%', label: 'less search time' } },
    p4: { title: 'Digisfera · ING', excerpt: 'Brand and badges to digitalise branches', metric: { value: '3 × 2', label: 'sticker badges' } },
    aboutTitle: 'Juan Romero',
    aboutRole: 'UX Product Designer | Product + Tech + Business | AI Enthusiastic',
    aboutBio: 'I am a hybrid profile able to run End To End projects, bridging Product, Tech and Business.',
    expLabel: 'EXPERIENCE',
    exp: [
      { company: 'Telefónica Tech (Novanotio)', role: 'UX Product Manager', current: true, bullets: ['UX/UI design of dashboards and PPTs.', 'Project planning across IoT, AI, robotics, cyber and innovation.', 'Market research.'], period: 'JUL 2026 — PRESENT', location: 'MADRID, ES' },
      { company: 'ING Spain & Portugal', role: 'Product Designer & AI Implementator', bullets: ['UX/UI design of the bank intranet.', 'Product Owner, stakeholder communication and collaboration.', 'AI agent implementation.'], period: 'JUL 2025 — JUL 2026', location: 'MADRID, ES' },
      { company: 'Freelance', role: 'UX/UI & Service Design', bullets: ['Piscilona S.L. (Jan – Mar 2025): UX/UI design of an automatic quoting tool.', 'End-To-End process design.', 'Physical spec sheet design.'], period: 'JUL 2024 — JUN 2025', location: 'MADRID, ES' }
    ],
    contactTitle: 'Contact',
    contactIntro: 'If you want to get in touch you can do it through this form.',
    contactAlt: 'Or directly by email at',
    contactSent: 'Message received. I reply within 48h.',
    contactSending: 'Sending…',
    contactError: 'The message couldn’t be sent. Write to me directly at',
    fEmail: 'Email', fSubject: 'Subject', fMessage: 'Message', fSubmit: 'Submit'
  }
};

export default function PortfolioLanding() {
  const [lang, setLang] = useLang();
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState(null);
  React.useEffect(() => {
    // Scroll spy: the active nav item is the last section whose top has passed under the
    // sticky navbar; none while on the hero. At the very bottom the last section wins,
    // since a short final section may never reach the top.
    const sections = Object.entries(NAV_TARGET).filter(([, id]) => id);
    const on = () => {
      setScrolled(window.scrollY > 80);
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = null;
      for (const [label, id] of sections) {
        const el = document.getElementById(id);
        if (el && (el.getBoundingClientRect().top <= 120 || atBottom)) current = label;
      }
      setActive(current);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const t = COPY[lang];
  const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)' };
  const scrollTo = (id) => { const el = document.getElementById(id); el && window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' }); };
  const navigate = (label) => { const id = NAV_TARGET[label]; id && scrollTo(id); };
  return (
    <div>
      <Navbar items={NAV_ITEMS} active={active} lang={lang} onLangChange={setLang} onNavigate={navigate} scrolled={scrolled} logoSrc="/logos/logo-color.svg" city="Madrid, Spain" />
      <section data-screen-label="Hero" style={{ position: 'relative', padding: '96px var(--page-margin, 64px) 120px', overflow: 'hidden' }}>
        <ReactiveDotField fade="left" gap={22} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '62%' }} />
        <div style={{ position: 'absolute', top: 28, right: 'var(--page-margin, 64px)', display: 'flex', gap: 24, alignItems: 'center' }}>
          <Crosshair variant="plus" size={16} />
          <CoordLabel label="LAT" value="40.4168" /><CoordLabel label="LON" value="-3.7038" />
        </div>
        <div style={{ position: 'relative', maxWidth: 760 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <StatusIndicator status="active" label={t.heroLabel} />
          </div>
          <h1 style={{ margin: 0, font: 'var(--text-h1)' }}>{t.title}</h1>
          <p style={{ margin: '28px 0 0', font: 'var(--text-body-lg)', color: 'var(--ink-600)', maxWidth: '54ch' }}>{t.intro}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 40 }}>
            <Button variant="primary" arrow size="lg" onClick={() => scrollTo('work')}>{t.cta}</Button>
            <Button variant="secondary" size="lg" onClick={() => scrollTo('contact')}>{t.cta2}</Button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 28px', marginTop: 56, paddingTop: 20, borderTop: '1px solid var(--line)' }}>
            <CoordLabel label="UX" value=">2 YRS" /><CoordLabel label="tech" value="cODING / AI" /><CoordLabel label="BIZ" value="MANAGEMENT" />
          </div>
        </div>
      </section>
      <section id="work" data-screen-label="My Work" style={{ padding: '72px var(--page-margin, 64px) 96px', borderTop: '1px solid var(--line-strong)', background: 'var(--bg-1)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <span style={{ ...L, color: 'var(--accent-ink)' }}>JR.WORK — INDEX</span>
          <span style={L}>04 REC / ALL SYSTEMS NOMINAL</span>
        </div>
        <h2 style={{ margin: 0, font: 'var(--text-h2)' }}>{t.workTitle}</h2>
        <p style={{ margin: '16px 0 0', font: 'var(--text-body)', color: 'var(--ink-600)', maxWidth: '60ch' }}>{t.workIntro}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, max(320px, calc(50% - 12px))), 1fr))', gap: 24, marginTop: 40 }}>
          <ProjectCard index="01" title={t.p3.title} excerpt={t.p3.excerpt} metric={t.p3.metric} categories={['AI', 'Prompting', 'Data']} meta="JR.WORK.001" image="/covers/intrabuddy.jpg" href="/work/intrabuddy" lang={lang} />
          <ProjectCard index="02" title={t.p1.title} excerpt={t.p1.excerpt} metric={t.p1.metric} categories={['UX', 'Info Architecture', 'Banking']} meta="JR.WORK.002" image="/covers/ing.jpg" href="/work/ing" lang={lang} />
          <ProjectCard index="03" title={t.p2.title} excerpt={t.p2.excerpt} metric={t.p2.metric} categories={['UX/UI', 'Service Design', 'SaaS']} meta="JR.WORK.003" image="/covers/piscilona.jpg" href="/work/automatic-budgeting-piscilona-sl" lang={lang} />
          <ProjectCard index="04" title={t.p4.title} excerpt={t.p4.excerpt} metric={t.p4.metric} categories={['Branding', 'Illustration', 'Print']} meta="JR.WORK.004" image="/covers/digisfera.jpg" href="/work/digisfera" lang={lang} />
        </div>
      </section>
      <AboutSection t={t} L={L} />
      <ContactSection t={t} L={L} />
      <Footer items={NAV_ITEMS} logoSrc="/logos/logo-white.svg" email="hello@juanromeroportfolio.com" onNavigate={navigate} />
    </div>
  );
}
