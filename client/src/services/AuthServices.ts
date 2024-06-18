import { api } from '.';

import { IServiceResult, ISignInData, IUser } from '../@types';

export interface IAuth {
  accessToken: string;
  expiresIn: string;
  user: IUser;
}

const signIn = async (payload: ISignInData): Promise<IAuth | void> => {
  try {
    const { data } = await api.post('/Auth/SignIn', payload);
    if (data) return data;
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

const signUp = async (
  payload: ISignUpData,
): Promise<IServiceResult<null, ISignUpData>> => {
  try {
    const result = await api.post('/Auth/SignUp', payload);
    if (result)
      return {
        success: true,
        data: null,
      };
    return {
      success: false,
    };
  } catch (errors: any) {
    console.log(errors);
    return {
      success: false,
      errors: errors.message ? {} : errors,
    };
  }
};

const refresh = async (): Promise<IAuth | void> => {
  try {
    const { data } = await api.post('/Auth/Refresh');
    if (data) return data;
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const authServices = {
  signIn,
  signUp,
  refresh,
};
