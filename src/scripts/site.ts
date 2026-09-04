import { cvContent, type Locale } from '../data/cv';
import { createHeroCanvas, type HeroCanvasHandle } from './hero-canvas';

type HeroMode = 'product' | 'kinetic' | 'canvas' | 'astra';

const HERO_MODES: HeroMode[] = ['product', 'kinetic', 'canvas', 'astra'];
const DEFAULT_HERO_MODE: HeroMode = 'kinetic';
const HERO_MODE_KEY = 'cv-hero-mode';
const THEME_BY_MODE: Record<HeroMode, string> = {
  product: '#d7eefe',
  kinetic: '#ffd34d',
  canvas: '#ffe8d2',
  astra: '#efe8dc',
};

const root = document.documentElement;
const localeButton = document.querySelector<HTMLButtonElement>('[data-locale-toggle]');
const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menuBackdrop = document.querySelector<HTMLButtonElement>('[data-menu-close]');
const menuLabel = document.querySelector<HTMLElement>('[data-menu-label]');
const menuLinks = [...document.querySelectorAll<HTMLAnchorElement>('#mobile-navigation a')];
const hero = document.querySelector<HTMLElement>('.hero');
const heroModeSwitch = document.querySelector<HTMLElement>('[data-hero-mode-switch]');
const heroModeButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-hero-mode-option]')];
const heroCanvas = document.querySelector<HTMLCanvasElement>('[data-hero-canvas]');
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

let canvasHandle: HeroCanvasHandle | null = null;

const writeStorage = (key: string, value: string): void => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage is optional; the current choice still applies for this visit.
  }
};

const isHeroMode = (value: string | undefined): value is HeroMode =>
  HERO_MODES.includes(value as HeroMode);

const currentHeroMode = (): HeroMode =>
  isHeroMode(root.dataset.heroMode) ? root.dataset.heroMode : DEFAULT_HERO_MODE;

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
  const overHero = root.dataset.overHero === 'true';
  const color = overHero ? THEME_BY_MODE[currentHeroMode()] : '#12131a';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
};

const setOverHero = (over: boolean): void => {
  root.dataset.overHero = String(over);
  syncThemeColor();
};

const syncHeroModeLabel = (locale: Locale): void => {
  heroModeSwitch?.setAttribute('aria-label', locale === 'it' ? 'Stile hero' : 'Hero style');
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
  syncHeroModeLabel(locale);

  const content = cvContent[locale];
  document.title = content.meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', content.meta.description);
  writeStorage('cv-locale', locale);
};

const restartKinetic = (): void => {
  const title = document.querySelector('.hero-title');
  if (!(title instanceof HTMLElement)) return;
  title.classList.remove('is-kinetic-on');
  void title.offsetWidth;
  title.classList.add('is-kinetic-on');
};

const restartAstra = (): void => {
  const copy = document.querySelector('.hero-copy');
  if (!(copy instanceof HTMLElement)) return;
  copy.classList.remove('is-astra-on');
  void copy.offsetWidth;
  copy.classList.add('is-astra-on');
};

const syncCanvas = (mode: HeroMode, reduceMotion: boolean): void => {
  if (!heroCanvas) return;
  if (!canvasHandle) canvasHandle = createHeroCanvas(heroCanvas, hero);

  if (mode !== 'canvas') {
    canvasHandle.stop();
    return;
  }

  if (reduceMotion) {
    canvasHandle.drawStatic();
    return;
  }

  canvasHandle.start();
};

const setHeroMode = (mode: HeroMode, persist = true): void => {
  root.dataset.heroMode = mode;
  heroModeButtons.forEach((button) => {
    button.setAttribute('aria-checked', String(button.dataset.heroModeOption === mode));
  });
  if (persist) writeStorage(HERO_MODE_KEY, mode);
  syncThemeColor();
  syncCanvas(mode, motionQuery.matches);
  if (mode === 'kinetic' && !motionQuery.matches) restartKinetic();
  if (mode === 'astra' && !motionQuery.matches) restartAstra();
};

const syncHeroMotion = (reduceMotion: boolean): void => {
  root.dataset.reducedMotion = String(reduceMotion);
  syncCanvas(currentHeroMode(), reduceMotion);
};

setLocale(root.dataset.locale === 'en' ? 'en' : 'it');
setHeroMode(currentHeroMode(), false);
syncHeroMotion(motionQuery.matches);
syncThemeColor();

localeButton?.addEventListener('click', () => {
  setLocale(root.dataset.locale === 'en' ? 'it' : 'en');
});

heroModeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const mode = button.dataset.heroModeOption;
    if (isHeroMode(mode)) setHeroMode(mode);
  });
});

heroModeSwitch?.addEventListener('keydown', (event) => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const current = currentHeroMode();
  const index = HERO_MODES.indexOf(current);
  let nextIndex = index;
  if (event.key === 'ArrowRight') nextIndex = (index + 1) % HERO_MODES.length;
  if (event.key === 'ArrowLeft') nextIndex = (index - 1 + HERO_MODES.length) % HERO_MODES.length;
  if (event.key === 'Home') nextIndex = 0;
  if (event.key === 'End') nextIndex = HERO_MODES.length - 1;
  const next = HERO_MODES[nextIndex];
  if (!next) return;
  setHeroMode(next);
  heroModeButtons.find((button) => button.dataset.heroModeOption === next)?.focus();
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

  const heroVisibilityObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry || currentHeroMode() !== 'canvas' || motionQuery.matches) return;
      if (entry.isIntersecting) canvasHandle?.start();
      else canvasHandle?.stop();
    },
    { threshold: 0 },
  );
  heroVisibilityObserver.observe(hero);
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
