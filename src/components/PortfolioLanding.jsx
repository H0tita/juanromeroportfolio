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
    title: 'Product Happens.',
    titleSub: 'Llevo las ideas a la realidad, de principio a fin.',
    intro: 'Product designer entre UX, tecnología y negocio. Detecto qué falla en la experiencia, lo diseño, lo construyo con IA y lo alineo con los objetivos del negocio.',
    cta: 'Ver proyectos', cta2: 'Contacto',
    workTitle: 'My Work',
    workIntro: 'Casos seleccionados. Cada proyecto documenta problema, proceso y resultado con métricas verificadas.',
    p1: { title: 'Intranet ING', excerpt: 'Rediseño y migración a SharePoint Online', metric: { value: '60% → 85%', label: 'satisfacción' } },
    p2: { title: 'Presupuestador Piscilona', excerpt: 'Ficha técnica + web app', metric: { value: '2–4 h → 3 min', label: 'por presupuesto' } },
    p3: { title: 'Intrabuddy · ING', excerpt: 'Agente de IA en la intranet de ING', metric: { value: '~60%', label: 'menos tiempo de búsqueda' } },
    p4: { title: 'Digisfera · ING', excerpt: 'Marca e insignias para digitalizar oficinas', metric: { value: '3 × 2', label: 'insignias en pegatina' } },
    aboutTitle: 'Juan Romero',
    aboutRole: 'Product Designer · UX/UI · AI · Business',
    aboutBio: [
      'Soy product designer y trabajo donde se cruzan experiencia, tecnología y negocio. Tengo olfato para detectar dónde se rompe la experiencia de alguien —en una app, una web, una herramienta interna o un objeto físico— y llevo la solución de la idea a algo que funciona.',
      'Uso la IA como parte de mi forma de trabajar: para idear, prototipar y construir más rápido. No como adorno.'
    ],
    capsLabel: 'CAPACIDADES',
    caps: [
      { area: 'UX', verb: 'DETECT', text: 'Detecto qué le cuesta al usuario y por qué, en cualquier entorno: apps, webs, herramientas internas o productos físicos.' },
      { area: 'UI', verb: 'CRAFT', text: 'Hago que se vea y se sienta bien combinando interfaz, diseño gráfico, vídeo y 3D.', next: 'Diseño de producto físico' },
      { area: 'Tech + IA', verb: 'BUILD', text: 'Doy vida a mis ideas programando y con IA: prototipos funcionales, agentes y herramientas reales.', next: 'Prototipado de hardware' },
      { area: 'Negocio', verb: 'ALIGN', text: 'Entiendo cómo funciona una organización, leo los datos y conecto cada decisión de producto con su objetivo estratégico.' }
    ],
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
    title: 'Product Happens.',
    titleSub: 'I take ideas into reality, end to end.',
    intro: 'Product designer between UX, tech and business. I spot what breaks in the experience, design it, build it with AI and align it with the business goals.',
    cta: 'View work', cta2: 'Contact',
    workTitle: 'My Work',
    workIntro: 'Selected cases. Each project documents problem, process and outcome with verified metrics.',
    p1: { title: 'ING Intranet', excerpt: 'Redesign and migration to SharePoint Online', metric: { value: '60% → 85%', label: 'satisfaction' } },
    p2: { title: 'Piscilona Budgeting Tool', excerpt: 'Data sheet + web app', metric: { value: '2–4 h → 3 min', label: 'per quote' } },
    p3: { title: 'Intrabuddy · ING', excerpt: 'AI agent in the ING intranet', metric: { value: '~60%', label: 'less search time' } },
    p4: { title: 'Digisfera · ING', excerpt: 'Brand and badges to digitalise branches', metric: { value: '3 × 2', label: 'sticker badges' } },
    aboutTitle: 'Juan Romero',
    aboutRole: 'Product Designer · UX/UI · AI · Business',
    aboutBio: [
      'I’m a product designer working where experience, technology and business meet. I have a nose for where someone’s experience breaks —in an app, a website, an internal tool or a physical object— and I take the fix from idea to something that works.',
      'AI is part of how I work: to ideate, prototype and build faster. Not as decoration.'
    ],
    capsLabel: 'CAPABILITIES',
    caps: [
      { area: 'UX', verb: 'DETECT', text: 'I spot what users struggle with and why, in any setting: apps, websites, internal tools or physical products.' },
      { area: 'UI', verb: 'CRAFT', text: 'I make it look and feel right by combining interface, graphic design, video and 3D.', next: 'Physical product design' },
      { area: 'Tech + AI', verb: 'BUILD', text: 'I bring my ideas to life with code and AI: working prototypes, agents and real tools.', next: 'Hardware prototyping' },
      { area: 'Business', verb: 'ALIGN', text: 'I understand how an organisation works, read the data and tie every product decision to its strategic goal.' }
    ],
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
          <h1 style={{ margin: 0, font: 'var(--text-h1)' }}>{t.title}<span style={{ display: 'block', marginTop: 16, font: 'var(--text-h3)', fontSize: 'clamp(22px, 2.6vw, 30px)', color: 'var(--ink-600)' }}>{t.titleSub}</span></h1>
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
