export const serverUrl = () => 'http://192.168.1.6:3333';
export const getDeviceListUrl = () => `${serverUrl()}/config`;
export const getToggleDevicePowerUrl = (id: string) => `${serverUrl()}/plug/${id}/power`;