import dayjs from 'dayjs';
import { IEvent, IEventForm } from '../../@types';
import { toMask } from './ToMask';

const toForm = (r: IEvent): IEventForm => ({
  name: r.name,
  typeId: r.type.id,
  schedule: {
    id: 0,
    placeId: r.schedule.place.id,
    startAt: dayjs(r.schedule.startAt),
    duration: 0, //look
  },
  contact: {
    id: 0,
    email: r.contact.email,
    phone: r.contact.phone ? toMask.phone(r.contact.phone) : '',
  },
});

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
