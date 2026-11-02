/**
 * Case study — Digisfera (ING branch digitalisation brand). Bilingual copy (ESP | ENG).
 * Source: interview in chat (2026-11-01), no brief file.
 *
 * Rules kept from the interview:
 * - Lightest case of the four (JR.CASE.004): short, visual, no metrics (none publishable).
 * - Juan designed; the digitalisation team defined the initiative. May 2026.
 * - The "keys to digitalisation" leaflet is NOT shown: only its concept is explained.
 * - The QR on the poster is blurred on purpose (internal link).
 * - Starter Pack = the box of stickers sent to each Digital Coach; Digital Coach = a sticker.
 * - HUD micro-labels stay in technical English in both languages.
 */

type Paragraph = string | { lead: string; text: string };

const B = '/work/digisfera/';

const shared = {
  id: 'JR.CASE.004',
  status: 'SHIPPED',
  slug: 'digisfera',
  meta: [
    { label: 'ROLE', value: { ESP: 'Diseño de marca y gráfico', ENG: 'Brand & graphic design' } },
    { label: 'PERIOD', value: { ESP: 'MAY 2026', ENG: 'MAY 2026' } },
    { label: 'TEAM', value: { ESP: 'Diseño · equipo de digitalización', ENG: 'Design · digitalisation team' } },
    { label: 'DELIVERABLES', value: { ESP: 'Identidad · insignias · pegatinas · cartelería', ENG: 'Identity · badges · stickers · posters' } },
    { label: 'TOOLS', value: { ESP: 'Figma · Photoshop · Illustrator', ENG: 'Figma · Photoshop · Illustrator' } },
  ],
};

/** Badge sets: row × level. Images are transparent PNGs; level = number of stars. */
const badgeSrc = {
  male: [B + 'badge-m-1.png', B + 'badge-m-2.png', B + 'badge-m-3.png'],
  female: [B + 'badge-f-1.png', B + 'badge-f-2.png', B + 'badge-f-3.png'],
};

