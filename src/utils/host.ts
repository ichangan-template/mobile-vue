import Base64 from 'base-64';
import { getUserInfo, getChanganToken } from './base/storage';
import SDK, { HOST } from '@ichangan/ica-sdk';

const masUrl = import.meta.env.ICA_MAS_URL;

export const wxApiList = ['selectEnterpriseContact', 'previewFile'];

export const welinkApiList = ['selectContacts'];

export const initApiList = () => {
  if (SDK.host === HOST.HOST_TYPE.WEWORK) {
    return wxApiList;
  } else if (SDK.host === HOST.HOST_TYPE.WELINK) {
    return welinkApiList;
  } else {
    return [];
  }
};

export const initClientId = () => {
  const wxClientId = import.meta.env.ICA_WX_AGENT_ID;
  const welinkClientId = import.meta.env.ICA_WELINK_CLIENT_ID;

  switch (SDK.host) {
    case HOST.HOST_TYPE.WELINK:
      return welinkClientId;
    case HOST.HOST_TYPE.WEWORK:
      return wxClientId;
  }
};

export const icaPreviewFile = (href: string, fileName: string) => {
  // 无法encode中文名filename
  fileName = 'rename.' + fileName.split('.')[1];
  const fullHref = `${href}&fullfilename=${fileName}`;
  const jumpUrl = `${masUrl}filepreview/onlinePreview?url=${encodeURIComponent(
    Base64.encode(fullHref),
  )}&watermarkTxt=${encodeURIComponent(getUserInfo()?.loginID || '')}&token=${getChanganToken()}`;

  window.location.assign(jumpUrl);
};
