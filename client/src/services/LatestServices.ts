import { api } from '.';

import { ILatest } from '../@types';

const get = async (): Promise<ILatest | void> => {
  try {
    const { data } = await api.get('/Latest');
    if (data) return data;
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const latestServices = {
  get,
};
