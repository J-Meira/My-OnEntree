import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

import { IEvent, IEventForm } from '../../@types';
import { toMask } from './ToMask';

const toForm = (r: IEvent): IEventForm => {
  const startAt = dayjs.utc(r.schedule.startAt);
  const endAt = dayjs.utc(r.schedule.endAt);
  return {
    name: r.name,
    typeId: r.type.id,
    schedule: {
      id: r.schedule.id,
      placeId: r.schedule.place.id,
      startAt: startAt,
      duration: endAt.diff(startAt, 'hour', true),
    },
    contact: {
      id: r.contact.id,
      email: r.contact.email,
      phone: r.contact.phone ? toMask.phone(r.contact.phone) : '',
    },
  };
};

const toAPI = (r: IEventForm): IEventForm => ({
  ...r,
  schedule: {
    ...r.schedule,
  },
  contact: {
    ...r.contact,
    phone: r.contact.phone ? r.contact.phone.replace(/\D/g, '') : '',
  },
});

export const eventMappers = {
  toAPI,
  toForm,
};
