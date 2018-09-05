import { createStandardAction } from "typesafe-actions";
import { DeviceList } from "./deviceTypes";

export const fetchDeviceList = createStandardAction('@@device/FETCH_DEVICE_LIST')();
export const updateDeviceList = createStandardAction('@@device/UPDATE_DEVICE_LIST')<DeviceList>();
export const failedToUpdateDeviceList = createStandardAction('@@device/FAILED_TO_UPDATE_DEVICE_LIST')<string>();
export const switchDeviceOn = createStandardAction('@@device/SWITCH_DEVICE_ON')<string>();
export const switchDeviceOff = createStandardAction('@@device/SWITCH_DEVICE_OFF')<string>();
export const togglePlugPower = createStandardAction('@@device/TOGGLE_PLUG_POWER')<string>();
export const turnPlugPowerOn = createStandardAction('@@device/TURN_PLUG_POWER_ON')<string>();
export const turnPlugPowerOff = createStandardAction('@@device/TURN_PLUG_POWER_OFF')<string>();
export const failedToChangePlugPower = createStandardAction('@@device/FAILED_TO_CHANGE_PLUG_POWER')<string>();