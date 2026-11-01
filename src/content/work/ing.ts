/**
 * Case study — ING intranet redesign & migration. Bilingual copy (ESP | ENG).
 * Source: interview notes in ./ing.brief.md (not published).
 *
 * Rules kept from the interview:
 * - HUD micro-labels stay in technical English in both languages.
 * - The intern → PO path is described as taking on responsibilities, never a formal promotion.
 * - No invented insight, quote or figure. Screens are schematics (confidentiality).
 * - Body paragraphs: string, or { lead, text } for a bold lead-in.
 */

type Paragraph = string | { lead: string; text: string };

const shared = {
  id: 'JR.CASE.001',
  status: 'SHIPPED',
  slug: 'ing',
  meta: [
    { label: 'ROLE', value: { ESP: 'Product Designer · PO Canales', ENG: 'Product Designer · PO Channels' } },
    { label: 'PERIOD', value: { ESP: 'JUL 2025 — FEB 2026', ENG: 'JUL 2025 — FEB 2026' } },
    { label: 'TEAM', value: { ESP: '6 personas', ENG: '6 people' } },
    { label: 'PLATFORM', value: { ESP: 'SharePoint 2016 → Online', ENG: 'SharePoint 2016 → Online' } },
    { label: 'TOOLS', value: { ESP: 'Figma · Jira · Confluence', ENG: 'Figma · Jira · Confluence' } },
  ],
};

