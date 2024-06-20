import { IGetAllParams } from './GetAllParams';

export interface IGetAllEventsParams extends IGetAllParams {
  dateStart: string | null;
  dateEnd: string | null;
  placeId: number | null;
}
