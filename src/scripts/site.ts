import type { Locale } from '../data/cv';

const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const getLocale = (): Locale => (root.dataset.locale === 'en' ? 'en' : 'it');

const writeStorage = (key: string, value: string): void => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage is optional; the current choice still applies for this visit.
  }
};

/* --------------------------------------------------------------------------
   Theme & locale
   -------------------------------------------------------------------------- */

const themeButton = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const localeButton = document.querySelector<HTMLButtonElement>('[data-locale-toggle]');
const titleMeta = document.querySelector<HTMLMetaElement>('meta[name="x-page-titles"]');
const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="x-page-descriptions"]');

const setTheme = (theme: 'light' | 'dark', persist = true): void => {
  root.dataset.theme = theme;
  themeButton?.setAttribute('aria-pressed', String(theme === 'dark'));
  const labels = {
    it: theme === 'dark' ? 'Attiva il tema chiaro' : 'Attiva il tema scuro',
    en: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
  };
  themeButton?.setAttribute('aria-label', labels[getLocale()]);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#161616' : '#f2f1ed');
  if (persist) writeStorage('cv-theme', theme);
};

const setLocale = (locale: Locale, persist = true): void => {
  root.dataset.locale = locale;
  root.lang = locale;
  localeButton?.setAttribute('aria-label', locale === 'it' ? 'Switch to English' : 'Passa all’italiano');
  if (localeButton) localeButton.textContent = locale === 'it' ? 'EN' : 'IT';

  const title = titleMeta?.dataset[locale === 'it' ? 'metaTitleIt' : 'metaTitleEn'];
  const description = descriptionMeta?.dataset[locale === 'it' ? 'metaDescriptionIt' : 'metaDescriptionEn'];
  if (title) document.title = title;
  if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description);

  document.querySelectorAll<HTMLElement>('[data-placeholder-it]').forEach((element) => {
    const value = element.dataset[locale === 'it' ? 'placeholderIt' : 'placeholderEn'];
    if (value) element.setAttribute('placeholder', value);
  });

  setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light', false);
  if (persist) writeStorage('cv-locale', locale);
};

const toggleTheme = (): void => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
const toggleLocale = (): void => setLocale(getLocale() === 'en' ? 'it' : 'en');

setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light', false);
setLocale(getLocale(), false);

themeButton?.addEventListener('click', toggleTheme);
localeButton?.addEventListener('click', toggleLocale);

/* --------------------------------------------------------------------------
   Mobile menu
   -------------------------------------------------------------------------- */

const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menuLinks = [...document.querySelectorAll<HTMLAnchorElement>('#mobile-navigation a')];

const setMenuOpen = (open: boolean, restoreFocus = false): void => {
  root.dataset.menuOpen = String(open);
  menuButton?.setAttribute('aria-expanded', String(open));
  if (restoreFocus && !open) menuButton?.focus();
};

menuButton?.addEventListener('click', () => setMenuOpen(root.dataset.menuOpen !== 'true'));
menuLinks.forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && root.dataset.menuOpen === 'true') setMenuOpen(false, true);
});
window.matchMedia('(min-width: 900px)').addEventListener('change', () => setMenuOpen(false));

/* --------------------------------------------------------------------------
   Scroll: progress bar, header state, reveal, active nav
   -------------------------------------------------------------------------- */

const progress = document.querySelector<HTMLElement>('[data-scroll-progress]');
const header = document.querySelector<HTMLElement>('[data-header]');
let ticking = false;

const onScroll = (): void => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
  if (progress) progress.style.transform = `scaleX(${ratio})`;
  header?.toggleAttribute('data-scrolled', window.scrollY > 12);
  ticking = false;
};

window.addEventListener(
  'scroll',
  () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(onScroll);
  },
  { passive: true },
);
onScroll();

const revealItems = document.querySelectorAll<HTMLElement>('.reveal');

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
    { rootMargin: '0px 0px -10% 0px', threshold: 0.06 },
  );
  revealItems.forEach((element) => revealObserver.observe(element));
}

