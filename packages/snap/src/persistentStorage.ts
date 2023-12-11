export const setEncryptStorage = async (data) => {
  console.log('setEncryptStorage', data);
  return await snap.request({
    method: 'snap_manageState',
    params: { operation: 'update', newState: { accounts: data } },
  })
};

export const getEncrptStorage = async () => {
  const res =  await snap.request({
    method: 'snap_manageState',
    params: { operation: 'get' },
  });

  console.log('getEncrptStorage', res);
  return res;
}

export const clearEncryptStorage = async () => {
  return await snap.request({
    method: 'snap_manageState',
    params: { operation: 'clear' },
  });
}