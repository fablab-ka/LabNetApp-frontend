import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import * as actions from './deviceActions';
import { DeviceList, DeviceStateList, DeviceStatus } from './deviceTypes';
export type DeviceAction = ActionType<typeof actions>;

export interface DeviceState {
    deviceStates: DeviceStateList;
    deviceList: DeviceList;
}

const initialUIState: DeviceState = {
    deviceList: {
        nodes: [],
        plugs: [],
        strips: []
    },
    deviceStates: {}
};

export const deviceReducer = combineReducers<DeviceState>({
    deviceList: (state: DeviceList = initialUIState.deviceList, action: DeviceAction): DeviceList => {
        switch (action.type) {
            case getType(actions.updateDeviceList):
                return action.payload;

            default:
                return state;
        }
    },

    deviceStates: (state: DeviceStateList = initialUIState.deviceStates, action: DeviceAction): DeviceStateList => {
        switch (action.type) {
            case getType(actions.updateDeviceList):
                return action.payload.plugs.reduce((acc, plug) => {
                    acc[plug.id] = DeviceStatus.Off;
                    return acc;
                }, {});

            case getType(actions.updatePlugStatusList):
                const newState = {};

                action.payload.forEach((plugStatus) => {
                    newState[plugStatus.plugId] = plugStatus.status;
                });

                return newState;

            case getType(actions.updatePlugStatus):
                return {
                    ...state,
                    [action.payload.plugId]: action.payload.status
                };

            case getType(actions.turnPlugPowerOn):
                return {
                    ...state,
                    [action.payload]: DeviceStatus.On
                };

            case getType(actions.turnPlugPowerOff):
                return {
                    ...state,
                    [action.payload]: DeviceStatus.Off
                };

            default:
                return state;
        }
    },
});
