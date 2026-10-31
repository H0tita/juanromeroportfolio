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
      'El resultado: tiempo perdido buscando, consultas constantes a otros equipos y tan poca confianza que la gente acababa tirando de correo, chats y documentos propios.',
      'El objetivo: encontrar la información más rápido, una única fuente de verdad y una intranet visualmente coherente.',
    ] as Paragraph[],
    highlight:
      'En un banco, un procedimiento desactualizado no es solo un problema de UX: es riesgo operativo y de cumplimiento normativo.',
  },

  role: {
    heading: 'Un año de prácticas, cada vez más responsabilidad',
    body: [
      'Entré en ING en prácticas, en un equipo de seis: manager, tres Product Owners, responsable de diseño y yo.',
      { lead: 'Julio — noviembre 2025.', text: 'Product Designer de las verticales de Financiación y Clientes.' },
      { lead: 'Noviembre 2025 — febrero 2026.', text: 'Asumí además las funciones de Product Owner de Canales —oficinas, Contact Center, chat, Defensor del Cliente y redes sociales—, uno de los bloques críticos de la migración, sin dejar de apoyar como Product Designer al resto de verticales.' },
    ] as Paragraph[],
    highlight:
      'Mi trabajo con stakeholders: presentar cada propuesta de rediseño, defenderla y llevarla hasta SharePoint Online. También contribuí a los componentes y estilos del design system y colaboré en el copy.',
  },

  phases: [
    { title: 'Auditoría de contenido', description: 'Inventario de las páginas de mis verticales en SharePoint 2016. Decidimos qué migrar, fusionar o eliminar, y los patrones repetidos se convirtieron en plantillas.' },
    { title: 'Research', description: 'Entrevistas y encuestas a gestores y coordinadores, y talleres con los responsables de cada área para entender sus necesidades y su contenido.' },
    { title: 'Arquitectura de información', description: 'Navegación por vertical, menos niveles de profundidad, taxonomía y etiquetado para el buscador, y accesos directos por perfil.' },
    { title: 'Diseño y validación', description: 'Wireframes y UI en Figma, componentes y plantillas para SharePoint Online, defensa ante stakeholders y montaje y validación final.' },
  ],

  ia: {
    heading: 'Menos niveles, nombres claros, atajos por perfil',
    body: [
      { lead: 'Navegación por vertical.', text: 'Financiación, Clientes y Canales con estructura propia, construida sobre el contenido que sobrevivió a la auditoría.' },
      { lead: 'Menos profundidad.', text: 'Aplanar la jerarquía para llegar al contenido en menos clics.' },
      { lead: 'Taxonomía y etiquetado.', text: 'Nombres que entiende quien busca y metadatos para que el buscador de SharePoint Online funcione.' },
      { lead: 'Accesos por perfil.', text: 'Lo que más usa un gestor, un coordinador o el Contact Center, a un clic.' },
    ] as Paragraph[],
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
    body: [
      { lead: 'Documentos vivos.', text: 'Plantillas de Word y Excel enlazadas que se actualizan en origen. Nadie se descarga una copia que a los pocos días está caducada: una única fuente de verdad, también para los documentos.' },
      { lead: 'Novedades sin ruido.', text: 'El banner de novedad solo aparece cuando hay algo nuevo de verdad, para no quemar a la gente con avisos permanentes.' },
      { lead: 'Operativa a primer nivel.', text: 'Formularios, plantillas y procesos agrupados por sección (cajeros y efectivo, tarjetas…), no por departamento.' },
      { lead: 'Una home que recuerda.', text: 'Páginas guardadas, últimos documentos visitados e itinerarios de formación según el tipo de empleado.' },
    ] as Paragraph[],
  },

  schematicNote: 'Esquemas redibujados y simplificados por confidencialidad. No reproducen pantallas ni datos internos de ING.',

  metricsTitle: 'Results',
  metrics: [
    { value: '85%', label: 'USER SATISFACTION', caption: 'desde 60% · feb 2026', direction: 'up' },
    { value: '35%', label: 'CLICKS TO CONTENT', caption: 'menos clics hasta el contenido', direction: 'down' },
    { value: '~50%', label: 'CONTENT PRUNED', caption: 'eliminado o fusionado antes de migrar', direction: 'down' },
    { value: '100%', label: 'MIGRATION', caption: 'completada en feb 2026' },
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
      'The result: time wasted searching, constant questions to other teams, and so little trust that people fell back on email, chats and their own documents.',
      'The goal: find information faster, a single source of truth, and a visually consistent intranet.',
    ],
    highlight:
      'In a bank, an outdated procedure is not just a UX problem: it is operational and compliance risk.',
  },

  role: {
    heading: 'One year as an intern, with growing responsibility',
    body: [
      'I joined ING as an intern, in a team of six: manager, three Product Owners, design lead and me.',
      { lead: 'July — November 2025.', text: 'Product Designer for the Financing and Customers verticals.' },
      { lead: 'November 2025 — February 2026.', text: 'I also took on the Product Owner responsibilities for Channels — branches, Contact Center, chat, Customer Ombudsman and social media — one of the critical blocks of the migration, while still supporting the other verticals as Product Designer.' },
    ],
    highlight:
      'My work with stakeholders: present each redesign proposal, defend it and carry it all the way into SharePoint Online. I also contributed components and styles to the design system and collaborated on the copy.',
  },

  phases: [
    { title: 'Content audit', description: 'Inventory of my verticals’ pages in SharePoint 2016. We decided what to migrate, merge or delete, and repeated patterns became templates.' },
    { title: 'Research', description: 'Interviews and surveys with managers and coordinators, plus workshops with each area’s owners to understand their needs and their content.' },
    { title: 'Information architecture', description: 'Navigation by vertical, fewer levels of depth, taxonomy and tagging for search, and shortcuts by profile.' },
    { title: 'Design & validation', description: 'Wireframes and UI in Figma, components and templates for SharePoint Online, stakeholder reviews, and final build and validation.' },
  ],

  ia: {
    heading: 'Fewer levels, clear names, shortcuts by profile',
    body: [
      { lead: 'Navigation by vertical.', text: 'Financing, Customers and Channels each with their own structure, built on the content that survived the audit.' },
      { lead: 'Less depth.', text: 'A flatter hierarchy to reach content in fewer clicks.' },
      { lead: 'Taxonomy and tagging.', text: 'Names that make sense to whoever is searching, and metadata so SharePoint Online search actually works.' },
      { lead: 'Shortcuts by profile.', text: 'What a manager, a coordinator or the Contact Center uses most, one click away.' },
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
    body: [
      { lead: 'Live documents.', text: 'Linked Word and Excel templates updated at the source. Nobody downloads a copy that is outdated a few days later: a single source of truth, for documents too.' },
      { lead: 'News without noise.', text: 'The news banner only shows up when there is something genuinely new, so people don’t burn out on permanent alerts.' },
      { lead: 'Operations first.', text: 'Forms, templates and processes grouped by section (ATMs & cash, cards…), not by department.' },
      { lead: 'A home that remembers.', text: 'Saved pages, recently visited documents and training paths by employee type.' },
    ],
  },

  schematicNote: 'Schematics redrawn and simplified for confidentiality. They do not reproduce ING screens or internal data.',

  metricsTitle: 'Results',
  metrics: [
    { value: '85%', label: 'USER SATISFACTION', caption: 'up from 60% · feb 2026', direction: 'up' },
    { value: '35%', label: 'CLICKS TO CONTENT', caption: 'fewer clicks to reach content', direction: 'down' },
    { value: '~50%', label: 'CONTENT PRUNED', caption: 'deleted or merged before migrating', direction: 'down' },
    { value: '100%', label: 'MIGRATION', caption: 'completed in feb 2026' },
  ],
  metricsNote: 'Satisfaction measured in phases throughout the migration. Other figures are approximate.',
  aftermath: 'After the migration, the new format and its templates became the standard for building new sections, and feedback from users and areas was positive.',

  next: { label: 'NEXT / JR.WORK', heading: 'Let’s talk', work: 'More projects', contact: 'Contact' },
};

export const ING_CASE = { shared, ESP, ENG };
