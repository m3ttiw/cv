import type { Locale } from './cv';
import { githubProfile, locales } from './cv';
import { projectArt } from './project-art';
import { techIcons } from './tech-icons';

export type Localized = Record<Locale, string>;

/** Same text in both languages (names, versions, tech that is not translated). */
const same = (text: string): Localized => ({ it: text, en: text });

/**
 * Only `title` and `summary` are required per locale: every other block is optional and
 * simply disappears from the case study when it is not written yet.
 */
export type ProjectContent = {
  title: string;
  summary: string;
  context?: string;
  problem?: string;
  solution?: string;
  role?: string;
  outcomes?: string[];
};

/** 'mine': apps I design and build on my own. 'collab': team products I contribute to. */
export type ProjectGroup = 'mine' | 'collab';

/** One piece of the stack, drawn as a logo tile in the architecture blueprint. */
export type TechNode = {
  tech: Localized;
  role: Localized;
  /** Key of `techIcons`. */
  icon: string;
};

export type Project = {
  slug: string;
  group: ProjectGroup;
  /** "Coming soon" card: no case study, links to `href` instead. */
  placeholder?: boolean;
  href?: string;
  /** Current release, without patch (vX.Y). */
  version: Localized;
  /** Owner and kind of product, shown under the name. */
  category: Localized;
  /** Technologies shown as chips. */
  stack: string[];
  /** Status chips used by the placeholder instead of the stack. */
  status?: Localized[];
  style: {
    label: Localized;
    detail: Localized;
    colors: string[];
    /** CSS font-family of the reference typeface, used for the "Aa" sample. */
    font?: string;
  };
  architecture: {
    label: Localized;
    detail: Localized;
    /** Main pieces of the stack: a set, not a pipeline (no order or dependency implied). */
    nodes: TechNode[];
  };
  content: Record<Locale, ProjectContent>;
};

const role = {
  ui: { it: 'Interfaccia', en: 'Interface' },
  auth: same('Auth'),
  api: same('API'),
  db: same('Database'),
  job: { it: 'Job', en: 'Jobs' },
  data: { it: 'Dati', en: 'Data' },
} satisfies Record<string, Localized>;

const text = (it: string, en: string): Localized => ({ it, en });
/** `title` is a product name (same in both languages) or a localized label. */
const content = (title: string | Localized, it: string, en: string): Record<Locale, ProjectContent> => {
  const name = typeof title === 'string' ? { it: title, en: title } : title;
  return {
    it: { title: name.it, summary: it },
    en: { title: name.en, summary: en },
  };
};

