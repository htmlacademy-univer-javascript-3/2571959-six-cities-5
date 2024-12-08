import { MainPage } from './pages/main/main-page';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/login/login-page';
import { OfferPage } from './pages/offer/offer-page';
import { FavoritesPage } from './pages/favorites/favorites-page';
import { NotFoundPage } from './pages/not-found/not-found-page';
import { AppRoute } from './routing/routes';
import { PrivateRoute } from './routing/private-route';
import { offers } from './mocks/offers';
import { Providers } from './providers';
import { store } from './store';
import { checkLogin } from './store/auth/apiActions';

store.dispatch(checkLogin());

export function App() {
  return (
    <Providers>
      <Router>
        <Routes>
          <Route path={AppRoute.ROOT} element={<MainPage />} />
          <Route path={AppRoute.LOGIN} element={<LoginPage />} />
          <Route path={AppRoute.OFFER} element={<OfferPage />} />
          <Route element={<PrivateRoute />}>
            <Route path={AppRoute.FAVORITES} element={<FavoritesPage offers={offers} />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Providers>
  );
}
