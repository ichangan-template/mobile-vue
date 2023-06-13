import { showToast } from 'vant';
import SDK from '@ichangan/ica-sdk';
import { formDevRescenterToken, getUserInfoByToken } from '@/api/user';
import { setUserInfo, setChanganToken } from './storage';

// cacheToken配置为true不会在本地环境重置ichangan token
export const initUserBase = async (
  option: { cacheToken: boolean } = {
    // 默认每次重新获取token
    cacheToken: false,
  },
) => {
  // 本地环境获取token和用户信息
  if (SDK.loaded) {
    try {
      await SDK.login?.({ useCache: false, lazy: true });
    } catch (error) {
      console.error('catch error', error);
    }
  } else {
    if (option.cacheToken) return;
    const tokenRes = await formDevRescenterToken();
    (tokenRes?.data?.isSuccess && setChanganToken(tokenRes?.data.msg)) || showToast(tokenRes?.data.msg);
    const userRes = await getUserInfoByToken();
    if (userRes.success) {
      setUserInfo({ loginID: userRes?.data?.loginID, userFullName: userRes?.data?.name });
    } else {
      showToast('获取用户信息失败');
    }
  }
};
