import { api } from '.';

import {
  // IServiceResult,
  ISignInData,
  IUser,
} from '../@types';

export interface IAuth {
  accessToken: string;
  expiresIn: string;
  user: IUser;
}

const signIn = async (payload: ISignInData): Promise<IAuth | void> => {
  try {
    const { data } = await api.post('/Auth/Sign-in', payload);
    if (data) return data;
    return;
  } catch (error) {
    console.log(error);
    return;
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
  refresh,
};