const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('.site-nav a[href^="#"]')];
// The hero is observed too, so scrolling back to the top clears the active link.
const navTargets = [...navLinks.map((link) => link.hash), '#top']
  .map((hash) => document.querySelector<HTMLElement>(hash))
  .filter((section): section is HTMLElement => section !== null);

if ('IntersectionObserver' in window && navTargets.length > 0) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = (entry.target as HTMLElement).id;
        navLinks.forEach((link) => {
          const active = link.hash === `#${id}`;
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  navTargets.forEach((section) => navObserver.observe(section));
}

/* --------------------------------------------------------------------------
   Hero lens: design / wireframe / code
   -------------------------------------------------------------------------- */

const lens = document.querySelector<HTMLElement>('[data-lens]');

if (lens) {
  const stage = lens.querySelector<HTMLElement>('[data-lens-stage]');
  const buttons = [...lens.querySelectorAll<HTMLButtonElement>('[data-lens-mode]')];
  const modes = buttons.map((button) => button.dataset.lensMode ?? 'design');
  let autoplay: number | undefined;

  const setMode = (mode: string): void => {
    lens.dataset.mode = mode;
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.lensMode === mode)));
  };

  const stopAutoplay = (): void => {
    if (autoplay !== undefined) window.clearInterval(autoplay);
    autoplay = undefined;
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      stopAutoplay();
      setMode(button.dataset.lensMode ?? 'design');
    });
  });

  if (stage && finePointer) {
    stage.addEventListener('pointermove', (event) => {
      const rect = stage.getBoundingClientRect();
      stage.style.setProperty('--lx', `${event.clientX - rect.left}px`);
      stage.style.setProperty('--ly', `${event.clientY - rect.top}px`);
    });
    stage.addEventListener('pointerenter', () => {
      stopAutoplay();
      lens.dataset.peek = 'true';
    });
    stage.addEventListener('pointerleave', () => {
      lens.dataset.peek = 'false';
    });
  }

  // Touch: press and hold to peek at the wireframe under the finger. A short hold
  // tells the gesture apart from a scroll; once the lens is out, the page stays put.
  if (stage) {
    const HOLD_MS = 140;
    const LIFT = 72; // keep the lens above the fingertip so it isn't hidden by it
    let holdTimer: number | undefined;
    let touchActive = false;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;

    const placeLens = (): void => {
      const rect = stage.getBoundingClientRect();
      stage.style.setProperty('--lx', `${lastX - rect.left}px`);
      stage.style.setProperty('--ly', `${Math.max(lastY - rect.top - LIFT, 24)}px`);
    };

    const endTouch = (): void => {
      window.clearTimeout(holdTimer);
      holdTimer = undefined;
      if (!touchActive) return;
      touchActive = false;
      lens.dataset.peek = 'false';
      lens.dataset.touch = 'false';
    };

    stage.addEventListener(
      'touchstart',
      (event) => {
        if (event.touches.length !== 1) {
          endTouch();
          return;
        }
        const touch = event.touches[0];
        startX = lastX = touch.clientX;
        startY = lastY = touch.clientY;
        lens.dataset.touched = 'true';
        stopAutoplay();
        holdTimer = window.setTimeout(() => {
          touchActive = true;
          setMode('design');
          placeLens();
          lens.dataset.touch = 'true';
          lens.dataset.peek = 'true';
          navigator.vibrate?.(8);
        }, HOLD_MS);
      },
      { passive: true },
    );

    stage.addEventListener(
      'touchmove',
      (event) => {
        const touch = event.touches[0];
        lastX = touch.clientX;
        lastY = touch.clientY;
        if (touchActive) {
          event.preventDefault();
          placeLens();
        } else if (Math.hypot(lastX - startX, lastY - startY) > 10) {
          endTouch(); // the finger is scrolling, not holding
        }
      },
      { passive: false },
    );

    stage.addEventListener('touchend', endTouch);
    stage.addEventListener('touchcancel', endTouch);
    stage.addEventListener('contextmenu', (event) => {
      if (touchActive || holdTimer !== undefined) event.preventDefault();
    });
  }

  // A gentle tour of the three layers until the visitor takes over.
  if (!reduceMotion && 'IntersectionObserver' in window) {
    let step = 0;
    const start = (): void => {
      if (autoplay !== undefined || lens.dataset.touched === 'true') return;
      autoplay = window.setInterval(() => {
        step = (step + 1) % modes.length;
        setMode(modes[step]);
      }, 3200);
    };
    lens.addEventListener('pointerdown', () => (lens.dataset.touched = 'true'));
    lens.addEventListener('focusin', () => {
      lens.dataset.touched = 'true';
      stopAutoplay();
    });
    stage?.addEventListener('pointerenter', () => (lens.dataset.touched = 'true'));
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stopAutoplay();
    }).observe(lens);
  }
}