export const projects: Project[] = [
  // ---------------------------------------------------------------- my apps
  {
    slug: 'cedolino',
    group: 'mine',
    version: same('v1.6'),
    category: text('App personale · Buste paga', 'Personal app · Payslips'),
    stack: ['React', 'Cloudflare Workers', 'Cloudflare D1', 'PWA'],
    style: {
      label: same('Neo-brutalism'),
      detail: text('Space Grotesk, giallo, bordi neri 3px', 'Space Grotesk, yellow, 3px black borders'),
      colors: ['#ffd93b', '#111111', '#ffffff'],
      font: "'Space Grotesk', sans-serif",
    },
    architecture: {
      label: same('Serverless edge + MCP'),
      detail: text('React, Worker, D1 e cron', 'React, Worker, D1 and cron'),
      nodes: [
        { role: role.ui, tech: same('React PWA'), icon: 'react' },
        { role: role.auth, tech: same('Passkey'), icon: 'webauthn' },
        { role: role.api, tech: same('Worker + MCP'), icon: 'cloudflareworkers' },
        { role: role.db, tech: same('Cloudflare D1'), icon: 'db-f38020' },
        { role: role.job, tech: text('Cron settimanale', 'Weekly cron'), icon: 'clock-f38020' },
      ],
    },
    content: content(
      'Cedolino',
      'Archivia le buste paga, prevede il netto del mese successivo e mostra dove finisce il lordo, voce per voce.',
      'Archives payslips, forecasts next month’s net pay and shows where the gross goes, item by item.',
    ),
  },
  {
    slug: 'heimdall',
    group: 'mine',
    version: same('v0.56'),
    category: text('App personale · Workspace DevOps', 'Personal app · DevOps workspace'),
    stack: ['Angular', 'Fastify', 'Azure DevOps', 'ECharts'],
    style: {
      label: text('Dashboard minimal', 'Minimal dashboard'),
      detail: text('Inter, arancio e azzurro', 'Inter, orange and sky blue'),
      colors: ['#c2410c', '#0284c7', '#f8fafc'],
      font: "'Inter', sans-serif",
    },
    architecture: {
      label: text('BFF + SPA in monorepo', 'BFF + SPA in a monorepo'),
      detail: text('Angular, BFF Fastify, Azure SQL', 'Angular, Fastify BFF, Azure SQL'),
      nodes: [
        { role: role.ui, tech: same('Angular'), icon: 'angular' },
        { role: role.auth, tech: same('Entra ID'), icon: 'lock-0078d4' },
        { role: same('BFF'), tech: same('Fastify'), icon: 'fastify' },
        { role: text('Integrazione', 'Integration'), tech: same('Azure DevOps'), icon: 'devops' },
        { role: role.db, tech: same('Azure SQL'), icon: 'db-0078d4' },
      ],
    },
    content: content(
      'Heimdall',
      'Lo spazio di lavoro del team sopra Azure DevOps: board, pull request, pipeline e promemoria in una sola vista, con il riepilogo delle ultime 24 ore.',
      'The team’s workspace on top of Azure DevOps: boards, pull requests, pipelines and reminders in one view, with a recap of the last 24 hours.',
    ),
  },
  {
    slug: 'taglieroteca',
    group: 'mine',
    version: same('v0.3'),
    category: text('App personale · Gestione del locale', 'Personal app · Venue management'),
    stack: ['React', 'Cloudflare Pages', 'Cloudflare D1'],
    style: {
      label: text('Neo-brutalism leggero', 'Light neo-brutalism'),
      detail: text('Instrument Serif, vinaccia e legno', 'Instrument Serif, wine red and wood'),
      colors: ['#6e292d', '#b07a4f', '#fffdf8'],
      font: "'Instrument Serif', serif",
    },
    architecture: {
      label: text('Sito statico + Functions', 'Static site + Functions'),
      detail: text('Pages Functions e D1, con Access', 'Pages Functions and D1, behind Access'),
      nodes: [
        { role: role.ui, tech: same('React'), icon: 'react' },
        { role: role.auth, tech: same('Cloudflare Access'), icon: 'cloudflare' },
        { role: role.api, tech: same('Pages Functions'), icon: 'cloudflarepages' },
        { role: role.db, tech: same('Cloudflare D1'), icon: 'db-f38020' },
      ],
    },
    content: content(
      'Taglieroteca Management',
      'Il gestionale di un locale: prenotazioni, eventi, menù, turni e paghe del personale in un’unica app pensata per chi lavora in sala.',
      'Management app for a venue: bookings, events, menu, shifts and staff pay in one app designed for the people working the floor.',
    ),
  },
  {
    slug: 'ide-lite',
    group: 'mine',
    version: same('v0.5'),
    category: text('App personale · Open source, MIT', 'Personal app · Open source, MIT'),
    stack: ['Tauri 2', 'Rust', 'SolidJS', 'CodeMirror 6'],
    style: {
      label: same('Dark IDE'),
      detail: text('Inter e JetBrains Mono, ambra su grafite', 'Inter and JetBrains Mono, amber on graphite'),
      colors: ['#17191c', '#e8b04a', '#e6e6e6'],
      font: "'JetBrains Mono', monospace",
    },
    architecture: {
      label: text('App desktop con core Rust', 'Desktop app with a Rust core'),
      detail: text('SolidJS su Tauri, core Rust', 'SolidJS on Tauri, Rust core'),
      nodes: [
        { role: role.ui, tech: same('SolidJS'), icon: 'solid' },
        { role: same('Editor'), tech: same('CodeMirror 6'), icon: 'codemirror' },
        { role: same('IPC'), tech: same('Tauri 2'), icon: 'tauri' },
        { role: same('Core'), tech: same('Rust'), icon: 'rust' },
        { role: role.data, tech: text('git e disco', 'git and disk'), icon: 'git' },
      ],
    },
    content: content(
      'IDE-lite',
      'Un editor desktop leggero: albero dei file, schede, grafo git e scorciatoie in stile Emacs, in un binario piccolo e veloce.',
      'A lightweight desktop editor: file tree, tabs, git graph and Emacs-style shortcuts in a small, fast binary.',
    ),
  },
  {
    slug: 'lavori-in-corso',
    group: 'mine',
    placeholder: true,
    href: githubProfile,
    version: text('in arrivo', 'coming soon'),
    category: text('Prossime app · In sviluppo', 'Next apps · In development'),
    stack: [],
    status: [text('In progettazione', 'In design'), text('Prototipo', 'Prototype'), text('Presto online', 'Online soon')],
    style: {
      label: text('Da definire', 'To be defined'),
      detail: text('parte da wireframe e prototipo', 'starts from wireframe and prototype'),
      colors: [],
    },
    architecture: {
      label: text('Da definire', 'To be defined'),
      detail: text('si sceglie progetto per progetto', 'chosen project by project'),
      nodes: [
        { role: role.ui, tech: text('Da scegliere', 'To be chosen'), icon: 'unknown' },
        { role: role.api, tech: text('Da scegliere', 'To be chosen'), icon: 'unknown' },
        { role: role.data, tech: text('Da scegliere', 'To be chosen'), icon: 'unknown' },
      ],
    },
    content: content(
      text('Lavori in corso', 'Work in progress'),
      'Lo spazio per le prossime app: idee in progettazione, prototipi e strumenti che arrivano qui appena sono pronti.',
      'Room for the next apps: ideas being designed, prototypes and tools that land here as soon as they are ready.',
    ),
  },

  // ---------------------------------------------------------------- collaborations
  {
    slug: 'themis',
    group: 'collab',
    version: same('v1.1'),
    category: text('Revoltech · Piattaforma B2B', 'Revoltech · B2B platform'),
    stack: ['Angular', '.NET', 'Keycloak', 'Azure Functions'],
    style: {
      label: text('Corporate morbido', 'Soft corporate'),
      detail: text('Nunito, verde e azzurro, raggi 8px', 'Nunito, green and sky blue, 8px radii'),
      colors: ['#29754f', '#3db3e8', '#f1f5f9'],
      font: "'Nunito', sans-serif",
    },
    architecture: {
      label: text('Monolite + Functions', 'Monolith + Functions'),
      detail: text('API .NET, worker e Functions', '.NET API, workers and Functions'),
      nodes: [
        { role: role.ui, tech: same('Angular + NgRx'), icon: 'angular' },
        { role: role.auth, tech: same('Keycloak'), icon: 'keycloak' },
        { role: role.api, tech: same('ASP.NET Core'), icon: 'dotnet' },
        { role: role.job, tech: same('Functions + Hangfire'), icon: 'functions' },
        { role: role.db, tech: same('SQL Server'), icon: 'db-cc2927' },
      ],
    },
    content: content(
      'Ecosistema Themis',
      'Piattaforma B2B per una rete di punti vendita: contratti, back office, obiettivi, ticket, formazione e risorse umane in un unico ecosistema.',
      'B2B platform for a network of stores: contracts, back office, goals, tickets, training and HR in a single ecosystem.',
    ),
  },
  {
    slug: 'prometheus',
    group: 'collab',
    version: same('v1.1'),
    category: text('Revoltech · Assistente AI', 'Revoltech · AI assistant'),
    stack: ['Angular', '.NET', 'Microsoft Foundry', 'AI agents'],
    style: {
      label: text('Mascotte e alone soft', 'Mascot and soft glow'),
      detail: text('Nunito, smeraldo, alone radiale', 'Nunito, emerald, radial glow'),
      colors: ['#10b981', '#a7f3d0', '#ecfdf5'],
      font: "'Nunito', sans-serif",
    },
    architecture: {
      label: text('Agente Foundry + tool .NET', 'Foundry agent + .NET tools'),
      detail: text('chat Angular, API SSE, Foundry', 'Angular chat, SSE API, Foundry'),
      nodes: [
        { role: role.ui, tech: same('Angular'), icon: 'angular' },
        { role: role.api, tech: same('ASP.NET Core SSE'), icon: 'dotnet' },
        { role: text('Modelli AI', 'AI models'), tech: same('Microsoft Foundry'), icon: 'ai' },
        { role: text('Tool e dati', 'Tools & data'), tech: same('SQL Server'), icon: 'db-cc2927' },
      ],
    },
    content: content(
      'Prometheus',
      'L’assistente AI della piattaforma: prepara il piano della giornata, risponde sui dati operativi e propone le azioni successive con agenti collegati agli strumenti.',
      'The platform’s AI assistant: it plans the day, answers questions on operational data and suggests next steps through agents connected to the tools.',
    ),
  },
  {
    slug: 'theia-ui',
    group: 'collab',
    version: same('v0.3'),
    category: text('Revoltech · Libreria UI Angular', 'Revoltech · Angular UI library'),
    stack: ['Angular', 'Angular CDK', 'Storybook', 'Design tokens'],
    style: {
      label: text('Temi Signature', 'Signature themes'),
      detail: text('Inter, smeraldo e zinco, 5 preset', 'Inter, emerald and zinc, 5 presets'),
      colors: ['#047857', '#18181b', '#fafafa'],
      font: "'Inter', sans-serif",
    },
    architecture: {
      label: text('Libreria a componenti', 'Component library'),
      detail: text('token, componenti, Storybook', 'tokens, components, Storybook'),
      nodes: [
        { role: text('App ospite', 'Host app'), tech: same('Angular'), icon: 'angular' },
        { role: text('Componenti', 'Components'), tech: same('Standalone + CDK'), icon: 'angular' },
        { role: text('Temi', 'Themes'), tech: text('Preset Signature', 'Signature presets'), icon: 'token' },
        { role: same('Token'), tech: text('Variabili CSS', 'CSS variables'), icon: 'css' },
        { role: text('Catalogo', 'Catalog'), tech: same('Storybook'), icon: 'storybook' },
      ],
    },
    content: content(
      'Theia-UI',
      'La libreria di componenti Angular dell’ecosistema: componenti accessibili, temi e schemi chiaro e scuro condivisi da tutte le app, documentati in Storybook.',
      'The ecosystem’s Angular component library: accessible components, themes and light and dark schemes shared by every app, documented in Storybook.',
    ),
  },
  {
    slug: 'hermes-chat',
    group: 'collab',
    version: same('v0.2'),
    category: text('Revoltech · Chat in tempo reale', 'Revoltech · Real-time chat'),
    stack: ['.NET SignalR', 'Angular library', 'Real Time Chatting'],
    style: {
      label: text('Minimal su token Theia', 'Minimal on Theia tokens'),
      detail: text('bolle asimmetriche, chip a pillola', 'asymmetric bubbles, pill chips'),
      colors: ['#0ea5e9', '#047857', '#f0f3f6'],
      font: "'Nunito', sans-serif",
    },
    architecture: {
      label: text('Lib Angular + pacchetto .NET', 'Angular lib + .NET package'),
      detail: text('UI Angular, hub SignalR, SQL', 'Angular UI, SignalR hub, SQL'),
      nodes: [
        { role: role.ui, tech: text('Libreria Angular', 'Angular library'), icon: 'angular' },
        { role: text('Tempo reale', 'Real time'), tech: text('Hub SignalR', 'SignalR hub'), icon: 'dotnet' },
        { role: role.api, tech: text('Pacchetto .NET', '.NET package'), icon: 'dotnet' },
        { role: role.db, tech: same('SQL Server'), icon: 'db-cc2927' },
      ],
    },
    content: content(
      'Hermes-chat',
      'La chat in tempo reale dentro le app dell’ecosistema: conversazioni, gruppi, menzioni e rimandi ai ticket, distribuita come libreria Angular.',
      'Real-time chat inside the ecosystem’s apps: conversations, groups, mentions and ticket links, shipped as an Angular library.',
    ),
  },
  {
    slug: 'metis',
    group: 'collab',
    version: same('v0.0'),
    category: text('Revoltech · SaaS multi-tenant', 'Revoltech · Multi-tenant SaaS'),
    stack: ['Angular', '.NET', 'Multi-tenant'],
    style: {
      label: text('Monocromo minimal', 'Minimal monochrome'),
      detail: text('Nunito, nero e bianco, preset Aurora', 'Nunito, black and white, Aurora preset'),
      colors: ['#0b0b0c', '#f5f5f4', '#8a8984'],
      font: "'Nunito', sans-serif",
    },
    architecture: {
      label: text('SaaS monolite modulare', 'Modular monolith SaaS'),
      detail: same('Angular SSR, .NET 10, SQL'),
      nodes: [
        { role: role.ui, tech: same('Angular SSR'), icon: 'angular' },
        { role: role.auth, tech: same('Keycloak'), icon: 'keycloak' },
        { role: role.api, tech: same('.NET 10'), icon: 'dotnet' },
        { role: text('Eventi', 'Events'), tech: same('Outbox / Inbox'), icon: 'queue' },
        { role: role.db, tech: same('SQL Server'), icon: 'db-cc2927' },
      ],
    },
    content: content(
      'Metis',
      'SaaS multi-tenant per la vendita diretta: rete di distributori, catalogo, ordini, carriera, provvigioni e wallet in un’unica piattaforma.',
      'Multi-tenant SaaS for direct selling: distributor network, catalog, orders, career, commissions and wallet in one platform.',
    ),
  },
];

