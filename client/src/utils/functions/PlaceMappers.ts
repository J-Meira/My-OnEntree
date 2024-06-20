import { IPlace, IPlaceForm } from '../../@types';
import { toMask } from './ToMask';

const toForm = (r: IPlace): IPlaceForm => ({
  name: r.name,
  nickname: r.nickname,
  typeId: r.type.id,
  document: toMask.cnpj(r.document),
  location: {
    id: r.location.id,
    postalCode: toMask.postalCode(r.location.postalCode),
    cityId: r.location.city.id,
    address: r.location.address,
    complement: r.location.complement,
  },
  contact: {
    id: r.contact.id,
    email: r.contact.email,
    phone: r.contact.phone ? toMask.phone(r.contact.phone) : '',
  },
  gates: r.gates,
  turnstiles: r.turnstiles,
});

const toAPI = (r: IPlaceForm): IPlaceForm => ({
  ...r,
  nickname: r.nickname || '',
  document: r.document ? r.document.replace(/\D/g, '') : '',
  location: {
    ...r.location,
    postalCode: r.location.postalCode.replace(/\D/g, ''),
  },
  contact: {
    ...r.contact,
    phone: r.contact.phone ? r.contact.phone.replace(/\D/g, '') : '',
  },
});

export const placeMappers = {
  toAPI,
  toForm,
};
