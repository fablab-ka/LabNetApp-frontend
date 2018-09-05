import { combineReducers } from 'redux';

import { DeviceAction, deviceReducer, DeviceState } from './device/deviceReducer';
import { UIAction, uiReducer, UIState } from './ui/uiReducer';

export type RootAction = UIAction | DeviceAction;

export interface RootState {
    ui: UIState;
    device: DeviceState;
}

export const rootReducer = combineReducers<RootState>({
    device: deviceReducer,
    ui: uiReducer,
});