/** Projects that have a case study page. */
export const caseStudies = projects.filter((project) => !project.placeholder);

export const projectGroups: ProjectGroup[] = ['mine', 'collab'];

export const projectsInGroup = (group: ProjectGroup): Project[] =>
  projects.filter((project) => project.group === group);

export const getProject = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

// ---------------------------------------------------------------- build-time checks

const duplicateSlug = projects.find(
  (project, index) => projects.findIndex((candidate) => candidate.slug === project.slug) !== index,
)?.slug;

if (duplicateSlug) {
  throw new Error(`Duplicate project slug: ${duplicateSlug}`);
}

const incompleteLocale = projects.find((project) =>
  locales.some((locale) => {
    const localized = project.content[locale];
    return !localized || !localized.title.trim() || !localized.summary.trim();
  }),
);

if (incompleteLocale) {
  throw new Error(`Project "${incompleteLocale.slug}" is missing a localized title or summary.`);
}

for (const project of projects) {
  if (!projectArt[project.slug]) throw new Error(`Project "${project.slug}" has no art.`);
  const missing = project.architecture.nodes.find((node) => !techIcons[node.icon]);
  if (missing) throw new Error(`Project "${project.slug}" uses unknown tech icon "${missing.icon}".`);
  if (project.placeholder && !project.href) throw new Error(`Placeholder "${project.slug}" needs an href.`);
}
