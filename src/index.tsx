import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import { Providers } from './providers';
import { HistoryRouter } from './routing/history-router';
import { createBrowserHistory } from 'history';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const history = createBrowserHistory();

root.render(
  <React.StrictMode>
    <Providers>
      <HistoryRouter history={history}>
        <App />
      </HistoryRouter>
    </Providers>
  </React.StrictMode>
);
