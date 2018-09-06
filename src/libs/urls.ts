import config from 'src/config';

export const serverUrl = () => config.serverUrl;
export const getDeviceListUrl = () => `${serverUrl()}/config`;
export const getToggleDevicePowerUrl = (id: string) => `${serverUrl()}/plug/${id}/power`;