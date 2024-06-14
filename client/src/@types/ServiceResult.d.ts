import { FormikErrors } from 'formik';

export interface IServiceResult<T, K extends object> {
  success: boolean;
  data?: T;
  errors?: FormikErrors<K>;
}
