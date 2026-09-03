export type Locale = 'it' | 'en';

export type ExperienceItem = {
  period: string;
  role: string;
  summary: string;
  bullets: string[];
};

export type ProjectItem = {
  number: string;
  title: string;
  stack: string[];
  description: string;
  url?: string;
  urlLabel?: string;
};

export type ContactData = {
  email: string;
  linkedin: string;
  github: string;
};

export type WorkingPrinciple = {
  number: string;
  title: string;
  body: string;
};

export type CvContent = {
  name: string;
  shortName: string;
  role: string;
  eyebrow: string;
  intro: string;
  availability: string;
  location: string;
  focus: string;
  ctaPrimary: string;
  ctaSecondary: string;
  scrollCue: string;
  scrollCueAria: string;
  nav: {
    profile: string;
    experience: string;
    projects: string;
    contact: string;
  };
  sections: {
    profileLabel: string;
    profileTitle: string;
    proofLabel: string;
    experienceLabel: string;
    experienceTitle: string;
    projectsLabel: string;
    projectsTitle: string;
    principlesLabel: string;
    principlesTitle: string;
    contactLabel: string;
    contactTitle: string;
    contactBody: string;
  };
  skills: string[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  principles: WorkingPrinciple[];
  contacts: ContactData;
  meta: {
    title: string;
    description: string;
  };
};

const contact: ContactData = {
  email: '',
  linkedin: '',
  github: '',
};

export const cvContent: Record<Locale, CvContent> = {
  it: {
    name: 'Mattia Patruno',
    shortName: 'MP',
    role: 'Software Engineer · DevOps · AI Engineering',
    eyebrow: 'Programmatore / builder',
    intro:
      'Progetto, sviluppo e porto in produzione soluzioni scalabili. Mi muovo tra software engineering, DevOps e AI applicata, con attenzione a MLOps e data pipeline.',
    availability: 'Disponibile per nuove opportunità',
    location: 'Italia · remoto',
    focus: 'Software, piattaforme e automazione',
    ctaPrimary: 'Parliamone',
    ctaSecondary: 'Vedi il lavoro',
    scrollCue: 'Scorri',
    scrollCueAria: 'Vai al profilo',
    nav: {
      profile: 'Profilo',
      experience: 'Esperienza',
      projects: 'Progetti',
      contact: 'Contatti',
    },
    sections: {
      profileLabel: '01 / profilo',
      profileTitle: 'Codice che arriva fino in produzione.',
      proofLabel: '02 / stack',
      experienceLabel: '03 / esperienza',
      experienceTitle: 'Dal problema al deploy.',
      projectsLabel: '04 / progetti',
      projectsTitle: 'Cose che ho costruito.',
      principlesLabel: '05 / metodo',
      principlesTitle: 'Come lavoro.',
      contactLabel: '06 / contatti',
      contactTitle: 'Hai qualcosa da spedire?',
      contactBody:
        'Raccontami il problema, il contesto e cosa deve succedere dopo. Insieme troviamo il prossimo passo concreto.',
    },
    skills: [
      'Angular',
      'Java',
      'Python',
      'Docker',
      'Elasticsearch',
      'MLOps',
      'CI/CD',
      'Data pipelines',
      'PyTorch',
    ],
    experience: [
      {
        period: '2021 — oggi',
        role: 'Software / DevOps Engineer',
        summary: 'Progetti web e data/MLOps. CI/CD, container, IaC e monitoraggio.',
        bullets: [
          'Integrazione Elasticsearch per skill matching su migliaia di risorse.',
          'Hardening delle pipeline di deploy e dell’osservabilità.',
        ],
      },
      {
        period: '2019 — 2021',
        role: 'Full-stack Developer',
        summary: 'Feature end-to-end, performance e attenzione all’esperienza utente.',
        bullets: [],
      },
    ],
    projects: [
      {
        number: '01',
        title: 'Skill Platform',
        stack: ['Angular', 'NestJS', 'Elasticsearch', 'Docker'],
        description:
          'Piattaforma per gestire competenze, suggerire risorse e progetti e rendere leggibili gli insight del team.',
      },
      {
        number: '02',
        title: 'CV Vision — GAN Style Transfer',
        stack: ['PyTorch', 'GAN', 'Segmentation'],
        description:
          'Pipeline batch per trasferimento selettivo dello stile su immagini, con output visuale e GIF.',
      },
    ],
    principles: [
      {
        number: '01',
        title: 'Capisco il sistema intero',
        body: 'Dal requisito alla pipeline: individuo i punti di attrito prima di aggiungere complessità.',
      },
      {
        number: '02',
        title: 'Rendo il deploy ripetibile',
        body: 'Container, CI/CD e osservabilità servono a consegnare con meno sorprese.',
      },
      {
        number: '03',
        title: 'Tengo il risultato leggibile',
        body: 'Il codice deve funzionare oggi e lasciare abbastanza contesto per chi lo manterrà domani.',
      },
    ],
    contacts: contact,
    meta: {
      title: 'Mattia Patruno — Software Engineer',
      description:
        'CV e portfolio di Mattia Patruno: software engineering, DevOps, AI engineering e data pipelines.',
    },
  },
  en: {
    name: 'Mattia Patruno',
    shortName: 'MP',
    role: 'Software Engineer · DevOps · AI Engineering',
    eyebrow: 'Engineer / builder',
    intro:
      'I design, build and ship scalable solutions. I work across software engineering, DevOps and applied AI, with a focus on MLOps and data pipelines.',
    availability: 'Available for new opportunities',
    location: 'Italy · remote',
    focus: 'Software, platforms and automation',
    ctaPrimary: 'Let’s talk',
    ctaSecondary: 'See the work',
    scrollCue: 'Scroll',
    scrollCueAria: 'Go to profile',
    nav: {
      profile: 'Profile',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
    },
    sections: {
      profileLabel: '01 / profile',
      profileTitle: 'Code that reaches production.',
      proofLabel: '02 / stack',
      experienceLabel: '03 / experience',
      experienceTitle: 'From problem to deploy.',
      projectsLabel: '04 / projects',
      projectsTitle: 'Things I have built.',
      principlesLabel: '05 / method',
      principlesTitle: 'How I work.',
      contactLabel: '06 / contact',
      contactTitle: 'Have something to ship?',
      contactBody:
        'Tell me the problem, the context and what should happen next. Together we can find the next concrete step.',
    },
    skills: [
      'Angular',
      'Java',
      'Python',
      'Docker',
      'Elasticsearch',
      'MLOps',
      'CI/CD',
      'Data pipelines',
      'PyTorch',
    ],
    experience: [
      {
        period: '2021 — now',
        role: 'Software / DevOps Engineer',
        summary: 'Web and data/MLOps projects. CI/CD, containers, IaC and monitoring.',
        bullets: [
          'Integrated Elasticsearch for skill matching across thousands of resources.',
          'Hardened deployment pipelines and observability.',
        ],
      },
      {
        period: '2019 — 2021',
        role: 'Full-stack Developer',
        summary: 'End-to-end features, performance and user experience.',
        bullets: [],
      },
    ],
    projects: [
      {
        number: '01',
        title: 'Skill Platform',
        stack: ['Angular', 'NestJS', 'Elasticsearch', 'Docker'],
        description:
          'A platform for managing skills, suggesting resources and projects, and making team insights readable.',
      },
      {
        number: '02',
        title: 'CV Vision — GAN Style Transfer',
        stack: ['PyTorch', 'GAN', 'Segmentation'],
        description:
          'A batch pipeline for selective image style transfer, with visual and GIF output.',
      },
    ],
    principles: [
      {
        number: '01',
        title: 'I understand the whole system',
        body: 'From requirements to pipeline: I find the friction points before adding complexity.',
      },
      {
        number: '02',
        title: 'I make shipping repeatable',
        body: 'Containers, CI/CD and observability help deliver with fewer surprises.',
      },
      {
        number: '03',
        title: 'I keep the result readable',
        body: 'Code should work today and leave enough context for whoever maintains it tomorrow.',
      },
    ],
    contacts: contact,
    meta: {
      title: 'Mattia Patruno — Software Engineer',
      description:
        'CV and portfolio of Mattia Patruno: software engineering, DevOps, AI engineering and data pipelines.',
    },
  },
};

export const locales: Locale[] = ['it', 'en'];
