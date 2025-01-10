﻿import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { AppRoute } from '../../routing/routing';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login } from '../../store/auth/api-actions';
import { AuthStatus } from '../../types/auth-status';
import { locations } from '../../utils/constants';
import { setCity } from '../../store/offers/offers';
import { fetchFavoriteOffers } from '../../store/offers/api-actions';

export function LoginPage() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.auth.authStatus);
  const navigate = useNavigate();
  const city = useMemo(
    () => locations[Math.floor(Math.random() * locations.length)],
    []
  );

  const handleCityClick = () => {
    dispatch(setCity(city));
  };

  useEffect(() => {
    if (authStatus === AuthStatus.Auth) {
      dispatch(fetchFavoriteOffers());
      navigate(AppRoute.Root);
    }
  }, [authStatus, dispatch, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ data: formState }));
  };

  return (
    <div className="page page--gray page--login">
      <Header showUserMenu={false} />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={submit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formState.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Root}
                onClick={handleCityClick}
              >
                <span>{city}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
