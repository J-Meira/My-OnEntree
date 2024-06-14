import { Dayjs } from 'dayjs';

export interface IFilters {
  dateStart: Dayjs | null;
  dateEnd: Dayjs | null;
  id: number;
}
