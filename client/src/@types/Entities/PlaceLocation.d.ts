import { ICity } from './City';

export interface IPlaceLocation {
  id: number;
  postalCode: string;
  city: ICity;
  address: string;
  complement: string;
}

export interface IPlaceLocationForm {
  id: number;
  postalCode: string;
  cityId: number;
  address: string;
  complement?: string;
}
