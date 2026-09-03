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

export type CvContent = {
  name: string;
  shortName: string;
  role: string;
  intro: string;
  availability: string;
  location: string;
  focus: string;
  scrollCue: string;
  scrollCueAria: string;
  nav: {
    projects: string;
    experience: string;
    contact: string;
  };
  experience: ExperienceItem[];
  projects: ProjectItem[];
  contacts: ContactData;
  meta: {
    title: string;
    description: string;
  };
};

const contact: ContactData = {
  email: 'mattiapatruno1998@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mattia-patruno/',
  github: 'https://github.com/m3ttiw',
};

export const cvContent: Record<Locale, CvContent> = {
  it: {
    name: 'Mattia Patruno',
    shortName: 'MP',
    role: 'Software Engineer · DevOps · AI Engineering',
    intro:
      'Progetto, sviluppo e porto in produzione soluzioni scalabili. Mi muovo tra software engineering, DevOps e AI applicata, con attenzione a MLOps e data pipeline.',
    availability: 'Disponibile per nuove opportunità',
    location: 'Italia · remoto',
    focus: 'Software, piattaforme e automazione',
    scrollCue: 'Scorri',
    scrollCueAria: 'Vai ai progetti',
    nav: {
      projects: 'Progetti',
      experience: 'Esperienza',
      contact: 'Contatti',
    },
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
    intro:
      'I design, build and ship scalable solutions. I work across software engineering, DevOps and applied AI, with a focus on MLOps and data pipelines.',
    availability: 'Available for new opportunities',
    location: 'Italy · remote',
    focus: 'Software, platforms and automation',
    scrollCue: 'Scroll',
    scrollCueAria: 'Go to projects',
    nav: {
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
    },
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
    contacts: contact,
    meta: {
      title: 'Mattia Patruno — Software Engineer',
      description:
        'CV and portfolio of Mattia Patruno: software engineering, DevOps, AI engineering and data pipelines.',
    },
  },
};

export const locales: Locale[] = ['it', 'en'];
