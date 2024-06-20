import axios, { AxiosError, AxiosResponse } from 'axios';

import { objectToCamel } from 'ts-case-convert';

import { router } from '../router';
import { msgsDict } from '../utils/functions';
import { useCookies, useToast } from '../utils/hooks';

const baseURL = import.meta.env.DEV
  ? import.meta.env.VITE_API_URL
  : '/api';

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use(async (config) => {
  const accessToken = useCookies.get('SG_AT_EP');

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.data instanceof Blob) {
      const reader = new FileReader();
      reader.onload = () => {
        const errorText = reader.result as string;
        try {
          const data = JSON.parse(errorText);
          if (data && data.title) useToast.error(data.title);
        } catch (e) {
          console.log(e);
        }
      };
      reader.readAsText(error.response?.data);
      return Promise.reject(error);
    }
    const response = error.response as AxiosResponse;
    if (!error.response) {
      useToast.error(msgsDict('network'));
      return Promise.reject(error);
    }
    const { data, status } = response;
    switch (status) {
      case 400:
        if (data.errors) {
          for (const key in data.errors) {
            if (data.errors[key]) {
              data.errors[key] = data.errors[key][0];
            }
          }
          const newErrors = objectToCamel(data.errors);

          throw newErrors;
        }
        if (data.title) useToast.error(data.title);
        break;
      case 401:
        useToast.error('Sessão Expirada');
        router.navigate('/sair');
        break;
      case 404:
        useToast.error('Não encontrado');
        break;
      case 403:
        useToast.error('You are not allowed to do that!');
        break;
      case 500:
        useToast.error(msgsDict('network'));
        break;
      default:
        break;
    }
    return Promise.reject(error);
  },
);

export { api };
export * from './AuthServices';
export * from './EventServices';
export * from './LatestServices';
export * from './LocationServices';
export * from './PlaceServices';
