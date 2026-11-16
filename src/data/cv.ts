export type Locale = 'it' | 'en';

export type ContactLink = {
  label: string;
  value: string;
  href: string;
};

export type Service = {
  title: string;
  body: string;
  tags: string[];
};

export type ProcessStep = {
  title: string;
  body: string;
  output: string;
};

export type JourneyItem = {
  period: string;
  kind: 'education' | 'work';
  title: string;
  place?: string;
  summary: string;
  bullets: string[];
};

export type ToolGroup = {
  title: string;
  items: string[];
};

export type Fact = {
  value: string;
  label: string;
};

export type CvContent = {
  name: string;
  shortName: string;
  role: string;
  status: string;
  location: string;
  hero: {
    kicker: string;
    /** Headline split in three so the middle word can be set in the italic serif. */
    titleStart: string;
    titleEmphasis: string;
    titleEnd: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  facts: Fact[];
  lens: {
    label: string;
    hint: string;
    hintTouch: string;
    modes: { design: string; wireframe: string; code: string };
    description: string;
  };
  nav: {
    services: string;
    projects: string;
    process: string;
    journey: string;
    contact: string;
  };
  sections: {
    servicesLabel: string;
    servicesTitle: string;
    servicesBody: string;
    projectsLabel: string;
    projectsTitle: string;
    projectsBody: string;
    processLabel: string;
    processTitle: string;
    processBody: string;
    journeyLabel: string;
    journeyTitle: string;
    toolsLabel: string;
    toolsTitle: string;
    contactLabel: string;
    contactTitle: string;
    contactBody: string;
  };
  services: Service[];
  process: ProcessStep[];
  journey: JourneyItem[];
  tools: ToolGroup[];
  contacts: ContactLink[];
  projectCard: {
    open: string;
    follow: string;
    style: string;
    architecture: string;
    xray: string;
    xrayHint: string;
    groups: Record<'mine' | 'collab', { title: string; body: string }>;
  };
  caseStudy: {
    backToProjects: string;
    context: string;
    problem: string;
    solution: string;
    role: string;
    outcomes: string;
    gallery: string;
    year: string;
    category: string;
    stack: string;
    links: string;
    repository: string;
    demo: string;
    next: string;
    version: string;
    group: string;
    style: string;
    architecture: string;
    colors: string;
    typeface: string;
    stackNote: string;
  };
  palette: {
    open: string;
    placeholder: string;
    empty: string;
    groupNavigate: string;
    groupProjects: string;
    groupActions: string;
    toggleTheme: string;
    toggleLocale: string;
    copyLink: string;
    copied: string;
    hint: string;
  };
  footer: {
    builtWith: string;
    rights: string;
    backToTop: string;
  };
  meta: {
    title: string;
    description: string;
  };
};

const githubUrl = 'https://github.com/m3ttiw';

const email = 'mattiapatruno1998@gmail.com';
const linkedinUrl = 'https://www.linkedin.com/in/mattia-patruno/';

/** Only channels that actually reach Mattia are listed. */
const contacts: ContactLink[] = [
  { label: 'Email', value: email, href: `mailto:${email}` },
  { label: 'LinkedIn', value: 'in/mattia-patruno', href: linkedinUrl },
  { label: 'GitHub', value: 'github.com/m3ttiw', href: githubUrl },
];

export const githubProfile = githubUrl;
export const linkedinProfile = linkedinUrl;
export const emailAddress = email;

export const cvContent: Record<Locale, CvContent> = {
  it: {
    name: 'Mattia Patruno',
    shortName: 'MP',
    role: 'UI/UX Designer & Front-end Developer',
    status: 'Disponibile per nuovi progetti',
    location: 'Italia · remoto',
    hero: {
      kicker: 'UI/UX Design · Front-end · AI',
      titleStart: 'Interfacce',
      titleEmphasis: 'chiare',
      titleEnd: 'per web app complesse.',
      lead:
        'Progetto e sviluppo web app che le persone capiscono al primo colpo. Mi sto laureando in Intelligenza Artificiale e uso l’AI per automatizzare i processi che rallentano i team.',
      ctaPrimary: 'Guarda i progetti',
      ctaSecondary: 'Contattami',
    },
    facts: [
      { value: '2019', label: 'sul web dal' },
      { value: '3', label: 'discipline, un solo flusso' },
      { value: 'AI', label: 'laurea in corso' },
    ],
    lens: {
      label: 'Anteprima interattiva di un’interfaccia',
      hint: 'Passa il cursore sull’interfaccia per vedere il wireframe',
      hintTouch: 'Tieni premuto sull’interfaccia per vedere il wireframe',
      modes: { design: 'Design', wireframe: 'Wireframe', code: 'Codice' },
      description:
        'Una web app di automazione mostrata in tre livelli: interfaccia finita, wireframe e codice del componente.',
    },
    nav: {
      services: 'Servizi',
      projects: 'Progetti',
      process: 'Metodo',
      journey: 'Percorso',
      contact: 'Contatti',
    },
    sections: {
      servicesLabel: 'Cosa faccio',
      servicesTitle: 'Dal problema all’interfaccia, fino al codice.',
      servicesBody:
        'Tengo insieme tre competenze che di solito vivono in team diversi: così il design non si perde nel passaggio allo sviluppo.',
      projectsLabel: 'Progetti selezionati',
      projectsTitle: 'Lavori che puoi aprire ed esplorare.',
      projectsBody: 'Per ogni progetto: schermate desktop e mobile, stile grafico e architettura. Passa sull’anteprima, o tocca “Architettura”, per vedere le tecnologie.',
      processLabel: 'Metodo',
      processTitle: 'Come lavoro, passo dopo passo.',
      processBody: 'Un processo leggero, che si adatta al progetto ma non salta mai la parte in cui si ascolta.',
      journeyLabel: 'Percorso',
      journeyTitle: 'Formazione ed esperienza.',
      toolsLabel: 'Strumenti',
      toolsTitle: 'La cassetta degli attrezzi.',
      contactLabel: 'Contatti',
      contactTitle: 'Hai una web app da migliorare?',
      contactBody:
        'Raccontami il prodotto, chi lo usa e dove si inceppa. Ti rispondo con un primo passo concreto: un flusso da semplificare, un’interfaccia da ripensare o un processo da automatizzare.',
    },
    services: [
      {
        title: 'UI/UX Design',
        body: 'Dalla ricerca al prototipo: flussi, wireframe e design system per interfacce che si usano ogni giorno senza fatica.',
        tags: ['User flow', 'Wireframe', 'Prototipi', 'Design system', 'Accessibilità'],
      },
      {
        title: 'Front-end per web app',
        body: 'Traduco il design in componenti solidi, accessibili e veloci, pronti a crescere insieme al prodotto.',
        tags: ['Angular', 'TypeScript', 'HTML & CSS', 'Astro', 'Responsive'],
      },
      {
        title: 'AI & automazione',
        body: 'Uso strumenti di intelligenza artificiale per automatizzare i processi ripetitivi: meno passaggi manuali, più tempo per il lavoro che conta.',
        tags: ['LLM', 'Agenti AI', 'Workflow automation', 'Python', 'Prompt design'],
      },
    ],
    process: [
      {
        title: 'Capire',
        body: 'Parto da chi usa il prodotto e da cosa deve ottenere. Mappo i flussi esistenti e trovo i punti in cui le persone si bloccano.',
        output: 'Obiettivi, user flow, punti di attrito',
      },
      {
        title: 'Progettare',
        body: 'Wireframe a bassa fedeltà per decidere in fretta, poi prototipi e un sistema di componenti coerente per tutta l’app.',
        output: 'Wireframe, prototipo, design system',
      },
      {
        title: 'Sviluppare',
        body: 'Porto il design in codice senza perdere dettagli: componenti accessibili, stati vuoti e di errore, performance sotto controllo.',
        output: 'Componenti front-end pronti per la produzione',
      },
      {
        title: 'Automatizzare',
        body: 'Dove un processo si ripete, lo affido a un flusso AI e misuro il risultato. L’automazione serve le persone, non le sostituisce.',
        output: 'Flussi AI, meno lavoro manuale',
      },
    ],
    journey: [
      {
        period: 'In corso',
        kind: 'education',
        title: 'Laurea in Intelligenza Artificiale',
        summary:
          'Machine learning, deep learning e computer vision, con un’attenzione costante a come l’AI può rendere i prodotti digitali più utili.',
        bullets: [],
      },
      {
        period: '2021 — oggi',
        kind: 'work',
        title: 'Software Engineer',
        summary:
          'Web app e piattaforme: interfacce Angular, ricerca e automazione dei processi di rilascio.',
        bullets: [
          'Ricerca e matching delle competenze su migliaia di risorse, dall’indice all’interfaccia.',
          'Pipeline di rilascio e monitoraggio più affidabili, con meno passaggi manuali.',
        ],
      },
      {
        period: '2019 — 2021',
        kind: 'work',
        title: 'Full-stack Developer',
        summary: 'Feature end-to-end con attenzione a performance ed esperienza utente.',
        bullets: [],
      },
    ],
    tools: [
      { title: 'Design', items: ['Figma', 'Prototipazione', 'Design system', 'User research', 'Accessibilità'] },
      { title: 'Front-end', items: ['Angular', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Astro', 'NestJS'] },
      { title: 'AI & automazione', items: ['LLM', 'Agenti AI', 'Workflow automation', 'Python', 'PyTorch', 'Computer vision'] },
      { title: 'Delivery', items: ['Git', 'Docker', 'CI/CD', 'Elasticsearch'] },
    ],
    contacts,
    projectCard: {
      open: 'Apri il case study',
      follow: 'Segui i lavori su GitHub',
      style: 'Stile',
      architecture: 'Architettura',
      xray: 'Architettura',
      xrayHint: 'Mostra o nascondi lo schema dell’architettura',
      groups: {
        mine: { title: 'Progetti personali', body: 'Progettati e sviluppati da me, dall’idea al rilascio.' },
        collab: { title: 'In collaborazione', body: 'Prodotti di team a cui contribuisco.' },
      },
    },
    caseStudy: {
      backToProjects: 'Tutti i progetti',
      context: 'Contesto',
      problem: 'Problema',
      solution: 'Soluzione',
      role: 'Il mio ruolo',
      outcomes: 'Risultati',
      gallery: 'Galleria',
      year: 'Anno',
      category: 'Categoria',
      stack: 'Stack',
      links: 'Link',
      repository: 'Repository',
      demo: 'Demo',
      next: 'Progetto successivo',
      version: 'Versione',
      group: 'Tipo',
      style: 'Stile grafico',
      architecture: 'Architettura',
      colors: 'Colori',
      typeface: 'Carattere',
      stackNote: 'I pezzi principali dello stack: un insieme, non una sequenza.',
    },
    palette: {
      open: 'Apri il menu dei comandi',
      placeholder: 'Cerca una sezione, un progetto o un’azione…',
      empty: 'Nessun risultato.',
      groupNavigate: 'Vai a',
      groupProjects: 'Progetti',
      groupActions: 'Azioni',
      toggleTheme: 'Cambia tema chiaro/scuro',
      toggleLocale: 'Switch to English',
      copyLink: 'Copia il link del sito',
      copied: 'Link copiato',
      hint: '↑↓ per scegliere · Invio per aprire · Esc per chiudere',
    },
    footer: {
      builtWith: 'Progettato e sviluppato da Mattia con Astro.',
      rights: 'Tutti i diritti riservati',
      backToTop: 'Torna su',
    },
    meta: {
      title: 'Mattia Patruno — UI/UX Designer & Front-end Developer',
      description:
        'Portfolio di Mattia Patruno: UI/UX design e sviluppo front-end per web app, intelligenza artificiale e automazione dei processi.',
    },
  },
  en: {
    name: 'Mattia Patruno',
    shortName: 'MP',
    role: 'UI/UX Designer & Front-end Developer',
    status: 'Available for new projects',
    location: 'Italy · remote',
    hero: {
      kicker: 'UI/UX Design · Front-end · AI',
      titleStart: 'Clear',
      titleEmphasis: 'interfaces',
      titleEnd: 'for complex web apps.',
      lead:
        'I design and build web apps people understand at first glance. I’m finishing a degree in Artificial Intelligence and use AI to automate the processes that slow teams down.',
      ctaPrimary: 'See the projects',
      ctaSecondary: 'Get in touch',
    },
    facts: [
      { value: '2019', label: 'building for the web since' },
      { value: '3', label: 'disciplines, one workflow' },
      { value: 'AI', label: 'degree in progress' },
    ],
    lens: {
      label: 'Interactive preview of an interface',
      hint: 'Hover the interface to see the wireframe underneath',
      hintTouch: 'Press and hold the interface to see the wireframe',
      modes: { design: 'Design', wireframe: 'Wireframe', code: 'Code' },
      description:
        'An automation web app shown in three layers: the finished interface, the wireframe and the component code.',
    },
    nav: {
      services: 'Services',
      projects: 'Projects',
      process: 'Process',
      journey: 'Journey',
      contact: 'Contact',
    },
    sections: {
      servicesLabel: 'What I do',
      servicesTitle: 'From the problem to the interface, all the way to code.',
      servicesBody:
        'I combine three skills that usually live in separate teams, so the design doesn’t get lost on its way to development.',
      projectsLabel: 'Selected work',
      projectsTitle: 'Work you can open and explore.',
      projectsBody: 'For each project: desktop and mobile screens, visual style and architecture. Hover the preview, or tap “Architecture”, to see the tech behind it.',
      processLabel: 'Process',
      processTitle: 'How I work, step by step.',
      processBody: 'A lightweight process that adapts to the project but never skips the listening part.',
      journeyLabel: 'Journey',
      journeyTitle: 'Education and experience.',
      toolsLabel: 'Toolkit',
      toolsTitle: 'What’s in the toolbox.',
      contactLabel: 'Contact',
      contactTitle: 'Got a web app that could work better?',
      contactBody:
        'Tell me about the product, who uses it and where it gets stuck. You’ll get a concrete first step back: a flow to simplify, an interface to rethink or a process to automate.',
    },
    services: [
      {
        title: 'UI/UX Design',
        body: 'From research to prototype: flows, wireframes and design systems for interfaces people use every day without friction.',
        tags: ['User flows', 'Wireframes', 'Prototypes', 'Design systems', 'Accessibility'],
      },
      {
        title: 'Front-end for web apps',
        body: 'I turn designs into solid, accessible and fast components, ready to grow with the product.',
        tags: ['Angular', 'TypeScript', 'HTML & CSS', 'Astro', 'Responsive'],
      },
      {
        title: 'AI & automation',
        body: 'I use artificial intelligence tools to automate repetitive processes: fewer manual steps, more time for the work that matters.',
        tags: ['LLMs', 'AI agents', 'Workflow automation', 'Python', 'Prompt design'],
      },
    ],
    process: [
      {
        title: 'Understand',
        body: 'I start from the people using the product and what they need to get done. I map the current flows and find where people get stuck.',
        output: 'Goals, user flows, friction points',
      },
      {
        title: 'Design',
        body: 'Low-fidelity wireframes to decide quickly, then prototypes and a consistent component system for the whole app.',
        output: 'Wireframes, prototype, design system',
      },
      {
        title: 'Build',
        body: 'I bring the design into code without losing detail: accessible components, empty and error states, performance in check.',
        output: 'Production-ready front-end components',
      },
      {
        title: 'Automate',
        body: 'Where a process repeats, I hand it to an AI workflow and measure the result. Automation serves people, it doesn’t replace them.',
        output: 'AI workflows, less manual work',
      },
    ],
    journey: [
      {
        period: 'In progress',
        kind: 'education',
        title: 'Degree in Artificial Intelligence',
        summary:
          'Machine learning, deep learning and computer vision, always with an eye on how AI can make digital products more useful.',
        bullets: [],
      },
      {
        period: '2021 — now',
        kind: 'work',
        title: 'Software Engineer',
        summary: 'Web apps and platforms: Angular interfaces, search and release process automation.',
        bullets: [
          'Skill search and matching across thousands of resources, from the index to the interface.',
          'More reliable release pipelines and monitoring, with fewer manual steps.',
        ],
      },
      {
        period: '2019 — 2021',
        kind: 'work',
        title: 'Full-stack Developer',
        summary: 'End-to-end features with a focus on performance and user experience.',
        bullets: [],
      },
    ],
    tools: [
      { title: 'Design', items: ['Figma', 'Prototyping', 'Design systems', 'User research', 'Accessibility'] },
      { title: 'Front-end', items: ['Angular', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Astro', 'NestJS'] },
      { title: 'AI & automation', items: ['LLMs', 'AI agents', 'Workflow automation', 'Python', 'PyTorch', 'Computer vision'] },
      { title: 'Delivery', items: ['Git', 'Docker', 'CI/CD', 'Elasticsearch'] },
    ],
    contacts,
    projectCard: {
      open: 'Open the case study',
      follow: 'Follow the work on GitHub',
      style: 'Style',
      architecture: 'Architecture',
      xray: 'Architecture',
      xrayHint: 'Show or hide the architecture diagram',
      groups: {
        mine: { title: 'Solo projects', body: 'Designed and built by me, from idea to release.' },
        collab: { title: 'Collaborations', body: 'Team products I contribute to.' },
      },
    },
    caseStudy: {
      backToProjects: 'All projects',
      context: 'Context',
      problem: 'Problem',
      solution: 'Solution',
      role: 'My role',
      outcomes: 'Outcomes',
      gallery: 'Gallery',
      year: 'Year',
      category: 'Category',
      stack: 'Stack',
      links: 'Links',
      repository: 'Repository',
      demo: 'Demo',
      next: 'Next project',
      version: 'Version',
      group: 'Type',
      style: 'Visual style',
      architecture: 'Architecture',
      colors: 'Colours',
      typeface: 'Typeface',
      stackNote: 'The main pieces of the stack: a set, not a sequence.',
    },
    palette: {
      open: 'Open the command menu',
      placeholder: 'Search a section, a project or an action…',
      empty: 'No results.',
      groupNavigate: 'Go to',
      groupProjects: 'Projects',
      groupActions: 'Actions',
      toggleTheme: 'Toggle light/dark theme',
      toggleLocale: 'Passa all’italiano',
      copyLink: 'Copy the site link',
      copied: 'Link copied',
      hint: '↑↓ to choose · Enter to open · Esc to close',
    },
    footer: {
      builtWith: 'Designed and built by Mattia with Astro.',
      rights: 'All rights reserved',
      backToTop: 'Back to top',
    },
    meta: {
      title: 'Mattia Patruno — UI/UX Designer & Front-end Developer',
      description:
        'Portfolio of Mattia Patruno: UI/UX design and front-end development for web apps, artificial intelligence and process automation.',
    },
  },
};

export const locales: Locale[] = ['it', 'en'];
