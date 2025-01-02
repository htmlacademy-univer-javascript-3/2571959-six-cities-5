﻿import { MainPage } from './pages/main/main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/login/login';
import { OfferPage } from './pages/offer/offer';
import { FavoritesPage } from './pages/favorites/favorites';
import { NotFoundPage } from './pages/not-found/not-found';
import { AppRoute } from './routing/routing';
import { PrivateRoute } from './routing/private-route';
import { Providers } from './providers';
import { store } from './store';
import { checkLogin } from './store/auth/api-actions';
import { fetchFavoriteOffers, fetchOffers } from './store/offers/api-actions';

store
  .dispatch(checkLogin())
  .then((action) => {
    if (action.type === checkLogin.fulfilled.type) {
      store.dispatch(fetchFavoriteOffers());
    }
  })
  .finally(() => {
    store.dispatch(fetchOffers());
  });

export function App() {
  return (
    <Providers>
      <Router>
        <Routes>
          <Route path={AppRoute.ROOT} element={<MainPage />} />
          <Route path={AppRoute.LOGIN} element={<LoginPage />} />
          <Route path={AppRoute.OFFER} element={<OfferPage />} />
          <Route element={<PrivateRoute />}>
            <Route path={AppRoute.FAVORITES} element={<FavoritesPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Providers>
  );
}