const ESP = {
  pageTitle: 'Digisfera — Case study · Juan Romero',
  back: 'JR.WORK / INDEX',
  tag: 'CASE STUDY / ING · OFICINAS',
  title: 'Digisfera: una marca para digitalizar oficinas',
  intro:
    'ING quería que cada cliente que pasa por una oficina saliera lo más digitalizado posible. Diseñé la Digisfera, la identidad que da forma a esa iniciativa: logo, grafismos, un espacio en la intranet y un sistema de insignias en pegatina que reconoce a los gestores que más digitalizan.',

  context: {
    heading: 'Un objetivo de negocio que necesitaba una cara',
    body: [
      'La propuesta llegó a mi mesa desde el equipo de digitalización: los gestores ganan puntos por cada cliente al que ayudan a usar la app, y cada mes se publica un ranking con premios y concursos. Faltaba algo que hiciera la iniciativa reconocible y que diera ganas de participar.',
    ] as Paragraph[],
    facts: [
      { label: 'Puntos', title: 'Cada cliente cuenta', text: 'El gestor suma puntos por cada cliente que digitaliza en la oficina.' },
      { label: 'Ranking mensual', title: 'Premios y concursos', text: 'Cada mes se reconoce a los gestores que más digitalizan.' },
      { label: 'Digital Coaches', title: 'Quien lo impulsa', text: 'Responsables de digitalización que animan a los gestores y reparten las insignias.' },
    ],
  },

  phases: [
    { title: 'Entender', duration: 'BRIEF', description: 'Qué quería conseguir la iniciativa y cómo se ganaban los puntos.' },
    { title: 'Identidad', duration: 'IDENTITY', description: 'Una marca propia, coherente con la intranet y con las oficinas.' },
    { title: 'Grafismos', duration: 'GRAPHICS', description: 'Insignias, personajes, pegatinas y cartelería en Figma, Photoshop e Illustrator.' },
    { title: 'Defensa', duration: 'REVIEW', description: 'Presentación y defensa del diseño ante el equipo de digitalización.' },
    { title: 'Producción', duration: 'SHIP', description: 'Impresión, envío a las oficinas y espacio en la intranet.' },
  ],

  badges: {
    heading: 'Tres niveles de insignia',
    body: [
      'Los puntos se traducen en reconocimiento visible: tres niveles de insignia, cada uno con más estrellas. Las diseñé en versión masculina y femenina para que cada gestor pudiera verse en la suya.',
      'Pasa el ratón por encima de cada pegatina.',
    ] as Paragraph[],
    rows: [
      { key: 'male', label: 'SET A / MASCULINE', name: 'Masculinas' },
      { key: 'female', label: 'SET B / FEMININE', name: 'Femeninas' },
    ],
    levels: [
      { code: 'LVL.01', name: 'Start PRO', text: 'El primer paso.' },
      { code: 'LVL.02', name: 'Expert', text: 'Digitaliza de forma constante.' },
      { code: 'LVL.03', name: 'Digital Hero', text: 'Lo más alto del ranking.' },
    ],
    alt: 'Insignia {level}, versión {row}',
  },

  pieces: {
    heading: 'Del logo a la caja de pegatinas',
    body: [
      { lead: 'Starter Pack.', text: 'La caja que recibía cada Digital Coach con todas las pegatinas para repartir entre los gestores de su zona.' },
      { lead: 'Digital Coach.', text: 'Una pegatina propia para las personas que lideraban la digitalización.' },
      { lead: 'Cartelería.', text: 'Carteles para la sala de espera que invitan al cliente a hacer sus gestiones en la app mientras espera.' },
    ] as Paragraph[],
    items: [
      { src: B + 'starter-pack.png', label: 'STARTER PACK / BOX', caption: 'Caja de pegatinas para cada Digital Coach', alt: 'Caja Starter Pack con la ilustración de la Digital Coach' },
      { src: B + 'digital-coach.png', label: 'DIGITAL COACH / STICKER', caption: 'Pegatina para los responsables de digitalización', alt: 'Pegatina de la Digital Coach junto a un móvil gigante' },
      { src: B + 'qr-poster.webp', label: 'WAITING ROOM / POSTER', caption: 'Cartel para la sala de espera (QR difuminado)', alt: 'Cartel naranja: Agilizapp tu visita mientras esperas, con un código QR difuminado' },
    ],
  },

  keys: {
    heading: 'Las reglas, en frases que se recuerdan',
    body: [
      'Para que los gestores supieran cómo sumar sin leerse un manual, convertí las reglas del programa en consignas cortas y con humor: activar la biometría, enseñar al cliente operaciones concretas en lugar de la app en abstracto o invitarle a entrar en la app en la propia oficina. Todo en una guía de una página con la misma identidad.',
    ] as Paragraph[],
  },

  impact: {
    heading: 'Qué aportó',
    facts: [
      { label: 'Reconocible', title: 'Una marca propia', text: 'La iniciativa pasó a tener nombre, imagen y un espacio en la intranet.' },
      { label: 'Visible', title: 'Reconocimiento físico', text: 'Las insignias se lucían en la oficina, no solo en un ranking.' },
      { label: 'Escalable', title: 'A través de los Digital Coaches', text: 'Un pack por coach llevaba la campaña a todas las oficinas.' },
    ],
  },

  headings: { context: 'El reto', process: 'Cómo lo abordé', keys: 'La guía' },

  next: { label: 'NEXT / JR.WORK', heading: '¿Hablamos?', contact: 'Contacto' },
};

