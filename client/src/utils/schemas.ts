import { object, string, number, ObjectSchema, mixed, array } from 'yup';
import dayjs, { Dayjs } from 'dayjs';

import {
  IContact,
  IFilters,
  IPlaceForm,
  IPlaceLocationForm,
  ISignInData,
  ISignUpData,
} from '../@types';
import { msgsDict } from './functions';

const dateSchema = (required?: boolean) =>
  mixed<Dayjs>()
    .nullable()
    .test({
      name: 'date',
      skipAbsent: true,
      test(value, ctx) {
        if (required && (!value || !value.isValid())) {
          return ctx.createError({ message: msgsDict('date') });
        }
        if (!required && value && !value.isValid()) {
          return ctx.createError({ message: msgsDict('date') });
        }
        return true;
      },
    });

const cnpjTest = (cnpj: string) => {
  if (cnpj.length !== 14) {
    return true;
  }
  if (
    cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999'
  ) {
    return true;
  }

  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  const digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += Number(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== Number(digits.charAt(0))) {
    return true;
  }

  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += Number(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== Number(digits.charAt(1))) {
    return true;
  }
  return false;
};

const phoneNumberSchema = (required?: boolean) =>
  string().test({
    name: 'phone',
    skipAbsent: true,
    test(value, ctx) {
      if (
        required &&
        (!value || value.replace(/[^\d]+/g, '').length < 10)
      ) {
        return ctx.createError({ message: msgsDict('number') });
      }
      if (!required && value && value.replace(/[^\d]+/g, '').length < 10) {
        return ctx.createError({ message: msgsDict('number') });
      }
      return true;
    },
  });

const postalCodeSchema = (required?: boolean) =>
  string().test({
    name: 'phone',
    skipAbsent: true,
    test(value, ctx) {
      if (
        required &&
        (!value || value.replace(/[^\d]+/g, '').length != 8)
      ) {
        return ctx.createError({ message: msgsDict('number') });
      }
      if (!required && value && value.replace(/[^\d]+/g, '').length != 8) {
        return ctx.createError({ message: msgsDict('number') });
      }
      return true;
    },
  });

const passwordSchema = () =>
  string().test({
    name: 'password',
    skipAbsent: true,
    test(value, ctx) {
      if (
        !value ||
        !(
          value.length >= 10 &&
          value.match(/[a-z]/) &&
          value.match(/[A-Z]/) &&
          value.match(/\d+/) &&
          value.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,),.]/)
        )
      ) {
        return ctx.createError({ message: msgsDict('password') });
      }
      return true;
    },
  });

const documentSchema = (required?: boolean) =>
  string().test({
    name: 'document',
    skipAbsent: true,
    test(value, ctx) {
      if (required && !value) {
        return ctx.createError({ message: msgsDict() });
      }
      if ((required && value) || (!required && value)) {
        const document = value.replace(/[^\d]+/g, '');
        if (cnpjTest(document))
          return ctx.createError({ message: msgsDict('cnpj') });
      }
      return true;
    },
  });

export const signInSchema: ObjectSchema<ISignInData> = object({
  userName: string().required(msgsDict()),
  password: string().required(msgsDict()),
});

export const signUpSchema: ObjectSchema<ISignUpData> = object({
  name: string().min(3, msgsDict('min', 3)).required(msgsDict()),
  email: string().email(msgsDict('email')).required(msgsDict()),
  password: passwordSchema().required(msgsDict()),
  userName: string().min(3, msgsDict('min', 5)).required(msgsDict()),
});

export const contactSchema: ObjectSchema<IContact> = object({
  id: number().required(msgsDict()),
  phone: phoneNumberSchema(false).optional(),
  email: string().email(msgsDict('email')).required(msgsDict()),
});

export const locationSchema: ObjectSchema<IPlaceLocationForm> = object({
  id: number().required(msgsDict()),
  postalCode: postalCodeSchema(true).required(msgsDict()),
  cityId: number()
    .min(1, msgsDict('unSelect'))
    .required(msgsDict('select')),
  address: string().required(msgsDict()),
  complement: string().optional(),
});

export const placeSchema: ObjectSchema<IPlaceForm> = object({
  name: string().min(3, msgsDict('min', 3)).required(msgsDict()),
  nickname: string().min(3, msgsDict('min', 3)).optional(),
  typeId: number()
    .min(1, msgsDict('unSelect'))
    .required(msgsDict('select')),
  document: documentSchema(false).optional(),
  location: locationSchema,
  contact: contactSchema,
  gates: array()
    .of(string().required(msgsDict()))
    .min(1, msgsDict('minArray'))
    .required(msgsDict()),
  turnstiles: array()
    .of(string().required(msgsDict()))
    .min(1, msgsDict('minArray'))
    .required(msgsDict()),
});

export const filtersSchema: ObjectSchema<IFilters> = object({
  dateStart: dateSchema(false)
    .required(msgsDict())
    .nullable()
    .test({
      name: 'dateRange',
      test(value, ctx) {
        const start = dayjs(ctx.parent.dateEnd);
        if (value && value.isAfter(start)) {
          return ctx.createError({
            message: 'Deve ser menor que data final',
          });
        }
        return true;
      },
    }),
  dateEnd: dateSchema(false)
    .required(msgsDict())
    .nullable()
    .test({
      name: 'dateRange',
      test(value, ctx) {
        const start = dayjs(ctx.parent.dateStart);
        if (value && value.isBefore(start)) {
          return ctx.createError({
            message: 'Deve ser maior que data inicial',
          });
        }
        return true;
      },
    }),
  id: number().required(msgsDict()),
});
