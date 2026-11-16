import { cvContent } from './cv';

const it = cvContent.it;
const en = cvContent.en;

/** Homepage sections, in page order. Shared by header, footer and command palette. */
export const navSections = [
  { id: 'services', it: it.nav.services, en: en.nav.services },
  { id: 'projects', it: it.nav.projects, en: en.nav.projects },
  { id: 'process', it: it.nav.process, en: en.nav.process },
  { id: 'journey', it: it.nav.journey, en: en.nav.journey },
  { id: 'contact', it: it.nav.contact, en: en.nav.contact },
];