const ESP = {
  pageTitle: 'Intranet ING — Case study · Juan Romero',
  back: 'JR.WORK / INDEX',
  tag: 'CASE STUDY / ING SPAIN & PORTUGAL',
  title: 'Rediseño y migración de la intranet de ING',
  intro:
    'Gestores y coordinadores de oficinas y canales perdían tiempo buscando información desordenada, duplicada o caducada. Rediseñamos la arquitectura de la intranet y la migramos de SharePoint 2016 a SharePoint Online para que cada perfil encuentre lo que necesita en menos pasos y pueda confiar en lo que lee.',

  problem: {
    heading: 'Nadie encontraba nada, y lo que encontraba podía estar caducado',
    body: [
      'La intranet era la herramienta de trabajo diaria de menos de 1.000 gestores y coordinadores de oficinas y otros canales. Con los años se había convertido en un cajón de sastre: arquitectura confusa, contenido enterrado en muchos niveles, páginas duplicadas o desactualizadas sin responsable y un diseño distinto en cada área.',
    ] as Paragraph[],
    columns: [
      { label: 'IMPACT', title: 'El resultado', tone: 'muted', items: ['Tiempo perdido buscando', 'Consultas constantes a otros equipos', 'Poca confianza en el contenido', 'Canales paralelos: correo, chats y documentos propios'] },
      { label: 'GOAL', title: 'El objetivo', tone: 'accent', items: ['Encontrar la información más rápido', 'Una única fuente de verdad', 'Una intranet visualmente coherente'] },
    ],
    highlight:
      'En un banco, un procedimiento desactualizado no es solo un problema de UX: es riesgo operativo y de cumplimiento normativo.',
  },

  role: {
    heading: 'Un año de prácticas, cada vez más responsabilidad',
    body: [
      'Entré en ING en prácticas, en un equipo de seis: manager, tres Product Owners, responsable de diseño y yo.',
      'Empecé como Product Designer de Financiación y Clientes. Desde finales de noviembre asumí además las funciones de Product Owner de Canales —ocho canales, entre ellos oficinas, Contact Center y chat—, uno de los bloques críticos de la migración.',
    ] as Paragraph[],
    highlight:
      'Mi trabajo con stakeholders: investigar con ellos sus necesidades, presentar cada propuesta de rediseño, defenderla y llevarla hasta SharePoint Online. También contribuí a los componentes y estilos del design system y colaboré en el copy.',
    gantt: {
      aria: 'Cronología de mi rol en ING, de julio de 2025 a febrero de 2026.',
      months: ['JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC', 'ENE', 'FEB'],
      years: { 0: '2025', 6: '2026' },
      rows: [
        { title: 'Product Designer', sub: 'Financiación', start: 0, end: 4.8, tone: 'ink', period: 'JUL — NOV 2025' },
        { title: 'Product Designer', sub: 'Clientes', start: 0, end: 4.8, tone: 'ink', period: 'JUL — NOV 2025' },
        { title: 'Product Owner + Product Designer', sub: 'Canales', start: 4.75, end: 8, tone: 'accent', period: 'NOV 2025 — FEB 2026' },
        { title: 'Product Designer', sub: 'Resto de verticales', start: 4.75, end: 8, tone: 'outline', period: 'NOV 2025 — FEB 2026' },
      ],
      milestone: 'Migración completada',
      groups: [
        { start: 0, end: 4.8, items: ['Research con stakeholders', 'Propuestas de rediseño', 'Componentes del design system'] },
        { start: 4.75, end: 8, items: ['8 canales: oficinas, Contact Center, chat…', 'Funciones de Product Owner', 'Apoyo de diseño al resto de verticales'] },
      ],
    },
  },

  phases: [
    { title: 'Auditoría de contenido', description: 'Inventario de las páginas de mis verticales en SharePoint 2016. Decidimos qué migrar, fusionar o eliminar, y los patrones repetidos se convirtieron en plantillas.' },
    { title: 'Research', description: 'Entrevistas y encuestas a gestores y coordinadores, y talleres con los responsables de cada área para entender sus necesidades y su contenido.' },
    { title: 'Arquitectura de información', description: 'Navegación por vertical, menos niveles de profundidad, taxonomía y etiquetado para el buscador, y accesos directos por perfil.' },
    { title: 'Diseño y validación', description: 'Wireframes y UI en Figma, componentes y plantillas para SharePoint Online, defensa ante stakeholders y montaje y validación final.' },
  ],

  ia: {
    heading: 'Menos niveles, nombres claros, atajos por perfil',
    facts: [
      { label: 'NAVIGATION', title: 'Navegación por vertical', text: 'Financiación, Clientes y Canales con estructura propia, construida sobre el contenido que sobrevivió a la auditoría.' },
      { label: 'DEPTH', title: 'Menos profundidad', text: 'Aplanar la jerarquía para llegar al contenido en menos clics.' },
      { label: 'TAXONOMY', title: 'Taxonomía y etiquetado', text: 'Nombres que entiende quien busca y metadatos para que el buscador de SharePoint Online funcione.' },
      { label: 'SHORTCUTS', title: 'Accesos por perfil', text: 'Lo que más usa un gestor, un coordinador o el Contact Center, a un clic.' },
    ],
  },

  path: {
    beforeNote: 'Ruta ilustrativa hasta un procedimiento de cajeros, escondido bajo capas de carpetas.',
    afterNote: 'La misma ruta con la nueva arquitectura: la operativa vive a primer nivel dentro de su canal.',
    before: ['Inicio', 'Canales', 'Oficinas', 'Procesos', 'Operativa', 'Cajeros', 'Procedimiento'],
    after: ['Inicio', 'Canales', 'Oficinas', 'Cajeros y efectivo', 'Procedimiento'],
    clicks: 'CLICKS',
    ariaBefore: 'Ruta antes: 6 clics hasta el procedimiento.',
    ariaAfter: 'Ruta después: 4 clics hasta el procedimiento.',
  },

  home: {
    beforeNote: 'Desplegables con botones dentro que llevaban a cada proceso. Sin jerarquía, sin responsable y con accesos rápidos desactualizados.',
    afterNote: 'Primero acotamos el contenido a lo puramente de oficinas: kioscos, cajeros, atención al cliente… Después, bloques por tarea a primer nivel, accesos personales y documentos vivos.',
    before: {
      aria: 'Esquema de la home antes: una lista de desplegables y accesos rápidos desactualizados.',
      header: 'INTRANET / OFICINAS',
      dropdowns: ['Procesos', 'Operativa', 'Documentos', 'Formularios', 'Varios', 'Otros'],
      quick: 'ACCESOS RÁPIDOS',
      link: 'Enlace',
      stale: 'DESACTUALIZADO',
    },
    after: {
      aria: 'Esquema de la home después: banner de novedades, campañas, herramientas, Viva Engage, operativa por secciones, guardados, recientes, formación e información del empleado.',
      header: 'INTRANET / OFICINAS',
      banner: 'Novedad · solo si la hay',
      campaigns: 'Campañas y concursos',
      tools: 'Herramientas del gestor',
      engage: 'Viva Engage',
      ops: 'Operativa · formularios · plantillas',
      opsChips: ['Cajeros y efectivo', 'Tarjetas', '…'],
      saved: 'Guardados',
      recent: 'Recientes',
      live: 'LIVE',
      training: 'Formación por perfil',
      employee: 'Info del empleado',
    },
  },

  decisions: {
    heading: 'Cuatro decisiones de la nueva home',
    facts: [
      { label: 'LIVE DOCS', title: 'Documentos vivos', text: 'Plantillas de Word y Excel enlazadas que se actualizan en origen. Nadie se descarga una copia que a los pocos días está caducada: una única fuente de verdad, también para los documentos.' },
      { label: 'NOTIFICATIONS', title: 'Novedades sin ruido', text: 'El banner de novedad solo aparece cuando hay algo nuevo de verdad, para no quemar a la gente con avisos permanentes.' },
      { label: 'OPERATIONS', title: 'Operativa a primer nivel', text: 'Formularios, plantillas y procesos agrupados por sección (cajeros y efectivo, tarjetas…), no por departamento.' },
      { label: 'PERSONALISATION', title: 'Una home que recuerda', text: 'Páginas guardadas, últimos documentos visitados e itinerarios de formación según el tipo de empleado.' },
    ],
  },

  schematicNote: 'Esquemas redibujados y simplificados por confidencialidad. No reproducen pantallas ni datos internos de ING.',

  headings: { process: 'Cómo lo hicimos, en cuatro fases', compare: 'Antes y después', path: 'El camino hasta un procedimiento', home: 'La home de Oficinas', metrics: 'Lo que cambió con la nueva intranet' },

  metricsTitle: 'Results',
  metrics: [
    { value: '85%', from: 60, label: 'SATISFACCIÓN', caption: 'desde 60% · feb 2026', direction: 'up' },
    { value: '35%', label: 'CLICS HASTA EL CONTENIDO', caption: 'menos clics hasta el contenido', direction: 'down' },
    { value: '~50%', label: 'CONTENIDO DEPURADO', caption: 'eliminado o fusionado antes de migrar', direction: 'down' },
    { value: '100%', label: 'MIGRACIÓN', caption: 'completada en feb 2026' },
  ],
  metricsNote: 'Satisfacción medida por fases a lo largo de la migración. El resto de cifras son aproximadas.',
  aftermath: 'Tras la migración, el nuevo formato y sus plantillas se adoptaron como estándar para crear las secciones nuevas, y el feedback de usuarios y áreas fue positivo.',

  next: { label: 'NEXT / JR.WORK', heading: '¿Hablamos?', work: 'Ver más proyectos', contact: 'Contacto' },
};

