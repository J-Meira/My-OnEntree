import { api } from '.';

import { ICity, IGetAllParams, IList, IState } from '../@types';

const getAllStates = async (): Promise<IList<IState> | void> => {
  try {
    const { data } = await api.get('/State/GetAll');
    if (data) return data;
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

const getAllCities = async (
  params: IGetAllParams,
): Promise<IList<ICity> | void> => {
  try {
    const { data } = await api.get('/City/Search', { params });
    if (data) return data;
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const locationServices = {
  getAllStates,
  getAllCities,
};
