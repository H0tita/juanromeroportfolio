/**
 * Brand Book copy (/brand-book), bilingual. Phase 1 modules: intro, golden rule, colour,
 * typography, components, process. HUD labels stay in English in both languages.
 * - Process: Juan leads direction, criteria and decisions; AI speeds up execution. Release log
 *   = the real git tags (v1–v5).
 */
const ESP = {
  pageTitle: 'Brand Book — Juan Romero',
  description: 'El design system de mi portfolio explicado y para probar: regla de las dos capas, color, tipografía, componentes y cómo lo construí.',
  title: 'Brand Book',
  intro: 'Este portfolio está construido sobre un design system propio. Aquí explico cada decisión y la puedes probar: no es solo cómo se ve, sino por qué funciona así.',
  index: 'ÍNDICE',
  rule: {
    heading: 'La regla de oro: dos capas',
    body: [
      { lead: 'Capa HUD.', text: 'Retícula, esquinas, coordenadas, estados y etiquetas en Space Mono. Da carácter y aparece en los momentos de impacto.' },
      { lead: 'Capa editorial.', text: 'Archivo, interlineado amplio y aire. Es la que se lee: textos de case study, bio, explicaciones.' },
      'Ninguna de las dos puede ocupar el 100 % de una pantalla. Mueve el control y mira qué pasa en los extremos.',
    ],
    slider: 'Proporción HUD / editorial',
    specimen: { title: 'Intranet ING', text: 'Rediseño de la arquitectura de información y migración a SharePoint Online, con la satisfacción de 60 % a 85 %.' },
    states: {
      low: 'Solo editorial: se lee, pero no tiene carácter. Podría ser cualquier web.',
      ok: 'Equilibrio: el HUD da identidad y el texto sigue siendo cómodo de leer.',
      high: 'Solo HUD: espectacular pero ilegible. El contenido desaparece.',
    },
  },
  color: {
    heading: 'Color: tinta sobre papel',
    body: ['Papel menta claro, tinta verde casi negra y un único acento menta. Los bloques oscuros solo aparecen como momentos inversos (barra superior, pie, capacidades). Haz clic en un color para copiar su código.'],
    groups: { surface: 'Superficies', ink: 'Tinta', line: 'Líneas', accent: 'Acento', status: 'Estados' },
    copied: 'COPIADO',
    checker: {
      heading: 'Comprobador de contraste',
      body: 'El menta #48B59A no llega al contraste AA como texto sobre papel; por eso existe --accent-ink. Elige texto y fondo y compruébalo.',
      fg: 'Texto', bg: 'Fondo', sample: 'Diseño, construyo y lo alineo con el negocio.',
      normal: 'Texto normal', large: 'Texto grande',
    },
  },
  type: {
    heading: 'Tipografía: una fuente por capa',
    body: ['Archivo lleva la capa editorial: titulares y lectura, nunca por debajo de 17 px en párrafos. Space Mono lleva la capa HUD: etiquetas, datos y botones, siempre en mayúsculas con tracking.'],
    families: [
      { name: 'Archivo', role: 'EDITORIAL', use: 'Titulares y texto de lectura', token: '--font-sans' },
      { name: 'Space Mono', role: 'HUD', use: 'Etiquetas, datos, botones, coordenadas', token: '--font-mono' },
    ],
    tester: 'Escribe tu texto',
    sample: 'Product Happens.',
    filters: { all: 'Todo', editorial: 'Editorial', hud: 'HUD' },
  },
  components: {
    heading: 'Componentes: piezas con estados',
    body: ['Los componentes son React y se reutilizan en toda la web. Cambia sus propiedades y mira el resultado y el código a la vez.'],
    pick: { button: 'Botón', status: 'Indicador de estado', card: 'Tarjeta' },
    props: { variant: 'Variante', layer: 'Capa', size: 'Tamaño', arrow: 'Flecha', disabled: 'Desactivado', status: 'Estado' },
    buttonText: 'Ver proyectos',
    cardHint: 'Pasa el ratón por encima: fondo menta y esquinas verdes, sin cambiar el borde.',
    card: { title: 'Tarjeta del sistema', text: 'Superficie --bg-1, borde de 1 px y esquinas cuadradas. La profundidad viene de las líneas, no de sombras.' },
  },
  process: {
    heading: 'Cómo lo construí',
    body: ['La IA ejecuta rápido; la dirección, el criterio y cada decisión de este sistema son míos. Así fue el proceso, de la idea al código.'],
    phases: [
      { title: 'Idear', duration: 'LEAD: JR', description: 'Definí el objetivo: que el propio portfolio sea la prueba de seniority. Elegí la estética de telemetría y la llevé a modo claro: un plano técnico impreso, no una pantalla oscura de ciencia ficción.' },
      { title: 'Diseño base', duration: 'LEAD: JR', description: 'Diseñé el monograma JR con su destello, validé el menta y su versión accesible para texto, y emparejé Archivo con Space Mono para separar las dos capas.' },
      { title: 'Wireframes', duration: 'LEAD: JR · FIGMA', description: 'Planteé en baja fidelidad la arquitectura de cada pantalla: landing, case studies y este Brand Book. Primero estructura y jerarquía; el estilo, después.' },
      { title: 'Sistema', duration: 'JR + AI · CLAUDE DESIGN', description: 'Convertí esa base en un sistema de tokens y componentes. Yo dirigía y corregía cada iteración hasta que encajaba con la regla de las dos capas.' },
      { title: 'Código', duration: 'JR + AI · CLAUDE CODE', description: 'Porté el sistema a Astro y React componente a componente, revisando cada uno en el navegador. Donde se quedaba corto, lo amplié: tarjetas, módulos de case study, interactivos.' },
      { title: 'Iterar', duration: 'LEAD: JR', description: 'Cada versión nace de revisar la anterior con ojo de usuario: qué se entiende, qué invita a interactuar y qué sobra.' },
    ],
    releases: {
      heading: 'Registro de versiones',
      items: [
        { v: 'V1', date: 'JUL 2026', text: 'Landing bilingüe con los primeros componentes del sistema.' },
        { v: 'V2', date: 'JUL 2026', text: 'Secciones Sobre mí y Contacto.' },
        { v: 'V3', date: 'OCT 2026', text: 'Tres case studies con módulos interactivos.' },
        { v: 'V4', date: 'NOV 2026', text: 'Publicación con dominio propio, caso Digisfera y pulsos en el hero.' },
        { v: 'V5', date: 'NOV 2026', text: 'Nuevo hero, capacidades en Sobre mí y carrusel de casos.' },
      ],
    },
  },
};

