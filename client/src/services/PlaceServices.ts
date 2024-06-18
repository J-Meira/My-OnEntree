import { api } from '.';

import {
  IGetAllParams,
  IList,
  IPlace,
  IPlaceForm,
  IServiceResult,
} from '../@types';
import { useToast } from '../utils/hooks';

const getAll = async (
  params: IGetAllParams,
): Promise<IList<IPlace> | void> => {
  try {
    const { data } = await api.get('/Place/GetAll', { params });
    if (data) return data;
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

const getById = async (id: string): Promise<IPlace | void> => {
  try {
    const { data } = await api.get(`/Place/GetById/${id}`);
    if (data) return data;
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

const create = async (
  record: IPlaceForm,
): Promise<IServiceResult<number, IPlaceForm>> => {
  try {
    const result = await api.post(`/Place/Create`, record);
    if (result.data)
      return {
        success: true,
        data: result.data,
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

const updateById = async (
  id: string,
  record: IPlaceForm,
): Promise<IServiceResult<number, IPlaceForm>> => {
  try {
    const result = await api.put(`/Place/UpdateById/${id}`, record);
    if (result)
      return {
        success: true,
        data: Number(id),
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

const deleteById = async (id: number): Promise<boolean | void> => {
  try {
    const result = await api.delete(`/Place/DeleteById/${id}`);
    if (result) {
      useToast.success('Produto excluido com sucesso');
      return true;
    }
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const placeServices = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
