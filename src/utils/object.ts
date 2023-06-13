/**
 * @description: 清除对象中为undefined, null, ""
 * @param {Record} obj
 * @return {*}
 */
const clearEmpty = (obj: Record<string, any>): Record<string, any> => {
  const empty = [null, '', undefined];

  const nObj = Object.assign({}, obj);

  for (const [key, value] of Object.entries(nObj)) {
    empty.includes(value) && delete nObj[key];
  }

  return nObj;
};

export { clearEmpty };
