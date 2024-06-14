import dayjs, { Dayjs } from 'dayjs';

export const dateToScreen = (
  date: Date | Dayjs | string,
  showTime: boolean = false,
): string => {
  return dayjs(date).format(showTime ? 'DD/MM/YYYY HH:mm:ss' : 'DD/MM/YYYY');
};
