import { ROUTES } from './routes';

export const NAV_ITEMS = [
  { path: ROUTES.HOME,  label: 'Home' },
  { path: ROUTES.ABOUT, label: 'About' },
  { path: ROUTES.MENU,  label: 'Menu' },
] as const;