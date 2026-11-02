/**
 * Case study — Piscilona S.L. automatic budgeting. Bilingual copy (ESP | ENG).
 * Source: ./piscilona.brief.md (old Framer slides + interview, not published).
 *
 * Rules kept from the interview:
 * - Time gain is "2–4 h → ~3 min" (×40–×80). Never a bare "×80".
 * - Juan designed; Piscilona's dev team built it. Pricing logic defined by Juan with the technician.
 * - In real daily use. No claims about extra sales (no data).
 * - Client data and prices in demos are fictitious; real rates are Piscilona's commercial info.
 * - HUD micro-labels stay in technical English in both languages.
 */

type Paragraph = string | { lead: string; text: string };

const shared = {
  id: 'JR.CASE.003',
  status: 'IN PRODUCTION',
  slug: 'automatic-budgeting-piscilona-sl',
  meta: [
    { label: 'ROLE', value: { ESP: 'Product Designer (freelance)', ENG: 'Product Designer (freelance)' } },
    { label: 'PERIOD', value: { ESP: 'ENE 2025 — MAR 2025', ENG: 'JAN 2025 — MAR 2025' } },
    { label: 'TEAM', value: { ESP: 'Diseño · técnico · desarrollo', ENG: 'Design · technician · dev' } },
    { label: 'DELIVERABLES', value: { ESP: 'Ficha en papel + web app', ENG: 'Paper sheet + web app' } },
    { label: 'TOOLS', value: { ESP: 'Figma · Photoshop · Illustrator', ENG: 'Figma · Photoshop · Illustrator' } },
  ],
};