const ENG: typeof ESP = {
  pageTitle: 'Brand Book — Juan Romero',
  description: 'The design system behind my portfolio, explained and hands-on: the two-layer rule, colour, typography, components and how I built it.',
  title: 'Brand Book',
  intro: 'This portfolio runs on a design system of my own. Here I explain each decision and you can try it: not just how it looks, but why it works this way.',
  index: 'INDEX',
  rule: {
    heading: 'The golden rule: two layers',
    body: [
      { lead: 'HUD layer.', text: 'Grid, corner brackets, coordinates, status and Space Mono labels. It brings character and shows up at moments of impact.' },
      { lead: 'Editorial layer.', text: 'Archivo, generous line height and whitespace. It is what you read: case study text, bio, explanations.' },
      'Neither may take 100% of a screen. Move the control and see what happens at the extremes.',
    ],
    slider: 'HUD / editorial ratio',
    specimen: { title: 'ING Intranet', text: 'Information architecture redesign and migration to SharePoint Online, satisfaction from 60% to 85%.' },
    states: {
      low: 'Editorial only: readable, but no character. It could be any website.',
      ok: 'Balance: the HUD gives identity and the text stays comfortable to read.',
      high: 'HUD only: spectacular but unreadable. The content disappears.',
    },
  },
  color: {
    heading: 'Colour: ink on paper',
    body: ['Light mint paper, near-black green ink and a single mint accent. Dark blocks only appear as inverse moments (top bar, footer, capabilities). Click a colour to copy its code.'],
    groups: { surface: 'Surfaces', ink: 'Ink', line: 'Lines', accent: 'Accent', status: 'Status' },
    copied: 'COPIED',
    checker: {
      heading: 'Contrast checker',
      body: 'Mint #48B59A does not reach AA as text on paper; that is why --accent-ink exists. Pick text and background and check it.',
      fg: 'Text', bg: 'Background', sample: 'I design it, build it and align it with the business.',
      normal: 'Normal text', large: 'Large text',
    },
  },
  type: {
    heading: 'Typography: one typeface per layer',
    body: ['Archivo carries the editorial layer: headings and reading, never below 17px for paragraphs. Space Mono carries the HUD layer: labels, data and buttons, always uppercase with tracking.'],
    families: [
      { name: 'Archivo', role: 'EDITORIAL', use: 'Headings and reading text', token: '--font-sans' },
      { name: 'Space Mono', role: 'HUD', use: 'Labels, data, buttons, coordinates', token: '--font-mono' },
    ],
    tester: 'Type your text',
    sample: 'Product Happens.',
    filters: { all: 'All', editorial: 'Editorial', hud: 'HUD' },
  },
  components: {
    heading: 'Components: parts with states',
    body: ['Components are React and reused across the site. Change their properties and see the result and the code side by side.'],
    pick: { button: 'Button', status: 'Status indicator', card: 'Card' },
    props: { variant: 'Variant', layer: 'Layer', size: 'Size', arrow: 'Arrow', disabled: 'Disabled', status: 'Status' },
    buttonText: 'View work',
    cardHint: 'Hover it: mint background and green corner brackets, the border stays the same.',
    card: { title: 'System card', text: '--bg-1 surface, 1px border and square corners. Depth comes from lines, not shadows.' },
  },
  process: {
    heading: 'How I built it',
    body: ['AI executes fast; the direction, the criteria and every decision in this system are mine. This was the process, from idea to code.'],
    phases: [
      { title: 'Ideate', duration: 'LEAD: JR', description: 'I set the goal: the portfolio itself should be the proof of seniority. I chose the telemetry aesthetic and took it to light mode: a printed technical drawing, not a dark sci-fi screen.' },
      { title: 'Base design', duration: 'LEAD: JR', description: 'I designed the JR monogram with its sparkle, validated the mint and its accessible text version, and paired Archivo with Space Mono to separate the two layers.' },
      { title: 'Wireframes', duration: 'LEAD: JR · FIGMA', description: 'I laid out the architecture of each screen in low fidelity: landing, case studies and this Brand Book. Structure and hierarchy first; style later.' },
      { title: 'System', duration: 'JR + AI · CLAUDE DESIGN', description: 'I turned that base into a system of tokens and components. I directed and corrected every iteration until it fitted the two-layer rule.' },
      { title: 'Code', duration: 'JR + AI · CLAUDE CODE', description: 'I ported the system to Astro and React one component at a time, reviewing each in the browser. Where it fell short, I extended it: cards, case study modules, interactives.' },
      { title: 'Iterate', duration: 'LEAD: JR', description: 'Each version comes from reviewing the previous one as a user: what reads, what invites interaction and what is left over.' },
    ],
    releases: {
      heading: 'Release log',
      items: [
        { v: 'V1', date: 'JUL 2026', text: 'Bilingual landing with the first system components.' },
        { v: 'V2', date: 'JUL 2026', text: 'About and Contact sections.' },
        { v: 'V3', date: 'OCT 2026', text: 'Three case studies with interactive modules.' },
        { v: 'V4', date: 'NOV 2026', text: 'Live on its own domain, Digisfera case and hero pulses.' },
        { v: 'V5', date: 'NOV 2026', text: 'New hero, About capabilities and case carousel.' },
      ],
    },
  },
};

export const BRAND_BOOK = { ESP, ENG };
