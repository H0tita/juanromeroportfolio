/**
 * Case study — Intrabuddy, AI agent in the ING intranet. Bilingual copy (ESP | ENG).
 * Source: ./intrabuddy.brief.md (interview, not published).
 *
 * Rules kept from the interview:
 * - Measured pilot data (~60 searches, 3 managers, 12 days) vs business projection: the
 *   projection is ALWAYS labelled as an estimate (Juan's own calculation; 58 % conversion is
 *   ING internal data; the "search ≈ 40 % of a visit" weight is an assumption).
 * - Time reduction is approximate: "~60 %".
 * - Rollout was APPROVED for all ING Spain branches (planned July 2026); never "in production".
 * - Method note: the agent search ran after the usual one to validate it (Compliance).
 * - HUD micro-labels stay in technical English in both languages.
 */

type Paragraph = string | { lead: string; text: string };

const shared = {
  id: 'JR.CASE.001',
  status: 'APPROVED FOR ROLLOUT',
  slug: 'intrabuddy',
  meta: [
    { label: 'ROLE', value: { ESP: 'Prompting · medición · datos', ENG: 'Prompting · measurement · data' } },
    { label: 'PERIOD', value: { ESP: 'MAR 2026 — ABR 2026', ENG: 'MAR 2026 — APR 2026' } },
    { label: 'PLATFORM', value: { ESP: 'Microsoft Copilot Studio', ENG: 'Microsoft Copilot Studio' } },
    { label: 'PILOT', value: { ESP: 'Oficinas de Barcelona', ENG: 'Barcelona branches' } },
    { label: 'TEAM', value: { ESP: 'Manager · 2 · 2 coord. · 3 gestores', ENG: 'Manager · 2 · 2 coord. · 3 branch mgrs' } },
  ],
};

