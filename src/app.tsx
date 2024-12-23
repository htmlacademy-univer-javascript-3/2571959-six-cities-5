import { MainPage } from './pages/main/main-page';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/login/login-page';
import { OfferPage } from './pages/offer/offer-page';
import { FavoritesPage } from './pages/favorites/favorites-page';
import { NotFoundPage } from './pages/not-found/not-found-page';
import { AppRoute } from './routing/routes';
import { PrivateRoute } from './routing/private-route';
import { Providers } from './providers';
import { store } from './store';
import { checkLogin } from './store/auth/apiActions';
import { fetchFavoriteOffers, fetchOffers } from './store/offers/apiActions';

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
