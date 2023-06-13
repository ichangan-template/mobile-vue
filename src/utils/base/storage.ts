import { ICA_TOKEN, ICA_USER_INFO } from '@/config/constants';

export type UserInfo = {
  enabled?: boolean;
  userId?: string;
  userFullName?: string;
  loginID?: string;
  department?: string;
  departmentId?: string;
  userDesc?: string;
  lastUpdatedDate?: string;
  title?: string;
  telNumber?: string;
  mobileNumber?: string;
  userCode?: string;
  organizationId?: string;
  otherDepartmentList?: string;
  grade?: string;
  email?: string;
};

// 设置用户token
export const getChanganToken = () => {
  const token = localStorage.getItem(ICA_TOKEN);
  return token;
};

export const removeChanganToken = () => {
  localStorage.removeItem(ICA_TOKEN);
};

export const setChanganToken = (token: string) => {
  removeChanganToken();
  if (token) {
    localStorage.setItem(ICA_TOKEN, token);
  }
};
//

// 设置用户信息
export const getUserInfo = (): UserInfo => {
  const info = localStorage.getItem(ICA_USER_INFO) || '{}';
  return JSON.parse(info);
};

export const removeUserInfo = () => {
  localStorage.removeItem(ICA_USER_INFO);
};

export const setUserInfo = (info: UserInfo) => {
  removeUserInfo();

  if (info) {
    localStorage.setItem(ICA_USER_INFO, JSON.stringify(info));
  }
};
//
