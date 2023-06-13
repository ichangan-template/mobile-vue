import { showToast } from 'vant';
import SDK, { HOST } from '@ichangan/ica-sdk';
import { getUserInfoByEmployeeNumber } from '@/api/user';

interface ChosenPerson {
  id: string;
  name: string;
  employeeNumber: string;
  department?: string;
  avatar?: string;
}

interface SelectEnterpriseContactOptions {
  fromDepartmentId: 0 | -1; // 表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
  mode: 'multi' | 'single'; // 必填，选择模式，single表示单选，multi表示多选
  selectedDepartmentIds?: string[]; //已选部门ID列表。用于多次选人时可重入，single模式下请勿填入多个id
  selectedUserIds?: string[]; // 已选用户ID列表。用于多次选人时可重入，single模式下请勿填入多个id
}

// 双平台多选
export const singleSelectContacts = async () => {
  let userList = [];

  if (SDK.host === HOST.HOST_TYPE.WEWORK) {
    const [selectedUserList, selectedDepartmentList] = await selectEnterpriseContact().catch((err) =>
      console.error(err),
    );
    userList = selectedUserList;
  } else if (SDK.host === HOST.HOST_TYPE.WELINK) {
    const selectedUserList = await welinkSelectContacts({
      isSingleSelection: false,
    });
    userList = selectedUserList;
  }

  const chosenPerson = await integrateEmployeeInfo(userList);
  return chosenPerson;
};

// 双平台单选
export const multipleSelectContacts = async () => {
  let userList = [];

  if (SDK.host === HOST.HOST_TYPE.WEWORK) {
    const [selectedUserList, selectedDepartmentList] = await selectEnterpriseContact({ mode: 'single' }).catch((err) =>
      console.error(err),
    );
    userList = selectedUserList;
  } else if (SDK.host === HOST.HOST_TYPE.WELINK) {
    const selectedUserList = await welinkSelectContacts({
      isSingleSelection: true,
    });
    userList = selectedUserList;
  }

  const chosenPerson = await integrateEmployeeInfo(userList);
  return chosenPerson;
};

// 对获取到的用户信息整合处理
export const integrateEmployeeInfo = async (list: { id: string; [key: string]: any }[]): Promise<ChosenPerson[]> => {
  const asyncFun: Promise<any>[] = [];
  list.forEach((i) => {
    asyncFun.push(getUserInfoByEmployeeNumber(i.id));
  });

  const res = await Promise.all(asyncFun).catch((err) => {
    console.error(err);
    showToast('获取员工信息失败');
  });

  const rawEmployeeInfo = res?.map((i: any) => {
    if (i.result !== '200') {
      throw new Error('请求结果不为200，未知错误');
    }
    return formatRawUserInfo(i?.data);
  });

  return list.map((l) => {
    const sEmployeeInfo = rawEmployeeInfo?.filter((e) => e.employeeNumber === l.id);

    return {
      id: sEmployeeInfo && sEmployeeInfo[0]?.userId,
      employeeNumber: l.id,
      name: l.name,
      avatar: l.avatar,
    };
  });
};

// 企业微信选人
export const selectEnterpriseContact = async (options?: Partial<SelectEnterpriseContactOptions>): Promise<any> => {
  const defaultOptions = {
    fromDepartmentId: -1, // 必填，表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
    mode: 'multi', // 必填，选择模式，single表示单选，multi表示多选
    type: ['user'], // 必填，选择限制类型，指定department、user中的一个或者多个
    selectedDepartmentIds: [], // 非必填，已选部门ID列表。用于多次选人时可重入，single模式下请勿填入多个id
    selectedUserIds: [], // 非必填，已选用户ID列表。用于多次选人时可重入，single模式下请勿填入多个id
  };

  const res: any = await SDK.selectContacts?.({ ...defaultOptions, ...options } as any);

  if (res?.err_msg == 'selectEnterpriseContact:ok') {
    if (typeof res.result == 'string') {
      res.result = JSON.parse(res.result); //由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
    }

    const selectedDepartmentList = res.result.departmentList; // 已选的部门列表
    const selectedUserList = res.result.userList; // 已选的成员列表

    console.log('----wx selectEnterpriseContact res', selectedUserList, selectedDepartmentList);

    return [selectedUserList, selectedDepartmentList] as const;
  }
};

// welink选人
export const welinkSelectContacts = async (config: { isSingleSelection: boolean }): Promise<any> => {
  const res: any = await SDK.selectContacts?.({
    needCallback: true,
    isSingleSelection: config.isSingleSelection,
  } as any);

  console.log('----welink select contacts res', res);
  return res.data.map((i: any) => ({
    ...i,
    id: i.corpUserId,
    name: i.chineseName,
    avatar: '',
  }));
};

const formatRawUserInfo = (i: any) => ({
  employeeNumber: i.loginID,
  userId: i.userId,
});
