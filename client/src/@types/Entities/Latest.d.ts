import { IEvent } from './Event';
import { IPlace } from './Place';

export interface ILatest {
  events: IEvent[];
  places: IPlace[];
}