const ESP = {
  pageTitle: 'Presupuestador Piscilona — Case study · Juan Romero',
  back: 'JR.WORK / INDEX',
  tag: 'CASE STUDY / PISCILONA S.L.',
  title: 'Presupuestos de piscina en 3 minutos',
  intro:
    'En Piscilona solo un técnico sabía hacer presupuestos, y cada uno le llevaba de 2 a 4 horas. Diseñé una ficha técnica en papel y un presupuestador web que comparten la misma estructura, para que cualquier persona de la empresa pueda presupuestar una reforma en unos 3 minutos.',

  problem: {
    heading: 'Todo el conocimiento estaba en una sola persona',
    body: [
      'Presupuestar una reforma de piscina exige medir en obra, aplicar muchas fórmulas y consultar precios. En Piscilona ese proceso era tedioso, estaba poco digitalizado y tenía una curva de aprendizaje tan alta que un único técnico hacía todos los presupuestos de la empresa.',
    ] as Paragraph[],
    facts: [
      { label: 'Dependencia operativa', value: '1', unit: 'persona', text: 'Toda la capacidad de presupuestar de la empresa dependía de un único técnico.' },
      { label: 'Tiempo', value: '2–4', unit: 'h', text: 'Cada presupuesto llevaba de 2 a 4 horas, según el tipo de obra.' },
      { label: 'Falta de comprensión', value: 'Notas', unit: 'manuscritas', text: 'En la obra, las medidas se apuntaban a mano en una libreta, sin estructura. Si no eran legibles, solo unos pocos entendían la información.' },
    ],
    highlight: 'El objetivo: que cualquier empleado pueda hacer un presupuesto complejo, rápido y sin errores.',
  },

  role: {
    heading: 'Del papel a la web, de extremo a extremo',
    body: [
      'Trabajé como Product Designer freelance con dos interlocutores: el técnico, que era quien sabía presupuestar, y el equipo de desarrollo de Piscilona, que programaba lo que yo diseñaba.',
      { lead: 'Ficha técnica.', text: 'Diseñé la ficha en papel que el técnico rellena en la visita.' },
      { lead: 'Presupuestador.', text: 'Diseñé el flujo y la interfaz web, de los wireframes al prototipo en Figma.' },
      { lead: 'Lógica de cálculo.', text: 'Definí con el técnico las reglas de precios y fórmulas que el sistema aplica automáticamente.' },
      { lead: 'Validación y entrega.', text: 'Test de usabilidad con 4 participantes y coordinación con desarrollo hasta su uso real.' },
    ] as Paragraph[],
  },

  phases: [
    { title: 'Descubrir', duration: 'DISCOVER', description: 'Recorrí el proceso de obtener un presupuesto de principio a fin para encontrar dónde se rompía.' },
    { title: 'Definir', duration: 'DEFINE', description: 'De todos los problemas y variables, me quedé con los dos críticos: la dependencia y el tiempo.' },
    { title: 'Diseñar', duration: 'DESIGN', description: 'Ficha técnica, flujo en 4 pasos y reglas de cálculo: soluciones eficaces y fáciles de implementar.' },
    { title: 'Lanzar', duration: 'LAUNCH', description: 'Test de usabilidad, prototipo, ajustes y entrega a desarrollo.' },
  ],

  decision: {
    heading: 'Sacar el conocimiento de la cabeza del técnico',
    body: [
      'El flujo tenía dos fases: un técnico mide la piscina en la obra y, después, alguien calcula el presupuesto en la oficina. El problema de fondo estaba en la segunda: el cálculo solo existía en la cabeza de una persona.',
      'Trabajé con el técnico para traducir su forma de presupuestar a reglas explícitas: qué medidas necesita cada obra, qué fórmula se aplica y con qué precio. Esas reglas pasaron al sistema, que hace el cálculo de forma automática.',
      'Para que los datos lleguen bien a la oficina, la ficha en papel y el formulario web comparten exactamente la misma estructura.',
    ] as Paragraph[],
    highlight: 'Quien rellena el formulario no necesita saber de piscinas: solo pasar la ficha a la pantalla, campo a campo.',
    flowAria: 'Flujo del presupuesto en dos fases',
    flowHandoff: 'Ficha técnica',
    flow: [
      { tag: 'ON SITE', title: 'Medición y ficha técnica de la piscina' },
      { tag: 'OFFICE', title: 'Creación del presupuesto' },
    ],
  },

  sheet: {
    heading: 'La misma estructura en papel y en pantalla',
    body: [
      'La ficha sustituye a la libreta: casillas, descripciones y unidades que guían al técnico en la obra y reducen errores. El formulario web sigue el mismo orden y los mismos campos, así que quien presupuesta en la oficina entiende la ficha sin haber pisado la obra.',
      'Pasa el cursor por cualquier campo, o recórrelos con el tabulador, para ver su pareja al otro lado.',
    ] as Paragraph[],
  },

  sheetForm: {
    sheetLabel: 'SHEET / ON SITE',
    formLabel: 'FORM / AT THE OFFICE',
    sheetLabelShort: 'Ficha',
    formLabelShort: 'formulario',
    sheetTitle: 'Ficha técnica Piscilona S.L.',
    paper: 'A4 · 4 PÁG.',
    formTitle: 'Nuevo presupuesto',
    pageLabel: 'pág.',
    stepLabel: 'paso',
    steps: ['Datos', 'Obras', 'Revisión', 'Presupuesto'],
    hint: 'Pasa el cursor, toca o tabula sobre un campo para ver su pareja.',
    groups: [
      { key: 'client', sheet: 'Cliente', form: 'Datos del cliente', page: 1, step: 0, fields: [
        { id: 'name', sheet: 'Nombre', form: 'Nombre', value: 'Luis Paz' },
        { id: 'address', sheet: 'Dirección', form: 'Dirección', value: 'C/ Goya 8, Pinto' },
        { id: 'phone', sheet: 'Teléfono', form: 'Teléfono', value: '600 000 000' },
      ] },
      { key: 'pool', sheet: 'Tipo y medidas de vaso', form: 'Datos de la piscina', page: 1, step: 0, fields: [
        { id: 'type', sheet: 'Tipo', form: 'Modelo piscina', value: 'Riñón' },
        { id: 'l1', sheet: 'L1', form: 'Longitud (L1)', value: '12 m' },
        { id: 'a1', sheet: 'A1', form: 'Anchura (A1)', value: '6 m' },
        { id: 'depth', sheet: 'Altura mín./máx.', form: 'Altura mín. / máx.', value: '1,2 m / 2 m' },
      ] },
      { key: 'works', sheet: 'Capítulos', form: 'Obras', page: 2, step: 1, fields: [
        { id: 'floor', kind: 'check', checked: true, sheet: 'Subir el suelo', form: 'Subir el suelo de la piscina', value: '1 m / 1,8 m' },
        { id: 'stairs', kind: 'check', checked: false, sheet: 'Escalera de obra', form: 'Escalera de obra vaso piscina' },
        { id: 'coping', kind: 'check', checked: true, sheet: 'Coronación · picado', form: 'Coronación · picado' },
      ] },
      { key: 'deck', sheet: 'Playa de piscina', form: 'Playa de piscina', page: 4, step: 1, fields: [
        { id: 'deck', kind: 'check', checked: true, sheet: 'Picada', form: 'Playa · picada', value: '10 m²' },
      ] },
    ],
  },

  demo: {
    heading: 'Pruébalo: un presupuesto en cuatro pasos',
    body: [
      'Versión reducida del presupuestador. Elige la piscina, marca las obras y mira cómo las reglas componen el presupuesto. Los datos y las tarifas son ficticios.',
    ] as Paragraph[],
    ui: {
      title: 'Nuevo presupuesto',
      badge: 'TARIFAS ILUSTRATIVAS',
      elapsed: 'TIEMPO',
      steps: ['Datos', 'Obras', 'Revisión', 'Presupuesto'],
      poolHeading: 'Datos de la piscina',
      typeLabel: 'Modelo de piscina',
      types: { rect: 'Rectangular', kidney: 'Riñón', roman: 'Escalera romana' },
      fields: { l: 'Longitud (L1)', a: 'Anchura (A1)', dmin: 'Altura mínima', dmax: 'Altura máxima' },
      geometry: 'GEOMETRÍA',
      area: 'Superficie de suelo',
      perimeter: 'Perímetro',
      vessel: 'Superficie del vaso',
      worksHeading: 'Obras a realizar',
      works: { floor: 'Subir el suelo de la piscina', coping: 'Coronación de piscina', lining: 'Revestimiento del vaso', deck: 'Playa de piscina' },
      workHints: { floor: 'Nuevas alturas', coping: 'Por perímetro', lining: 'Por superficie del vaso', deck: 'Por m² de playa' },
      newMin: 'Nueva altura mínima',
      newMax: 'Nueva altura máxima',
      deckArea: 'Superficie de playa',
      reviewHeading: 'Revisa los datos antes de calcular',
      edit: 'Editar',
      quoteHeading: 'Presupuesto',
      doneIn: 'CALCULADO EN',
      concept: 'Concepto',
      amount: 'Importe',
      ruleLabel: 'REGLA',
      labour: 'Mano de obra',
      base: 'Base imponible',
      vat: 'IVA 21 %',
      total: 'Total',
      back: 'Anterior',
      next: 'Siguiente',
      calc: 'Calcular presupuesto',
      restart: 'Nuevo presupuesto',
      errors: {
        range: 'Introduce un valor entre {min} y {max}.',
        order: 'La altura mínima no puede superar a la máxima.',
        lower: 'Debe ser menor que la altura actual ({v} m).',
        noWorks: 'Marca al menos una obra para continuar.',
      },
      note: 'Geometría simplificada y tarifas ficticias. El sistema real aplica las reglas y precios definidos con el técnico de Piscilona.',
    },
  },

  test: {
    heading: 'Validado con cuatro personas',
    body: [
      'Cuatro participantes de distinta edad, formación y manejo de ofimática hicieron un presupuesto a partir de una ficha técnica ya rellenada, mientras yo observaba cómo interactuaban con el prototipo.',
    ] as Paragraph[],
    cols: { dim: 'DIMENSION', pro: 'PROS', con: 'CONS' },
    rows: [
      { dim: 'Experiencia de uso', pro: 'Fácil de navegar; minimiza errores.', con: null },
      { dim: 'Diseño visual', pro: 'Claro y coherente.', con: 'Diseño sencillo.' },
      { dim: 'Tiempo', pro: '3 minutos de media.', con: 'Se alarga si la persona maneja poco el sistema.' },
      { dim: 'Ficha técnica', pro: 'Misma estructura que el formulario: simplifica los pasos.', con: 'La letra del técnico puede ser más o menos legible.' },
    ],
  },

  time: {
    before: 'Antes · a mano',
    after: 'Ahora · web app',
    beforeValue: '2–4 h',
    afterValue: '3 min',
    factor: '×40–80',
    factorCaption: 'más rápido',
    legendMin: 'Mínimo (2 h)',
    legendRange: 'Según el tipo de obra',
    aria: 'Tiempo por presupuesto: antes de 2 a 4 horas, ahora unos 3 minutos; entre 40 y 80 veces más rápido.',
  },

  headings: { process: 'Cómo lo abordé: doble diamante', time: 'De horas a minutos', metrics: 'Resultados en el uso diario' },

  metricsTitle: 'Results',
  metrics: [
    { value: '3 min', from: 120, label: 'TIEMPO POR PRESUPUESTO', caption: 'antes, de 2 a 4 h', direction: 'down' },
    { value: 'LIVE', label: 'EN PRODUCCIÓN', caption: 'en uso diario en Piscilona' },
  ],
  metricsNote: 'Tiempo medido en el test de usabilidad (4 participantes) y mantenido en el uso diario.',
  impact: {
    heading: 'Qué cambió en la empresa',
    facts: [
      { label: 'Sin dependencia', value: 'Varias', unit: 'personas presupuestan', text: 'Sin formación técnica específica: basta con seguir el proceso.' },
      { label: 'El técnico, en la obra', value: '2–4 h', unit: 'liberadas por presupuesto', text: 'Dedica su tiempo a visitas y obras en lugar de a calcular presupuestos.' },
      { label: 'Presupuestos homogéneos', value: '1', unit: 'formato y criterio de precio', text: 'Todos los presupuestos salen igual, con menos errores.' },
      { label: 'Respuesta más rápida', value: 'Minutos', unit: 'en lugar de horas', text: 'El cliente recibe su presupuesto en mucho menos tiempo.' },
    ],
  },

  next: { label: 'NEXT / JR.WORK', heading: '¿Hablamos?', contact: 'Contacto' },
};

