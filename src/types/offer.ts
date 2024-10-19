import { City } from './city';
import { User } from './user';
import { MapPoint } from './map-point';

export type OfferCardData = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: MapPoint;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type Offer = OfferCardData & {
  description: string;
  images: string[];
  goods: string[];
  host: User;
  bedrooms: number;
  maxAdults: number;
}