const ENG: typeof ESP = {
  pageTitle: 'Digisfera — Case study · Juan Romero',
  back: 'JR.WORK / INDEX',
  tag: 'CASE STUDY / ING · BRANCHES',
  title: 'Digisfera: a brand to digitalise branches',
  intro:
    'ING wanted every customer who walks into a branch to leave as digital as possible. I designed Digisfera, the identity behind that initiative: logo, graphics, a space on the intranet and a sticker badge system that recognises the advisers who digitalise the most.',

  context: {
    heading: 'A business goal that needed a face',
    body: [
      'The brief came from the digitalisation team: advisers earn points for every customer they help start using the app, and a monthly ranking comes with prizes and contests. What was missing was something that made the initiative recognisable and made people want to take part.',
    ],
    facts: [
      { label: 'Points', title: 'Every customer counts', text: 'Advisers earn points for each customer they digitalise at the branch.' },
      { label: 'Monthly ranking', title: 'Prizes and contests', text: 'Every month the advisers who digitalise the most are recognised.' },
      { label: 'Digital Coaches', title: 'Who drives it', text: 'Digitalisation leads who motivate advisers and hand out the badges.' },
    ],
  },

  phases: [
    { title: 'Understand', duration: 'BRIEF', description: 'What the initiative wanted to achieve and how points were earned.' },
    { title: 'Identity', duration: 'IDENTITY', description: 'A brand of its own, consistent with the intranet and the branches.' },
    { title: 'Graphics', duration: 'GRAPHICS', description: 'Badges, characters, stickers and posters in Figma, Photoshop and Illustrator.' },
    { title: 'Review', duration: 'REVIEW', description: 'Presenting and defending the design to the digitalisation team.' },
    { title: 'Ship', duration: 'SHIP', description: 'Printing, shipping to branches and a space on the intranet.' },
  ],

  badges: {
    heading: 'Three badge levels',
    body: [
      'Points turn into visible recognition: three badge levels, each with more stars. I designed them in masculine and feminine versions so every adviser could see themselves in theirs.',
      'Hover over each sticker.',
    ],
    rows: [
      { key: 'male', label: 'SET A / MASCULINE', name: 'Masculine' },
      { key: 'female', label: 'SET B / FEMININE', name: 'Feminine' },
    ],
    levels: [
      { code: 'LVL.01', name: 'Start PRO', text: 'The first step.' },
      { code: 'LVL.02', name: 'Expert', text: 'Digitalises consistently.' },
      { code: 'LVL.03', name: 'Digital Hero', text: 'Top of the ranking.' },
    ],
    alt: '{level} badge, {row} version',
  },

  pieces: {
    heading: 'From the logo to the sticker box',
    body: [
      { lead: 'Starter Pack.', text: 'The box each Digital Coach received with all the stickers to hand out to the advisers in their area.' },
      { lead: 'Digital Coach.', text: 'A sticker of their own for the people leading digitalisation.' },
      { lead: 'Posters.', text: 'Waiting-room posters inviting customers to do their banking in the app while they wait.' },
    ],
    items: [
      { src: B + 'starter-pack.png', label: 'STARTER PACK / BOX', caption: 'Sticker box for each Digital Coach', alt: 'Starter Pack box with the Digital Coach illustration' },
      { src: B + 'digital-coach.png', label: 'DIGITAL COACH / STICKER', caption: 'Sticker for the digitalisation leads', alt: 'Digital Coach sticker next to a giant phone' },
      { src: B + 'qr-poster.webp', label: 'WAITING ROOM / POSTER', caption: 'Waiting-room poster (QR blurred)', alt: 'Orange poster inviting customers to use the ING app while they wait, with a blurred QR code' },
    ],
  },

  keys: {
    heading: 'The rules, in lines people remember',
    body: [
      'So advisers knew how to score without reading a manual, I turned the programme rules into short, playful slogans: switch on biometrics, show the customer concrete tasks instead of the app in the abstract, or invite them to open the app right there in the branch. All in a one-page guide with the same identity.',
    ],
  },

  impact: {
    heading: 'What it brought',
    facts: [
      { label: 'Recognisable', title: 'A brand of its own', text: 'The initiative got a name, a look and a space on the intranet.' },
      { label: 'Visible', title: 'Physical recognition', text: 'Badges were shown off at the branch, not just in a ranking.' },
      { label: 'Scalable', title: 'Through the Digital Coaches', text: 'One pack per coach took the campaign to every branch.' },
    ],
  },

  headings: { context: 'The challenge', process: 'How I approached it', keys: 'The guide' },

  next: { label: 'NEXT / JR.WORK', heading: 'Let’s talk', contact: 'Contact' },
};

export const DIGISFERA_CASE = { shared, ESP, ENG, badgeSrc };
