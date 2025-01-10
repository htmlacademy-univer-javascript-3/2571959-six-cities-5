import { MainPage } from './pages/main/main';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/login/login';
import { OfferPage } from './pages/offer/offer';
import { FavoritesPage } from './pages/favorites/favorites';
import { NotFoundPage } from './pages/not-found/not-found';
import { AppRoute } from './routing/routing';
import { PrivateRoute } from './routing/private-route';
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
    <Routes>
      <Route path={AppRoute.Root} element={<MainPage />} />
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route path={AppRoute.Offer} element={<OfferPage />} />
      <Route element={<PrivateRoute />}>
        <Route path={AppRoute.Favorites} element={<FavoritesPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
