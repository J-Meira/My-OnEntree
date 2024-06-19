import { api } from '.';

import {
  IGetAllParams,
  IList,
  IEvent,
  IEventForm,
  IServiceResult,
  IType,
} from '../@types';
import { useToast } from '../utils/hooks';

export const initialEvent: IEventForm = {
  name: '',
  typeId: -1,
  schedule: {
    id: 0,
    placeId: -1,
    startAt: null,
    duration: null,
  },
  contact: {
    id: 0,
    email: '',
    phone: '',
  },
};

const getAll = async (
  params: IGetAllParams,
): Promise<IList<IEvent> | void> => {
  try {
    const { data } = await api.get('/Event/GetAll', { params });
    if (data) return data;
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

const getTypes = async (): Promise<IList<IType> | void> => {
  try {
    const { data } = await api.get('/EventType/GetAll');
    if (data) return data;
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

const getById = async (id: string): Promise<IEvent | void> => {
  try {
    const { data } = await api.get(`/Event/GetById/${id}`);
    if (data) return data;
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

const create = async (
  record: IEventForm,
): Promise<IServiceResult<number, IEventForm>> => {
  try {
    const result = await api.post(`/Event/Create`, record);
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
  record: IEventForm,
): Promise<IServiceResult<number, IEventForm>> => {
  try {
    const result = await api.put(`/Event/UpdateById/${id}`, record);
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
    const result = await api.delete(`/Event/DeleteById/${id}`);
    if (result) {
      useToast.success('Evento excluido com sucesso');
      return true;
    }
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const eventServices = {
  getAll,
  getTypes,
  getById,
  create,
  updateById,
  deleteById,
};