const ESP = {
  pageTitle: 'Intrabuddy, IA en la intranet de ING — Case study · Juan Romero',
  back: 'JR.WORK / INDEX',
  tag: 'CASE STUDY / ING SPAIN · INTRABUDDY',
  title: 'Dudas de oficina resueltas en segundos',
  intro:
    'Intrabuddy es un agente de IA integrado en la intranet de ING: cualquier empleado escribe su duda y recibe la respuesta en segundos. Sin navegar, sin buscar, sin llamar a un compañero. Me encargué del prompting del agente y del programa de medición del piloto, que convenció a Compliance y abrió su despliegue a todas las oficinas de ING España.',

  problem: {
    heading: 'Cada duda de un cliente costaba minutos',
    body: [
      'En la oficina, los clientes preguntan cosas muy concretas: ¿me cobran comisiones por sacar dinero en un banco de Filipinas? Para responder, el gestor tenía que navegar por la intranet, buscar entre documentos y, si no lo encontraba, preguntar a un compañero o llamar a Calidad. Todo eso, con el cliente delante.',
    ] as Paragraph[],
    facts: [
      { label: 'Navegar y buscar', value: 'Minutos', unit: 'por duda', text: 'Recorrer la intranet y los documentos hasta dar con la respuesta, con el cliente esperando.' },
      { label: 'Preguntar a compañeros', value: '~5 %', unit: 'de las consultas', text: 'Acababan en una llamada o una pregunta a otro compañero de la oficina.' },
      { label: 'Llamar a Calidad', value: '~5 %', unit: 'de las consultas', text: 'Necesitaban escalar la duda al equipo de Calidad.' },
    ],
    highlight: 'El objetivo: que cualquier gestor resuelva una duda en segundos, simplemente preguntando.',
  },

  race: {
    heading: 'La misma duda, dos caminos',
    body: [
      'Lanza la consulta y compara cómo se resuelve con y sin Intrabuddy. Recreación ilustrativa a partir del piloto.',
    ] as Paragraph[],
    ui: {
      clientLabel: 'CLIENT QUESTION · OFICINA',
      question: '¿Me cobran comisiones por sacar dinero en un banco de Filipinas?',
      run: 'Lanzar consulta',
      replay: 'Repetir',
      idle: 'EN ESPERA',
      searching: 'BUSCANDO…',
      found: 'RESUELTO',
      answered: 'RESUELTO',
      relative: 'TIEMPO RELATIVO',
      withoutTitle: 'Sin Intrabuddy',
      withoutSub: 'Búsqueda habitual en la intranet',
      withTitle: 'Con Intrabuddy',
      withSub: 'El gestor pregunta al agente',
      steps: [
        { at: 0.04, text: 'Abre la intranet' },
        { at: 0.16, text: 'Navega hasta la sección de tarifas' },
        { at: 0.3, text: 'Busca «comisiones extranjero»' },
        { at: 0.46, text: 'Abre el documento de tarifas' },
        { at: 0.62, text: 'Revisa condiciones y letra pequeña' },
        { at: 0.76, text: 'O pregunta a un compañero', detour: '~5 % de los casos' },
        { at: 1, text: 'Respuesta encontrada', final: true },
      ],
      manager: 'GESTOR',
      typing: 'Intrabuddy está escribiendo…',
      answer: 'Las retiradas de efectivo fuera de la zona euro siguen las condiciones de la tarifa internacional de tu tarjeta. Te resumo lo que aplica a este cliente y te enlazo el documento oficial.',
      source: 'Fuente · documento oficial de tarifas',
      illustrative: 'Respuesta ilustrativa',
      waiting: 'Pulsa «Lanzar consulta» para empezar.',
      result: 'menos tiempo de búsqueda en el piloto',
      note: 'Escala de tiempo relativa: el carril de Intrabuddy dura el 40 % del habitual, como en la media del piloto. No reproduce tiempos absolutos ni tarifas reales.',
    },
  },

  role: {
    heading: 'Del prompt a los datos',
    body: [
      'Un equipo pequeño, de la dirección a la oficina. Mi parte:',
      { lead: 'Prompting del agente.', text: 'Instrucciones y comportamiento de Intrabuddy en Microsoft Copilot Studio, sobre el contenido de la intranet.' },
      { lead: 'Programa de medición.', text: 'Diseñé y desarrollé el método y la herramienta para medir el piloto en las oficinas.' },
      { lead: 'Análisis de datos.', text: 'Métricas y conclusiones del piloto, y una proyección de su impacto en negocio.' },
    ] as Paragraph[],
    team: {
      aria: 'Organigrama del equipo del piloto: manager; compañero y yo; dos coordinaciones de oficina; tres gestores.',
      me: 'YO',
      manager: { label: 'MANAGER', title: 'Manager', text: 'Impulsa el piloto y decide el despliegue.' },
      mate: { label: 'TEAM', title: 'Compañero', text: 'Prompting y comunicación con coordinadores y gestores.' },
      self: { label: 'TEAM', title: 'Juan Romero', text: 'Prompting, programa de medición y análisis de datos.' },
      coordinators: [
        { label: 'BRANCH · A', title: 'Coordinación de oficina', text: 'Organiza el piloto en su oficina.', managers: 1 },
        { label: 'BRANCH · B', title: 'Coordinación de oficina', text: 'Organiza el piloto en su oficina.', managers: 2 },
      ],
      gestor: { label: 'PILOT', title: 'Gestor', text: 'Usa Intrabuddy y mide cada duda real.' },
    },
  },

  decision: {
    heading: 'Medir sin estorbar al gestor',
    body: [
      'La propuesta inicial era medir con el cronómetro del móvil y apuntar cada tiempo en un Excel. En mitad de la atención a un cliente, eso es una carga cognitiva enorme y una fuente de errores.',
      'Por iniciativa propia, diseñé con Office Scripts una plantilla de Excel con dos botones: Play y Stop. El tiempo se registra solo; el gestor únicamente escribe el nombre de la búsqueda y, si ocurre algo fuera de lo normal, un comentario.',
      'Al terminar el piloto, la propia plantilla calculaba la media y la mediana por búsqueda, las incidencias y las veces que hubo que preguntar a un compañero.',
    ] as Paragraph[],
    highlight: 'Por Compliance, la respuesta de la IA no podía darse al cliente sin validarla. Por eso cada duda se medía dos veces: primero por la vía habitual y después con Intrabuddy, contrastando ambas respuestas.',
    flowAria: 'Flujo de medición de cada consulta',
    flow: [
      { tag: 'CLIENT', title: 'El cliente plantea su duda' },
      { tag: 'PLAY → STOP', title: 'Búsqueda habitual' },
      { tag: 'PLAY → STOP', title: 'La misma duda en Intrabuddy' },
      { tag: 'CHECK', title: 'Respuesta contrastada con la habitual' },
    ],
  },

  pilot: {
    heading: 'Un piloto pequeño y bien medido',
    body: [
      'Tres gestores de oficinas de Barcelona, con distinta antigüedad, midiendo cada duda real durante doce días laborables.',
    ] as Paragraph[],
    facts: [
      { label: 'Gestores', value: '3', unit: 'perfiles', text: 'Con menos de 1 año, de 1 a 2 y más de 2 años de antigüedad.' },
      { label: 'Duración', value: '12', unit: 'días laborables', text: 'De medición en oficinas de Barcelona.' },
      { label: 'Muestra', value: '~60', unit: 'búsquedas', text: 'Cada una medida por la vía habitual y con Intrabuddy.' },
    ],
  },

  headings: { metrics: 'Resultados del piloto' },

  metricsTitle: 'Results',
  metrics: [
    { value: '~60%', label: 'TIEMPO DE BÚSQUEDA', caption: 'menos tiempo por duda', direction: 'down' },
    { value: '0', label: 'ERRORES DEL AGENTE', caption: 'respuestas contrastadas una a una' },
    { value: '5% → 0%', label: 'LLAMADAS A COMPAÑEROS', caption: 'consultas que acababan en llamada (aprox.)' },
    { value: '5% → 0%', label: 'LLAMADAS A CALIDAD', caption: 'consultas escaladas a Calidad (aprox.)' },
  ],
  metricsNote: '~60 búsquedas · 3 gestores · 12 días laborables. Cifras aproximadas. La búsqueda con Intrabuddy se hacía después de la habitual para validarla, como exigía Compliance.',

  impact: {
    heading: 'Del piloto a todas las oficinas',
    facts: [
      { label: 'Compliance', value: 'OK', unit: 'al uso directo con el cliente', text: 'Los 0 errores del piloto sirvieron para aprobar que el gestor use directamente la respuesta del agente.' },
      { label: 'Despliegue', value: 'Todas', unit: 'las oficinas de ING España', text: 'Aprobado para todos los gestores, con despliegue previsto para julio de 2026. Después: Contact Center y el resto de canales.' },
    ],
  },

  calc: {
    heading: 'Y en negocio, ¿cuánto supone?',
    body: [
      'Una proyección, no un dato medido: si buscar deja de ocupar tanto tiempo, cada visita es más corta y en la misma jornada caben más. Mueve los supuestos.',
    ] as Paragraph[],
    ui: {
      title: 'Modelo de impacto',
      badge: 'ESTIMACIÓN',
      reset: 'Restablecer',
      sources: { measured: 'Medido en el piloto', assumption: 'Supuesto', data: 'Dato de ING' },
      inputs: {
        reduction: { label: 'Reducción del tiempo de búsqueda', source: 'measured', hint: '~60 % en el piloto' },
        share: { label: 'Peso de la búsqueda en cada visita', source: 'assumption', hint: 'Parte de la visita dedicada a buscar información' },
        conversion: { label: 'Conversión de venta por visita', source: 'data', hint: '58 % en oficinas' },
      },
      visitsLabel: 'Visitas atendidas',
      visitsCaption: 'Más visitas en la misma jornada',
      salesLabel: 'Ventas por cada 100 visitas actuales',
      salesCaption: 'Ventas adicionales, a igual conversión',
      formulaLabel: 'FÓRMULA',
      formulaVisits: '+visitas',
      formulaSales: '+ventas',
      note: 'Proyección propia a partir de los resultados del piloto; no es un dato medido. Con los valores por defecto sale ≈ +32 %; la proyección original del piloto fue +33 %.',
    },
  },

  next: { label: 'NEXT / JR.WORK', heading: '¿Hablamos?', contact: 'Contacto' },
};