/* --------------------------------------------------------------------------
   Card spotlight
   -------------------------------------------------------------------------- */

if (finePointer) {
  document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--sx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--sy', `${event.clientY - rect.top}px`);
    });
  });
}

/* --------------------------------------------------------------------------
   Process: active step follows the scroll
   -------------------------------------------------------------------------- */

const processSteps = [...document.querySelectorAll<HTMLElement>('[data-process-step]')];
const processCurrent = document.querySelector<HTMLElement>('[data-process-current]');
const processMeter = document.querySelector<HTMLElement>('[data-process-meter]');

const setProcessStep = (index: number): void => {
  processSteps.forEach((step, stepIndex) => step.toggleAttribute('data-active', stepIndex === index));
  if (processCurrent) processCurrent.textContent = String(index + 1).padStart(2, '0');
  if (processMeter) processMeter.style.transform = `scaleX(${(index + 1) / processSteps.length})`;
};

if (processSteps.length > 0) {
  setProcessStep(0);
  if ('IntersectionObserver' in window) {
    const processObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setProcessStep(Number((entry.target as HTMLElement).dataset.processStep));
        });
      },
      { rootMargin: '-40% 0px -45% 0px' },
    );
    processSteps.forEach((step) => processObserver.observe(step));
  }
}

/* --------------------------------------------------------------------------
   Command palette
   -------------------------------------------------------------------------- */

const palette = document.querySelector<HTMLDialogElement>('[data-palette]');

if (palette) {
  const input = palette.querySelector<HTMLInputElement>('[data-palette-input]');
  const items = [...palette.querySelectorAll<HTMLAnchorElement>('[data-palette-item]')];
  const groups = [...palette.querySelectorAll<HTMLElement>('[data-palette-group]')];
  const empty = palette.querySelector<HTMLElement>('[data-palette-empty]');
  const toast = palette.querySelector<HTMLElement>('[data-palette-toast]');
  const openers = document.querySelectorAll<HTMLButtonElement>('[data-palette-open]');
  const isMac = /Mac|iPhone|iPad/.test(navigator.userAgent);
  let visible: HTMLAnchorElement[] = items;
  let activeIndex = 0;

  document.querySelectorAll<HTMLElement>('[data-shortcut-label]').forEach((label) => {
    label.textContent = isMac ? '⌘K' : 'Ctrl K';
  });

  items.forEach((item, index) => {
    item.id = `palette-option-${index}`;
  });

  const highlight = (index: number): void => {
    if (visible.length === 0) return;
    activeIndex = (index + visible.length) % visible.length;
    items.forEach((item) => item.setAttribute('aria-selected', 'false'));
    const current = visible[activeIndex];
    current.setAttribute('aria-selected', 'true');
    input?.setAttribute('aria-activedescendant', current.id);
    current.scrollIntoView({ block: 'nearest' });
  };

  const filter = (): void => {
    const query = (input?.value ?? '').trim().toLowerCase();
    const terms = query.split(/\s+/).filter(Boolean);
    visible = items.filter((item) => {
      const haystack = item.dataset.search ?? '';
      const match = terms.every((term) => haystack.includes(term));
      item.hidden = !match;
      return match;
    });
    groups.forEach((group) => {
      group.hidden = !group.querySelector('[data-palette-item]:not([hidden])');
    });
    if (empty) empty.hidden = visible.length > 0;
    highlight(0);
  };

  const open = (): void => {
    if (palette.open) return;
    setMenuOpen(false);
    if (input) input.value = '';
    if (toast) toast.textContent = '';
    filter();
    palette.showModal();
    input?.focus();
  };

  const close = (): void => {
    if (palette.open) palette.close();
  };

  const run = async (item: HTMLAnchorElement, event?: Event): Promise<void> => {
    const action = item.dataset.action;
    if (!action) {
      close();
      return; // Plain links navigate on their own.
    }
    event?.preventDefault();
    if (action === 'theme') toggleTheme();
    if (action === 'locale') toggleLocale();
    if (action === 'copy') {
      const url = new URL(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? window.location.href);
      try {
        await navigator.clipboard.writeText(url.toString());
        if (toast) toast.textContent = toast.dataset[getLocale() === 'it' ? 'copiedIt' : 'copiedEn'] ?? '';
      } catch {
        if (toast) toast.textContent = url.toString();
      }
      return;
    }
    close();
  };

  openers.forEach((button) => button.addEventListener('click', open));
  input?.addEventListener('input', filter);

  input?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      highlight(activeIndex + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      highlight(activeIndex - 1);
    } else if (event.key === 'Enter') {
      const current = visible[activeIndex];
      if (!current) return;
      event.preventDefault();
      if (current.dataset.action) void run(current);
      else current.click();
    }
  });

  items.forEach((item) => {
    item.addEventListener('click', (event) => void run(item, event));
    item.addEventListener('pointermove', () => {
      const index = visible.indexOf(item);
      if (index !== -1 && index !== activeIndex) highlight(index);
    });
  });

  // Clicking the backdrop (the dialog itself, outside the panel) closes it.
  palette.addEventListener('click', (event) => {
    if (event.target === palette) close();
  });

  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (palette.open) close();
      else open();
      return;
    }
    const target = event.target as HTMLElement | null;
    const typing = target?.closest('input, textarea, [contenteditable="true"]');
    if (event.key === '/' && !typing && !palette.open) {
      event.preventDefault();
      open();
    }
  });
}

