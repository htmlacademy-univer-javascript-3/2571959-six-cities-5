import { Link } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { AppRoute } from '../../routing/routing';

export function NotFoundPage() {
  return (
    <div className="page page--gray page--not-found">
      <Header showUserMenu={false} />
      <main className="page__main page__main--not-found">
        <div className="page__not-found-container container">
          <section className="not-found">
            <h1 className="not-found__title">404 Not Found</h1>
            <p className="not-found__message">Sorry, the page you are looking for does not exist.</p>
            <Link className="not-found__link" to={AppRoute.Root}>Go to main page</Link>
          </section>
        </div>
      </main>
    </div>
  );
}
