import qs from 'qs';
import type { AxiosRequestConfig } from 'axios';
import request from './interceptors';
import { getChanganToken } from '../base/storage';
import { clearEmpty } from '../object';

const masUrl = import.meta.env.ICA_MAS_URL;

export const getMobileAction = async (params: Record<string, any>, config?: AxiosRequestConfig): Promise<any> =>
  request.get('WFMService/servlet/MobileAction', {
    params: {
      IdentityToken: getChanganToken(),
      ...clearEmpty(params),
    },
    baseURL: masUrl,
    ...config,
  });

export const postMobileAction = (data: Record<string, any>, config?: AxiosRequestConfig): Promise<any> =>
  request.post(
    'WFMService/servlet/MobileAction',
    qs.stringify({
      IdentityToken: getChanganToken(),
      ...clearEmpty(data),
    }),
    {
      baseURL: masUrl,
      ...config,
    },
  );

export const getSearchAction = async (params: Record<string, any>, config?: AxiosRequestConfig): Promise<any> =>
  request.get('WFMService/servlet/SearchAction', {
    params: {
      IdentityToken: getChanganToken(),
      ...clearEmpty(params),
    },
    baseURL: masUrl,
    ...config,
  });

export const form = (url: string, data: Record<string, any>, config?: AxiosRequestConfig): Promise<any> =>
  request.post(url, clearEmpty(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    ...config,
  });

export const get = (url: string, config?: AxiosRequestConfig): Promise<any> =>
  request.get(url, {
    ...config,
    params: {
      ...config?.params,
      IdentityToken: getChanganToken(),
    },
  });

export const post = (url: string, data: Record<string, any>, config?: AxiosRequestConfig): Promise<any> =>
  request.post(
    url,
    qs.stringify({
      IdentityToken: getChanganToken(),
      ...clearEmpty(data),
    }),
    {
      ...config,
    },
  );