/* --------------------------------------------------------------------------
   Project previews: fit the 490 × 316 drawing, lens on hover, architecture toggle
   -------------------------------------------------------------------------- */

const STAGE_W = 490;
const STAGE_H = 316;
const projectStages = [...document.querySelectorAll<HTMLElement>('[data-pc-stage]')];

if (projectStages.length > 0) {
  const fit = (stage: HTMLElement): void => {
    const width = stage.clientWidth;
    if (width > 0) stage.style.setProperty('--k', (width / STAGE_W).toFixed(4));
  };
  const resizer =
    'ResizeObserver' in window
      ? new ResizeObserver((entries) => entries.forEach((entry) => fit(entry.target as HTMLElement)))
      : null;
  if (!resizer) window.addEventListener('resize', () => projectStages.forEach(fit));

  projectStages.forEach((stage) => {
    fit(stage);
    resizer?.observe(stage);

    const host = stage.closest<HTMLElement>('[data-project-card]') ?? stage;
    const toggle = stage.querySelector<HTMLButtonElement>('[data-pc-xray]');
    const place = (x: number, y: number): void => {
      stage.style.setProperty('--lx', `${x.toFixed(1)}px`);
      stage.style.setProperty('--ly', `${y.toFixed(1)}px`);
    };

    // Mouse and pen: a lens follows the pointer while it is over the preview.
    host.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch' || stage.dataset.xlens === 'full') return;
      const rect = stage.getBoundingClientRect();
      const k = rect.width / STAGE_W;
      const x = (event.clientX - rect.left) / k;
      const y = (event.clientY - rect.top) / k;
      if (x >= 0 && y >= 0 && x <= STAGE_W && y <= STAGE_H) {
        place(x, y);
        stage.dataset.xlens = 'peek';
      } else if (stage.dataset.xlens === 'peek') {
        stage.dataset.xlens = 'off';
      }
    });
    host.addEventListener('pointerleave', () => {
      if (stage.dataset.xlens === 'peek') stage.dataset.xlens = 'off';
    });

    // Touch and keyboard: the toggle opens the whole blueprint.
    toggle?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const open = stage.dataset.xlens !== 'full';
      if (open) place(STAGE_W / 2, STAGE_H / 2);
      stage.dataset.xlens = open ? 'full' : 'off';
      toggle.setAttribute('aria-pressed', String(open));
    });
  });
}
