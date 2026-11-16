const rawBase = import.meta.env.BASE_URL || '/';

/** Base path guaranteed to start and end with a slash. */
export const basePath = `${rawBase.startsWith('/') ? '' : '/'}${rawBase}${rawBase.endsWith('/') ? '' : '/'}`;

/** Prefixes an internal path with the deployment base (`/` locally, `/cv/` on Pages). */
export const withBase = (path: string): string => `${basePath}${path.replace(/^\/+/, '')}`;