const ENG: typeof ESP = {
  pageTitle: 'ING Intranet — Case study · Juan Romero',
  back: 'JR.WORK / INDEX',
  tag: 'CASE STUDY / ING SPAIN & PORTUGAL',
  title: 'Redesigning and migrating the ING intranet',
  intro:
    'Branch and channel managers were losing time hunting for information that was messy, duplicated or out of date. We redesigned the intranet’s architecture and migrated it from SharePoint 2016 to SharePoint Online so every profile finds what they need in fewer steps — and can trust what they read.',

  problem: {
    heading: 'Nobody could find anything — and what they found might be outdated',
    body: [
      'The intranet was the everyday work tool of fewer than 1,000 branch and channel managers and coordinators. Over the years it had become a catch-all: confusing structure, content buried many levels deep, duplicated or outdated pages with no owner, and a different design in every area.',
    ],
    columns: [
      { label: 'IMPACT', title: 'The result', tone: 'muted', items: ['Time wasted searching', 'Constant questions to other teams', 'Little trust in the content', 'Parallel channels: email, chats and personal documents'] },
      { label: 'GOAL', title: 'The goal', tone: 'accent', items: ['Find information faster', 'A single source of truth', 'A visually consistent intranet'] },
    ],
    highlight:
      'In a bank, an outdated procedure is not just a UX problem: it is operational and compliance risk.',
  },

  role: {
    heading: 'One year as an intern, with growing responsibility',
    body: [
      'I joined ING as an intern, in a team of six: manager, three Product Owners, design lead and me.',
      'I started as Product Designer for Financing and Customers. From late November I also took on the Product Owner responsibilities for Channels — eight of them, including branches, Contact Center and chat — one of the critical blocks of the migration.',
    ],
    highlight:
      'My work with stakeholders: research their needs with them, present each redesign proposal, defend it and carry it all the way into SharePoint Online. I also contributed components and styles to the design system and collaborated on the copy.',
    gantt: {
      aria: 'Timeline of my role at ING, from July 2025 to February 2026.',
      months: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB'],
      years: { 0: '2025', 6: '2026' },
      rows: [
        { title: 'Product Designer', sub: 'Financing', start: 0, end: 4.8, tone: 'ink', period: 'JUL — NOV 2025' },
        { title: 'Product Designer', sub: 'Customers', start: 0, end: 4.8, tone: 'ink', period: 'JUL — NOV 2025' },
        { title: 'Product Owner + Product Designer', sub: 'Channels', start: 4.75, end: 8, tone: 'accent', period: 'NOV 2025 — FEB 2026' },
        { title: 'Product Designer', sub: 'Other verticals', start: 4.75, end: 8, tone: 'outline', period: 'NOV 2025 — FEB 2026' },
      ],
      milestone: 'Migration completed',
      groups: [
        { start: 0, end: 4.8, items: ['Research with stakeholders', 'Redesign proposals', 'Design system components'] },
        { start: 4.75, end: 8, items: ['8 channels: branches, Contact Center, chat…', 'Product Owner responsibilities', 'Design support to other verticals'] },
      ],
    },
  },

  phases: [
    { title: 'Content audit', description: 'Inventory of my verticals’ pages in SharePoint 2016. We decided what to migrate, merge or delete, and repeated patterns became templates.' },
    { title: 'Research', description: 'Interviews and surveys with managers and coordinators, plus workshops with each area’s owners to understand their needs and their content.' },
    { title: 'Information architecture', description: 'Navigation by vertical, fewer levels of depth, taxonomy and tagging for search, and shortcuts by profile.' },
    { title: 'Design & validation', description: 'Wireframes and UI in Figma, components and templates for SharePoint Online, stakeholder reviews, and final build and validation.' },
  ],

  ia: {
    heading: 'Fewer levels, clear names, shortcuts by profile',
    facts: [
      { label: 'NAVIGATION', title: 'Navigation by vertical', text: 'Financing, Customers and Channels each with their own structure, built on the content that survived the audit.' },
      { label: 'DEPTH', title: 'Less depth', text: 'A flatter hierarchy to reach content in fewer clicks.' },
      { label: 'TAXONOMY', title: 'Taxonomy and tagging', text: 'Names that make sense to whoever is searching, and metadata so SharePoint Online search actually works.' },
      { label: 'SHORTCUTS', title: 'Shortcuts by profile', text: 'What a manager, a coordinator or the Contact Center uses most, one click away.' },
    ],
  },

  path: {
    beforeNote: 'Illustrative path to an ATM procedure, hidden under layers of folders.',
    afterNote: 'The same path with the new architecture: operations live at the first level of their channel.',
    before: ['Home', 'Channels', 'Branches', 'Processes', 'Operations', 'ATMs', 'Procedure'],
    after: ['Home', 'Channels', 'Branches', 'ATMs & cash', 'Procedure'],
    clicks: 'CLICKS',
    ariaBefore: 'Path before: 6 clicks to the procedure.',
    ariaAfter: 'Path after: 4 clicks to the procedure.',
  },

  home: {
    beforeNote: 'Dropdowns with buttons inside leading to each process. No hierarchy, no owner, and outdated shortcuts.',
    afterNote: 'First we scoped the content to what is purely branch-related: kiosks, ATMs, customer service… Then, task-first blocks at the top level, personal shortcuts and live documents.',
    before: {
      aria: 'Home schematic before: a list of dropdowns and outdated shortcuts.',
      header: 'INTRANET / BRANCHES',
      dropdowns: ['Processes', 'Operations', 'Documents', 'Forms', 'Misc', 'Other'],
      quick: 'SHORTCUTS',
      link: 'Link',
      stale: 'OUTDATED',
    },
    after: {
      aria: 'Home schematic after: news banner, campaigns, tools, Viva Engage, operations by section, saved, recent, training and employee info.',
      header: 'INTRANET / BRANCHES',
      banner: 'News · only when there is some',
      campaigns: 'Campaigns & contests',
      tools: 'Manager tools',
      engage: 'Viva Engage',
      ops: 'Operations · forms · templates',
      opsChips: ['ATMs & cash', 'Cards', '…'],
      saved: 'Saved',
      recent: 'Recent',
      live: 'LIVE',
      training: 'Training by profile',
      employee: 'Employee info',
    },
  },

  decisions: {
    heading: 'Four decisions behind the new home',
    facts: [
      { label: 'LIVE DOCS', title: 'Live documents', text: 'Linked Word and Excel templates updated at the source. Nobody downloads a copy that is outdated a few days later: a single source of truth, for documents too.' },
      { label: 'NOTIFICATIONS', title: 'News without noise', text: 'The news banner only shows up when there is something genuinely new, so people don’t burn out on permanent alerts.' },
      { label: 'OPERATIONS', title: 'Operations first', text: 'Forms, templates and processes grouped by section (ATMs & cash, cards…), not by department.' },
      { label: 'PERSONALISATION', title: 'A home that remembers', text: 'Saved pages, recently visited documents and training paths by employee type.' },
    ],
  },

  schematicNote: 'Schematics redrawn and simplified for confidentiality. They do not reproduce ING screens or internal data.',

  headings: { process: 'How we did it, in four phases', compare: 'Before and after', path: 'The path to a procedure', home: 'The Branches home', metrics: 'What changed with the new intranet' },

  metricsTitle: 'Results',
  metrics: [
    { value: '85%', from: 60, label: 'USER SATISFACTION', caption: 'up from 60% · feb 2026', direction: 'up' },
    { value: '35%', label: 'CLICKS TO CONTENT', caption: 'fewer clicks to reach content', direction: 'down' },
    { value: '~50%', label: 'CONTENT PRUNED', caption: 'deleted or merged before migrating', direction: 'down' },
    { value: '100%', label: 'MIGRATION', caption: 'completed in feb 2026' },
  ],
  metricsNote: 'Satisfaction measured in phases throughout the migration. Other figures are approximate.',
  aftermath: 'After the migration, the new format and its templates became the standard for building new sections, and feedback from users and areas was positive.',

  next: { label: 'NEXT / JR.WORK', heading: 'Let’s talk', work: 'More projects', contact: 'Contact' },
};

export const ING_CASE = { shared, ESP, ENG };