const ENG: typeof ESP = {
  pageTitle: 'Intrabuddy, AI in the ING intranet — Case study · Juan Romero',
  back: 'JR.WORK / INDEX',
  tag: 'CASE STUDY / ING SPAIN · INTRABUDDY',
  title: 'Branch questions answered in seconds',
  intro:
    'Intrabuddy is an AI agent built into the ING intranet: any employee types a question and gets the answer in seconds. No browsing, no searching, no calling a colleague. I handled the agent’s prompting and the pilot’s measurement programme, which convinced Compliance and opened its rollout to every ING Spain branch.',

  problem: {
    heading: 'Every client question cost minutes',
    body: [
      'At the branch, clients ask very specific things: will I be charged fees for withdrawing cash at a bank in the Philippines? To answer, the manager had to browse the intranet, search through documents and, if that failed, ask a colleague or call Quality. All of it with the client sitting in front of them.',
    ],
    facts: [
      { label: 'Browse and search', value: 'Minutes', unit: 'per question', text: 'Going through the intranet and documents until finding the answer, with the client waiting.' },
      { label: 'Ask colleagues', value: '~5 %', unit: 'of queries', text: 'Ended up in a call or a question to another colleague at the branch.' },
      { label: 'Call Quality', value: '~5 %', unit: 'of queries', text: 'Had to be escalated to the Quality team.' },
    ],
    highlight: 'The goal: any manager solves a question in seconds, just by asking.',
  },

  race: {
    heading: 'Same question, two paths',
    body: [
      'Run the query and compare how it gets solved with and without Intrabuddy. Illustrative recreation based on the pilot.',
    ],
    ui: {
      clientLabel: 'CLIENT QUESTION · BRANCH',
      question: 'Will I be charged fees for withdrawing cash at a bank in the Philippines?',
      run: 'Run query',
      replay: 'Replay',
      idle: 'IDLE',
      searching: 'SEARCHING…',
      found: 'SOLVED',
      answered: 'SOLVED',
      relative: 'RELATIVE TIME',
      withoutTitle: 'Without Intrabuddy',
      withoutSub: 'Usual search in the intranet',
      withTitle: 'With Intrabuddy',
      withSub: 'The manager asks the agent',
      steps: [
        { at: 0.04, text: 'Opens the intranet' },
        { at: 0.16, text: 'Browses to the fees section' },
        { at: 0.3, text: 'Searches “foreign fees”' },
        { at: 0.46, text: 'Opens the fees document' },
        { at: 0.62, text: 'Checks conditions and fine print' },
        { at: 0.76, text: 'Or asks a colleague', detour: '~5 % of cases' },
        { at: 1, text: 'Answer found', final: true },
      ],
      manager: 'MANAGER',
      typing: 'Intrabuddy is typing…',
      answer: 'Cash withdrawals outside the euro area follow the international fee conditions of the client’s card. Here is a summary of what applies to this client, with a link to the official document.',
      source: 'Source · official fees document',
      illustrative: 'Illustrative answer',
      waiting: 'Press “Run query” to start.',
      result: 'less search time in the pilot',
      note: 'Relative time scale: the Intrabuddy lane lasts 40 % of the usual one, as in the pilot average. It does not reproduce absolute times or real fees.',
    },
  },

  role: {
    heading: 'From prompt to data',
    body: [
      'A small team, from leadership to the branch. My part:',
      { lead: 'Agent prompting.', text: 'Intrabuddy’s instructions and behaviour in Microsoft Copilot Studio, on top of the intranet content.' },
      { lead: 'Measurement programme.', text: 'I designed and built the method and the tool to measure the pilot at the branches.' },
      { lead: 'Data analysis.', text: 'Pilot metrics and conclusions, plus a projection of its business impact.' },
    ],
    team: {
      aria: 'Pilot team chart: team manager; my colleague and me; two branch coordinators; three branch managers.',
      me: 'ME',
      manager: { label: 'MANAGER', title: 'Team manager', text: 'Drives the pilot and decides the rollout.' },
      mate: { label: 'TEAM', title: 'Colleague', text: 'Prompting and communication with coordinators and branch managers.' },
      self: { label: 'TEAM', title: 'Juan Romero', text: 'Prompting, measurement programme and data analysis.' },
      coordinators: [
        { label: 'BRANCH · A', title: 'Branch coordinator', text: 'Organises the pilot at their branch.', managers: 1 },
        { label: 'BRANCH · B', title: 'Branch coordinator', text: 'Organises the pilot at their branch.', managers: 2 },
      ],
      gestor: { label: 'PILOT', title: 'Branch manager', text: 'Uses Intrabuddy and times every real question.' },
    },
  },

  decision: {
    heading: 'Measuring without getting in the way',
    body: [
      'The initial plan was to time each search with a phone stopwatch and write it down in Excel. In the middle of serving a client, that is a huge cognitive load and a source of errors.',
      'On my own initiative, I built an Excel template with Office Scripts and two buttons: Play and Stop. Time is recorded automatically; the manager only types the name of the search and, if something unusual happens, a comment.',
      'At the end of the pilot, the template itself calculated mean and median time per search, incidents, and how often a colleague had to be asked.',
    ],
    highlight: 'Because of Compliance, the AI’s answer couldn’t be given to a client without validation. So every question was measured twice: first the usual way, then with Intrabuddy, checking both answers against each other.',
    flowAria: 'Measurement flow for each query',
    flow: [
      { tag: 'CLIENT', title: 'The client asks a question' },
      { tag: 'PLAY → STOP', title: 'Usual search' },
      { tag: 'PLAY → STOP', title: 'Same question in Intrabuddy' },
      { tag: 'CHECK', title: 'Answer checked against the usual one' },
    ],
  },

  pilot: {
    heading: 'A small, well-measured pilot',
    body: [
      'Three managers at Barcelona branches, with different seniority, timing every real question over twelve working days.',
    ],
    facts: [
      { label: 'Managers', value: '3', unit: 'profiles', text: 'Less than 1 year, 1 to 2 years and more than 2 years of seniority.' },
      { label: 'Duration', value: '12', unit: 'working days', text: 'Of measurement at Barcelona branches.' },
      { label: 'Sample', value: '~60', unit: 'searches', text: 'Each one timed the usual way and with Intrabuddy.' },
    ],
  },

  headings: { metrics: 'Pilot results' },

  metricsTitle: 'Results',
  metrics: [
    { value: '~60%', label: 'SEARCH TIME', caption: 'less time per question', direction: 'down' },
    { value: '0', label: 'AGENT ERRORS', caption: 'answers checked one by one' },
    { value: '5% → 0%', label: 'CALLS TO COLLEAGUES', caption: 'queries ending in a call (approx.)' },
    { value: '5% → 0%', label: 'CALLS TO QUALITY', caption: 'queries escalated to Quality (approx.)' },
  ],
  metricsNote: '~60 searches · 3 managers · 12 working days. Approximate figures. The Intrabuddy search ran after the usual one to validate it, as Compliance required.',

  impact: {
    heading: 'From pilot to every branch',
    facts: [
      { label: 'Compliance', value: 'OK', unit: 'to direct use with clients', text: 'The pilot’s 0 errors were used to approve managers using the agent’s answer directly.' },
      { label: 'Rollout', value: 'All', unit: 'ING Spain branches', text: 'Approved for every manager, with rollout planned for July 2026. Next: Contact Center and the remaining channels.' },
    ],
  },

  calc: {
    heading: 'And in business terms?',
    body: [
      'A projection, not a measured figure: if searching takes up less time, each visit gets shorter and more visits fit in the same day. Move the assumptions.',
    ],
    ui: {
      title: 'Impact model',
      badge: 'ESTIMATE',
      reset: 'Reset',
      sources: { measured: 'Measured in pilot', assumption: 'Assumption', data: 'ING data' },
      inputs: {
        reduction: { label: 'Search time reduction', source: 'measured', hint: '~60 % in the pilot' },
        share: { label: 'Share of each visit spent searching', source: 'assumption', hint: 'Part of the visit spent looking for information' },
        conversion: { label: 'Sales conversion per visit', source: 'data', hint: '58 % at branches' },
      },
      visitsLabel: 'Visits served',
      visitsCaption: 'More visits in the same working day',
      salesLabel: 'Sales per 100 current visits',
      salesCaption: 'Extra sales, same conversion rate',
      formulaLabel: 'FORMULA',
      formulaVisits: '+visits',
      formulaSales: '+sales',
      note: 'My own projection from the pilot results; not a measured figure. Default values give ≈ +32 %; the pilot’s original projection was +33 %.',
    },
  },

  next: { label: 'NEXT / JR.WORK', heading: 'Let’s talk', contact: 'Contact' },
};

export const INTRABUDDY_CASE = { shared, ESP, ENG };
