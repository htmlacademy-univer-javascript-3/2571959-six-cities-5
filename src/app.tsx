import { MainPage } from './pages/main/main-page';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/login/login-page';
import { OfferPage } from './pages/offer/offer-page';
import { FavoritesPage } from './pages/favorites/favorites-page';
import { NotFoundPage } from './pages/not-found/not-found-page';
import { AppRoute } from './routing/routes';
import { PrivateRoute } from './routing/private-route';
import { AuthStatus } from './types/auth-status';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path={AppRoute.ROOT} element={<MainPage cardsCount={5} />} />
        <Route path={AppRoute.LOGIN} element={<LoginPage />} />
        <Route path={AppRoute.OFFER} element={<OfferPage />} />
        <Route element={<PrivateRoute authStatus={AuthStatus.NO_AUTH} />}>
          <Route path={AppRoute.FAVORITES} element={<FavoritesPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
