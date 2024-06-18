import { object, string, number, ObjectSchema, mixed } from 'yup';
import dayjs, { Dayjs } from 'dayjs';

import { IFilters, ISignInData, ISignUpData } from '../@types';
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

// const cpfTest = (cpf: string) => {
//   if (
//     cpf.length !== 11 ||
//     cpf === '00000000000' ||
//     cpf === '11111111111' ||
//     cpf === '22222222222' ||
//     cpf === '33333333333' ||
//     cpf === '44444444444' ||
//     cpf === '55555555555' ||
//     cpf === '66666666666' ||
//     cpf === '77777777777' ||
//     cpf === '88888888888' ||
//     cpf === '99999999999'
//   ) {
//     return true;
//   } else {
//     let sum = 0;
//     let rest;
//     for (let i = 1; i <= 9; i++)
//       sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
//     rest = (sum * 10) % 11;
//     if (rest === 10 || rest === 11) rest = 0;
//     if (rest !== parseInt(cpf.substring(9, 10))) {
//       return true;
//     }
//     sum = 0;
//     for (let i = 1; i <= 10; i++)
//       sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
//     rest = (sum * 10) % 11;
//     if (rest === 10 || rest === 11) rest = 0;
//     if (rest !== parseInt(cpf.substring(10, 11))) {
//       return true;
//     }
//   }
// };
// const cnpjTest = (cnpj: string) => {
//   if (cnpj.length !== 14) {
//     return true;
//   }
//   if (
//     cnpj === '00000000000000' ||
//     cnpj === '11111111111111' ||
//     cnpj === '22222222222222' ||
//     cnpj === '33333333333333' ||
//     cnpj === '44444444444444' ||
//     cnpj === '55555555555555' ||
//     cnpj === '66666666666666' ||
//     cnpj === '77777777777777' ||
//     cnpj === '88888888888888' ||
//     cnpj === '99999999999999'
//   ) {
//     return true;
//   }

//   let size = cnpj.length - 2;
//   let numbers = cnpj.substring(0, size);
//   const digits = cnpj.substring(size);
//   let sum = 0;
//   let pos = size - 7;
//   for (let i = size; i >= 1; i--) {
//     sum += Number(numbers.charAt(size - i)) * pos--;
//     if (pos < 2) pos = 9;
//   }
//   let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
//   if (result !== Number(digits.charAt(0))) {
//     return true;
//   }

//   size = size + 1;
//   numbers = cnpj.substring(0, size);
//   sum = 0;
//   pos = size - 7;
//   for (let i = size; i >= 1; i--) {
//     sum += Number(numbers.charAt(size - i)) * pos--;
//     if (pos < 2) pos = 9;
//   }
//   result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
//   if (result !== Number(digits.charAt(1))) {
//     return true;
//   }
//   return false;
// };

// const phoneNumberSchema = (required?: boolean) =>
//   string().test({
//     name: 'phone',
//     skipAbsent: true,
//     test(value, ctx) {
//       if (required && (!value || value.replace(/[^\d]+/g, '').length < 10)) {
//         return ctx.createError({ message: msgsDict('currency') });
//       }
//       if (!required && value && value.replace(/[^\d]+/g, '').length < 10) {
//         return ctx.createError({ message: msgsDict('currency') });
//       }
//       return true;
//     },
//   });

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

// const documentSchema = (required?: boolean, type?: 'cpf' | 'cnpj') =>
//   string().test({
//     name: 'document',
//     skipAbsent: true,
//     test(value, ctx) {
//       if (required && !value) {
//         return ctx.createError({ message: msgsDict() });
//       }
//       if ((required && value) || (!required && value)) {
//         const document = value.replace(/[^\d]+/g, '');
//         if (type === 'cnpj' || document.length > 11) {
//           if (cnpjTest(document))
//             return ctx.createError({ message: msgsDict('cnpj') });
//         } else {
//           if (cpfTest(document))
//             return ctx.createError({ message: msgsDict('cpf') });
//         }
//       }
//       return true;
//     },
//   });

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
