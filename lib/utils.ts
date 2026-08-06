import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * `images.unoptimized` renders next/image as a plain image element, which skips
 * Next's automatic basePath prefixing, so every public/ asset has to carry the
 * prefix itself. Kept here rather than inlined at each call site so there's one
 * place to change it.
 *
 * MUST stay in sync with `basePath` in next.config.mjs.
 */
export const BASE_PATH = '/community-portal'

/** Resolve a path under public/ to a browser-usable URL. */
export function asset(path: string) {
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`
}
