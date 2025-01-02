import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { createAPI } from '../api/api';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { createMemoryHistory, MemoryHistory } from 'history';
import { HistoryRouter } from '../routing/history-router';
import { AppDispatch, State } from '../types/state';


export function withHistory(
  component: JSX.Element,
  history: MemoryHistory = createMemoryHistory()
) {
  return (
    <HistoryRouter history={history}>
      {component}
    </HistoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore<State>;
  mockAxiosAdapter: MockAdapter;
};

export function withStore(
  component: JSX.Element,
  initialState: Partial<State> = {}
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppDispatch
  >(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  };
}

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
