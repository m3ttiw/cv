import { cvContent, type Locale } from '../data/cv';

const root = document.documentElement;
const localeButton = document.querySelector<HTMLButtonElement>('[data-locale-toggle]');
const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menuBackdrop = document.querySelector<HTMLButtonElement>('[data-menu-close]');
const menuLabel = document.querySelector<HTMLElement>('[data-menu-label]');
const menuLinks = [...document.querySelectorAll<HTMLAnchorElement>('#mobile-navigation a')];
const hero = document.querySelector<HTMLElement>('.hero');
const heroVideo = document.querySelector<HTMLVideoElement>('[data-hero-video]');
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

const writeStorage = (key: string, value: string): void => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage is optional; the current choice still applies for this visit.
  }
};

const setMenuLabel = (locale: Locale, open: boolean): void => {
  const labels = {
    it: open ? 'Chiudi menu' : 'Apri menu',
    en: open ? 'Close menu' : 'Open menu',
  };
  menuButton?.setAttribute('aria-label', labels[locale]);
  menuBackdrop?.setAttribute('aria-label', labels[locale]);
  if (menuLabel) menuLabel.textContent = labels[locale];
};

const setMenuOpen = (open: boolean, restoreFocus = false): void => {
  root.dataset.menuOpen = String(open);
  menuButton?.setAttribute('aria-expanded', String(open));
  setMenuLabel(root.dataset.locale === 'en' ? 'en' : 'it', open);
  if (restoreFocus && !open) menuButton?.focus();
};

const syncThemeColor = (): void => {
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#12131a');
};

const setOverHero = (over: boolean): void => {
  root.dataset.overHero = String(over);
  syncThemeColor();
};

const setLocale = (locale: Locale): void => {
  root.dataset.locale = locale;
  root.lang = locale;
  localeButton?.setAttribute('aria-pressed', String(locale === 'en'));
  localeButton?.setAttribute(
    'aria-label',
    locale === 'it' ? 'Passa all’inglese' : 'Switch to Italian',
  );
  if (localeButton) localeButton.textContent = locale === 'it' ? 'EN' : 'IT';
  setMenuLabel(locale, root.dataset.menuOpen === 'true');

  const content = cvContent[locale];
  document.title = content.meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', content.meta.description);
  writeStorage('cv-locale', locale);
};

const syncHeroMotion = (reduceMotion: boolean): void => {
  root.dataset.reducedMotion = String(reduceMotion);
  if (!heroVideo) return;

  heroVideo.muted = true;
  heroVideo.defaultMuted = true;
  heroVideo.playsInline = true;
  heroVideo.loop = true;

  if (reduceMotion) {
    heroVideo.pause();
    heroVideo.removeAttribute('autoplay');
    heroVideo.hidden = true;
    return;
  }

  heroVideo.hidden = false;
  heroVideo.setAttribute('autoplay', '');
  void heroVideo.play().catch(() => {
    // Poster remains if playback is blocked.
  });
};

setLocale(root.dataset.locale === 'en' ? 'en' : 'it');
syncHeroMotion(motionQuery.matches);
syncThemeColor();

localeButton?.addEventListener('click', () => {
  setLocale(root.dataset.locale === 'en' ? 'it' : 'en');
});

menuButton?.addEventListener('click', () => {
  setMenuOpen(root.dataset.menuOpen !== 'true');
});

menuBackdrop?.addEventListener('click', () => {
  setMenuOpen(false, true);
});

menuLinks.forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && root.dataset.menuOpen === 'true') setMenuOpen(false, true);
});

motionQuery.addEventListener('change', (event) => {
  syncHeroMotion(event.matches);
});

if (hero && 'IntersectionObserver' in window) {
  const heroChromeObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry) setOverHero(entry.isIntersecting);
    },
    { rootMargin: '-72px 0px 0px 0px', threshold: 0 },
  );
  heroChromeObserver.observe(hero);
}

const revealItems = document.querySelectorAll<HTMLElement>('.reveal');
const reduceMotion = motionQuery.matches;

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
  );

  revealItems.forEach((element) => revealObserver.observe(element));
}

const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('.site-nav a[href^="#"], .mobile-drawer a[href^="#"]')];
const sections = [
  ...new Set(
    navLinks
      .map((link) => document.querySelector<HTMLElement>(link.hash))
      .filter((section): section is HTMLElement => section !== null),
  ),
];

const setActiveNav = (id: string): void => {
  navLinks.forEach((link) => {
    const active = link.hash === `#${id}`;
    link.dataset.active = String(active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
};

if ('IntersectionObserver' in window && sections.length > 0) {
  const navigationObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveNav((visible.target as HTMLElement).id);
    },
    { rootMargin: '-28% 0px -58% 0px', threshold: [0.08, 0.35, 0.7] },
  );

  sections.forEach((section) => navigationObserver.observe(section));
}

setActiveNav('projects');
