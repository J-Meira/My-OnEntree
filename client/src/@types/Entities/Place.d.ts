import {
  IContact,
  IEntity,
  IPlaceLocation,
  IPlaceLocationForm,
  IType,
} from '.';

export interface IPlace extends IEntity {
  id: number;
  name: string;
  nickname: string;
  type: IType;
  document: string;
  location: IPlaceLocation;
  contact: IContact;
  gates: string[];
  turnstiles: string[];
}

export interface IPlaceForm {
  name: string;
  nickname?: string;
  typeId: number;
  document?: string;
  location: IPlaceLocationForm;
  contact: IContact;
  gates: string[];
  turnstiles: string[];
}
