import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { createAPI } from '../api/api';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { createMemoryHistory, MemoryHistory } from 'history';
import { HistoryRouter } from '../routing/history-router';
import { AppDispatch, State } from '../types/state';
import faker from 'faker';
import { Offer } from '../types/offer';
import { User, UserFullData } from '../types/user';
import { MapPoint } from '../types/map-point';
import { City } from '../types/city';


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

export const generatePoint = (): MapPoint => ({
  latitude: parseFloat(faker.address.latitude()),
  longitude: parseFloat(faker.address.longitude()),
  zoom: faker.datatype.number({ min: 5, max: 15 }),
});

export const generateCity = (): City => ({
  name: faker.address.city(),
  location: generatePoint(),
});

export const generateUser = (): UserFullData => ({
  email: faker.internet.email(),
  token: faker.random.alphaNumeric(16),
  name: faker.name.findName(),
  avatarUrl: faker.image.avatar(),
  isPro: faker.datatype.boolean(),
});

export const generateOffer = (host: User = generateUser()): Offer => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: faker.lorem.word(),
  price: faker.datatype.number({ min: 50, max: 200 }),
  city: generateCity(),
  location: generatePoint(),
  isFavorite: false,
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.float({ min: 0, max: 5 }),
  description: faker.lorem.paragraph(),
  bedrooms: faker.datatype.number({ min: 1, max: 5 }),
  goods: faker.random.words(5).split(' '),
  host: host,
  previewImage: faker.image.imageUrl(),
  images: [
    faker.image.imageUrl(),
    faker.image.imageUrl(),
    faker.image.imageUrl(),
  ],
  maxAdults: faker.datatype.number({ min: 1, max: 10 }),
});
