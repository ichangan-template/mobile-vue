import { form, get } from '@/utils/network/index';
import { devLoginResecenterParams } from '@/config/user';
import { getChanganToken } from '@/utils/base/storage';

const masUrl = import.meta.env.ICA_MAS_URL;

export const formDevRescenterToken = () =>
  form('resapi/rest/resRestApi/v2/userLogin', devLoginResecenterParams, {
    baseURL: masUrl,
  });

export const getUserInfoByToken = () =>
  get('cameap/app/contact/getCurrentContact', {
    baseURL: masUrl,
    params: {
      IdentityToken: getChanganToken(),
    },
  });

export const getUserInfoByEmployeeNumber = (employeeNumber: string) =>
  get('resapi/rest/resRestApi/v2/getUserByLoginId', {
    baseURL: masUrl,
    params: {
      identityToken: getChanganToken(),
      loginId: employeeNumber,
    },
  });
