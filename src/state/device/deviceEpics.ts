import { combineEpics, Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, ignoreElements, map, switchMap } from 'rxjs/operators';
import { isActionOf } from "typesafe-actions";

import { getDeviceListUrl, getToggleDevicePowerUrl } from "../helper/urls";
import { RootAction, RootState } from "../rootReducers";
import {
    failedToChangePlugPower,
    failedToUpdateDeviceList,
    fetchDeviceList,
    togglePlugPower,
    turnPlugPowerOff,
    turnPlugPowerOn,
    updateDeviceList
} from "./deviceActions";
import { getDeviceStateById } from "./deviceSelectors";
import { DeviceList, DeviceStatus } from "./deviceTypes";

export const fetchDeviceListEpic: Epic<RootAction, RootAction, RootState> =
    (action$, state$, { ajax }) => action$
        .pipe(
            filter(isActionOf(fetchDeviceList)),
            switchMap(() =>
                ajax.getJSON(getDeviceListUrl(), {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
            ),
            map((response: DeviceList) => updateDeviceList(response)),
            catchError((error) => of(failedToUpdateDeviceList(error)))
    );

export const toggleDevicePowerEpic: Epic<RootAction, RootAction, RootState> =
    (action$, state$) => action$
        .pipe(
            filter(isActionOf(togglePlugPower)),
            map((action) => {
                if (getDeviceStateById(state$.value, action.payload) === DeviceStatus.Off) {
                    return turnPlugPowerOn(action.payload);
                } else if (getDeviceStateById(state$.value, action.payload) === DeviceStatus.On) {
                    return turnPlugPowerOff(action.payload);
                } else {
                    return failedToChangePlugPower('Unknown device state');
                }
            })
        );

export const turnPlugPowerOnEpic: Epic<RootAction, RootAction, RootState> =
    (action$, state$, { ajax }) => action$
        .pipe(
            filter(isActionOf(turnPlugPowerOn)),
            switchMap((action) =>
                ajax.post(getToggleDevicePowerUrl(action.payload), {
                    state: DeviceStatus.On
                },{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
            ),
            // map((response: DeviceList) => updateDeviceList(response)),
            // catchError((error) => of(failedToUpdateDeviceList(error)))
            ignoreElements()
    );

export const turnPlugPowerOffEpic: Epic<RootAction, RootAction, RootState> =
    (action$, state$, { ajax }) => action$
        .pipe(
            filter(isActionOf(turnPlugPowerOff)),
            switchMap((action) =>
                ajax.post(getToggleDevicePowerUrl(action.payload), {
                    state: DeviceStatus.Off
                }, {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
            ),
            // map((response: DeviceList) => updateDeviceList(response)),
            // catchError((error) => of(failedToUpdateDeviceList(error)))
            ignoreElements()
        );

export default combineEpics(
    fetchDeviceListEpic,
    toggleDevicePowerEpic,
    turnPlugPowerOnEpic,
    turnPlugPowerOffEpic,
);