const ENG: typeof ESP = {
  pageTitle: 'Piscilona budgeting tool — Case study · Juan Romero',
  back: 'JR.WORK / INDEX',
  tag: 'CASE STUDY / PISCILONA S.L.',
  title: 'Pool renovation quotes in 3 minutes',
  intro:
    'At Piscilona only one technician knew how to put together a quote, and each one took 2 to 4 hours. I designed a paper data sheet and a web budgeting tool that share the same structure, so anyone in the company can quote a renovation in about 3 minutes.',

  problem: {
    heading: 'All the know-how lived in one person',
    body: [
      'Quoting a pool renovation means measuring on site, applying many formulas and checking prices. At Piscilona the process was tedious, barely digitalised and so hard to learn that a single technician produced every quote in the company.',
    ],
    facts: [
      { label: 'Operational dependency', value: '1', unit: 'person', text: 'The company’s whole ability to quote depended on a single technician.' },
      { label: 'Time', value: '2–4', unit: 'h', text: 'Each quote took 2 to 4 hours, depending on the type of work.' },
      { label: 'Lack of clarity', value: 'Notes', unit: 'by hand', text: 'On site, measurements were handwritten in a notebook with no structure. If they were hard to read, only a few people understood them.' },
    ],
    highlight: 'The goal: anyone in the company can produce a complex quote, fast and without errors.',
  },

  role: {
    heading: 'From paper to web, end to end',
    body: [
      'I worked as a freelance Product Designer with two counterparts: the technician, who knew how to quote, and Piscilona’s development team, who built what I designed.',
      { lead: 'Data sheet.', text: 'I designed the paper sheet the technician fills in during the site visit.' },
      { lead: 'Budgeting tool.', text: 'I designed the web flow and interface, from wireframes to a Figma prototype.' },
      { lead: 'Pricing logic.', text: 'Together with the technician, I defined the pricing rules and formulas the system applies automatically.' },
      { lead: 'Validation and handoff.', text: 'Usability test with 4 participants, and coordination with development until it was in real use.' },
    ],
  },

  phases: [
    { title: 'Discover', duration: 'DISCOVER', description: 'I walked through the quoting process end to end to find where it broke.' },
    { title: 'Define', duration: 'DEFINE', description: 'Out of every problem and variable, I kept the two critical ones: dependency and time.' },
    { title: 'Design', duration: 'DESIGN', description: 'Data sheet, 4-step flow and pricing rules: effective, easy-to-implement solutions.' },
    { title: 'Launch', duration: 'LAUNCH', description: 'Usability test, prototype, adjustments and handoff to development.' },
  ],

  decision: {
    heading: 'Getting the know-how out of the technician’s head',
    body: [
      'The flow had two phases: a technician measures the pool on site, then someone calculates the quote at the office. The real problem was in the second one: the calculation only existed in one person’s head.',
      'I worked with the technician to turn their way of quoting into explicit rules: which measurements each job needs, which formula applies and at what price. Those rules went into the system, which now does the calculation automatically.',
      'So that data reaches the office intact, the paper sheet and the web form share exactly the same structure.',
    ],
    highlight: 'Whoever fills in the form doesn’t need to know about pools: they just copy the sheet onto the screen, field by field.',
    flowAria: 'Two-phase quoting flow',
    flowHandoff: 'Data sheet',
    flow: [
      { tag: 'ON SITE', title: 'Pool measurement and data sheet' },
      { tag: 'OFFICE', title: 'Quote creation' },
    ],
  },

  sheet: {
    heading: 'The same structure on paper and on screen',
    body: [
      'The sheet replaces the notebook: boxes, descriptions and units that guide the technician on site and reduce errors. The web form follows the same order and fields, so whoever quotes at the office understands the sheet without ever visiting the site.',
      'Hover over any field, or tab through them, to see its match on the other side.',
    ],
  },

  sheetForm: {
    sheetLabel: 'SHEET / ON SITE',
    formLabel: 'FORM / AT THE OFFICE',
    sheetLabelShort: 'Sheet',
    formLabelShort: 'form',
    sheetTitle: 'Piscilona S.L. data sheet',
    paper: 'A4 · 4 PAGES',
    formTitle: 'New quote',
    pageLabel: 'p.',
    stepLabel: 'step',
    steps: ['Details', 'Works', 'Review', 'Quote'],
    hint: 'Hover, tap or tab onto a field to see its match.',
    groups: [
      { key: 'client', sheet: 'Client', form: 'Client details', page: 1, step: 0, fields: [
        { id: 'name', sheet: 'Name', form: 'Name', value: 'Luis Paz' },
        { id: 'address', sheet: 'Address', form: 'Address', value: 'C/ Goya 8, Pinto' },
        { id: 'phone', sheet: 'Phone', form: 'Phone', value: '600 000 000' },
      ] },
      { key: 'pool', sheet: 'Pool type and size', form: 'Pool details', page: 1, step: 0, fields: [
        { id: 'type', sheet: 'Type', form: 'Pool model', value: 'Kidney' },
        { id: 'l1', sheet: 'L1', form: 'Length (L1)', value: '12 m' },
        { id: 'a1', sheet: 'A1', form: 'Width (A1)', value: '6 m' },
        { id: 'depth', sheet: 'Min./max. depth', form: 'Min. / max. depth', value: '1.2 m / 2 m' },
      ] },
      { key: 'works', sheet: 'Chapters', form: 'Works', page: 2, step: 1, fields: [
        { id: 'floor', kind: 'check', checked: true, sheet: 'Raise the floor', form: 'Raise the pool floor', value: '1 m / 1.8 m' },
        { id: 'stairs', kind: 'check', checked: false, sheet: 'Built-in stairs', form: 'Built-in pool stairs' },
        { id: 'coping', kind: 'check', checked: true, sheet: 'Coping · removal', form: 'Coping · removal' },
      ] },
      { key: 'deck', sheet: 'Pool deck', form: 'Pool deck', page: 4, step: 1, fields: [
        { id: 'deck', kind: 'check', checked: true, sheet: 'Removal', form: 'Deck · removal', value: '10 m²' },
      ] },
    ],
  },

  demo: {
    heading: 'Try it: a quote in four steps',
    body: [
      'A reduced version of the budgeting tool. Pick a pool, tick the works and watch the rules build the quote. Data and rates are fictitious.',
    ],
    ui: {
      title: 'New quote',
      badge: 'ILLUSTRATIVE RATES',
      elapsed: 'TIME',
      steps: ['Details', 'Works', 'Review', 'Quote'],
      poolHeading: 'Pool details',
      typeLabel: 'Pool model',
      types: { rect: 'Rectangular', kidney: 'Kidney', roman: 'Roman steps' },
      fields: { l: 'Length (L1)', a: 'Width (A1)', dmin: 'Min. depth', dmax: 'Max. depth' },
      geometry: 'GEOMETRY',
      area: 'Floor area',
      perimeter: 'Perimeter',
      vessel: 'Shell area',
      worksHeading: 'Works to carry out',
      works: { floor: 'Raise the pool floor', coping: 'Pool coping', lining: 'Shell lining', deck: 'Pool deck' },
      workHints: { floor: 'New depths', coping: 'By perimeter', lining: 'By shell area', deck: 'By deck m²' },
      newMin: 'New min. depth',
      newMax: 'New max. depth',
      deckArea: 'Deck area',
      reviewHeading: 'Check the details before calculating',
      edit: 'Edit',
      quoteHeading: 'Quote',
      doneIn: 'CALCULATED IN',
      concept: 'Item',
      amount: 'Amount',
      ruleLabel: 'RULE',
      labour: 'Labour',
      base: 'Taxable base',
      vat: 'VAT 21 %',
      total: 'Total',
      back: 'Back',
      next: 'Next',
      calc: 'Calculate quote',
      restart: 'New quote',
      errors: {
        range: 'Enter a value between {min} and {max}.',
        order: 'Min. depth can’t be greater than max. depth.',
        lower: 'Must be lower than the current depth ({v} m).',
        noWorks: 'Tick at least one job to continue.',
      },
      note: 'Simplified geometry and fictitious rates. The real system applies the rules and prices defined with Piscilona’s technician.',
    },
  },

  test: {
    heading: 'Validated with four people',
    body: [
      'Four participants of different ages, training and office-software skills produced a quote from an already completed data sheet, while I observed how they interacted with the prototype.',
    ],
    cols: { dim: 'DIMENSION', pro: 'PROS', con: 'CONS' },
    rows: [
      { dim: 'User experience', pro: 'Easy to navigate; minimises errors.', con: null },
      { dim: 'Visual design', pro: 'Clear and consistent.', con: 'Simple design.' },
      { dim: 'Time', pro: '3 minutes on average.', con: 'Takes longer for people less used to the system.' },
      { dim: 'Data sheet', pro: 'Same structure as the form: simplifies the steps.', con: 'The technician’s handwriting may be more or less legible.' },
    ],
  },

  time: {
    before: 'Before · by hand',
    after: 'Now · web app',
    beforeValue: '2–4 h',
    afterValue: '3 min',
    factor: '×40–80',
    factorCaption: 'faster',
    legendMin: 'Minimum (2 h)',
    legendRange: 'Depending on the job',
    aria: 'Time per quote: before, 2 to 4 hours; now, about 3 minutes — 40 to 80 times faster.',
  },

  headings: { process: 'How I approached it: double diamond', time: 'From hours to minutes', metrics: 'Results in daily use' },

  metricsTitle: 'Results',
  metrics: [
    { value: '3 min', from: 120, label: 'TIME PER QUOTE', caption: 'down from 2–4 h', direction: 'down' },
    { value: 'LIVE', label: 'IN PRODUCTION', caption: 'in daily use at Piscilona' },
  ],
  metricsNote: 'Time measured in the usability test (4 participants) and sustained in daily use.',
  impact: {
    heading: 'What changed in the company',
    facts: [
      { label: 'No more dependency', value: 'Several', unit: 'people can quote', text: 'No specific technical training needed: they just follow the process.' },
      { label: 'The technician back on site', value: '2–4 h', unit: 'freed per quote', text: 'Their time goes to visits and works instead of calculating quotes.' },
      { label: 'Consistent quotes', value: '1', unit: 'format and pricing criteria', text: 'Every quote comes out the same way, with fewer errors.' },
      { label: 'Faster response', value: 'Minutes', unit: 'instead of hours', text: 'Clients get their quote in a fraction of the time.' },
    ],
  },

  next: { label: 'NEXT / JR.WORK', heading: 'Let’s talk', contact: 'Contact' },
};

export const PISCILONA_CASE = { shared, ESP, ENG };
