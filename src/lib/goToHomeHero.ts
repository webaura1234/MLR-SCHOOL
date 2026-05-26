import type { MouseEvent } from 'react';

export const HOME_HERO_ID = 'hero';
export const HOME_HERO_PATH = '/#hero';
export const HOME_HERO_EVENT = 'mr:go-home-hero';

export function scrollToHomeHero(behavior: ScrollBehavior = 'smooth') {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(new CustomEvent(HOME_HERO_EVENT));

  const hero = document.getElementById(HOME_HERO_ID);
  if (hero) {
    hero.scrollIntoView({ behavior, block: 'start' });
    return;
  }

  window.scrollTo({ top: 0, behavior });
}

export function handleHomeHeroClick(
  pathname: string,
  event: MouseEvent<HTMLAnchorElement>,
) {
  if (pathname !== '/') return;

  event.preventDefault();
  scrollToHomeHero();
}

export function isHomeNavActive(pathname: string, path: string) {
  if (path === HOME_HERO_PATH || path === '/') return pathname === '/';
  return pathname === path.split('#')[0];
}
