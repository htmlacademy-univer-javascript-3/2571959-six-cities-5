export const AppRoute = {
  LOGIN: '/login',
  OFFER: '/offer/:id',
  FAVORITES: '/favorites',
  ROOT: '/',
} as const;

export type AppRouteEnum = (typeof AppRoute)[keyof typeof AppRoute];
