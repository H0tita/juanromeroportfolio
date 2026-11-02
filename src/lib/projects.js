/**
 * Case-study index, in display order. Single source for the landing WORK grid and the
 * "more cases" carousel at the end of each case study (`slug` = the case's shared.slug).
 */
export const PROJECTS = [
  {
    slug: 'intrabuddy', href: '/work/intrabuddy', image: '/covers/intrabuddy.jpg', categories: ['AI', 'Prompting', 'Data'],
    ESP: { title: 'Intrabuddy · ING', excerpt: 'Agente de IA en la intranet de ING', metric: { value: '~60%', label: 'menos tiempo de búsqueda' } },
    ENG: { title: 'Intrabuddy · ING', excerpt: 'AI agent in the ING intranet', metric: { value: '~60%', label: 'less search time' } },
  },
  {
    slug: 'ing', href: '/work/ing', image: '/covers/ing.jpg', categories: ['UX', 'Info Architecture', 'Banking'],
    ESP: { title: 'Intranet ING', excerpt: 'Rediseño y migración a SharePoint Online', metric: { value: '60% → 85%', label: 'satisfacción' } },
    ENG: { title: 'ING Intranet', excerpt: 'Redesign and migration to SharePoint Online', metric: { value: '60% → 85%', label: 'satisfaction' } },
  },
  {
    slug: 'automatic-budgeting-piscilona-sl', href: '/work/automatic-budgeting-piscilona-sl', image: '/covers/piscilona.jpg', categories: ['UX/UI', 'Service Design', 'SaaS'],
    ESP: { title: 'Presupuestador Piscilona', excerpt: 'Ficha técnica + web app', metric: { value: '2–4 h → 3 min', label: 'por presupuesto' } },
    ENG: { title: 'Piscilona Budgeting Tool', excerpt: 'Data sheet + web app', metric: { value: '2–4 h → 3 min', label: 'per quote' } },
  },
  {
    slug: 'digisfera', href: '/work/digisfera', image: '/covers/digisfera.jpg', categories: ['Branding', 'Illustration', 'Print'],
    ESP: { title: 'Digisfera · ING', excerpt: 'Marca e insignias para digitalizar oficinas', metric: { value: '3 × 2', label: 'insignias en pegatina' } },
    ENG: { title: 'Digisfera · ING', excerpt: 'Brand and badges to digitalise branches', metric: { value: '3 × 2', label: 'sticker badges' } },
  },
];

/** Two-digit index ("01") of a project in the list. */
export const projectIndex = (p) => String(PROJECTS.indexOf(p) + 1).padStart(2, '0');
