import { RootState } from "../rootReducers";

export const getStrips = (state: RootState) => state.device.deviceList.strips || [];
export const getPlugsPerStrip = (state: RootState) => {
    if (!state.device || !state.device.deviceList || !state.device.deviceList.plugs) {
        return {};
    }

    return state.device.deviceList.plugs.reduce((acc, plug) => {
        if (!acc[plug.stripId]) {
            acc[plug.stripId] = [];
        }
        acc[plug.stripId] = [...acc[plug.stripId], plug];
        return acc;
    }, {});
};
export const getDeviceStateById = (state: RootState, plugId: string) =>
    state.device.deviceStates[plugId];
export const getDeviceStates = (state: RootState) =>
    state.device.deviceStates;