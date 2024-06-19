import { Dayjs } from 'dayjs';
import { IPlace } from '..';

export interface ISchedule {
  id: number;
  place: IPlace;
  startAt: Dayjs;
  endAt: Dayjs;
}

export interface IScheduleForm {
  id: number;
  placeId: number;
  startAt: Dayjs | null;
  duration: number | null;
}
