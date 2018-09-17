import { combineEpics, Epic } from "redux-observable";
import { of } from "rxjs";
import { catchError, filter, ignoreElements, map, switchMap } from 'rxjs/operators';
import { isActionOf } from "typesafe-actions";

import { getDeviceListUrl, getToggleDevicePowerUrl } from "../../libs/urls";
import { RootAction, RootState } from "../rootReducers";
import {
    failedToChangePlugPower,
    failedToTogglePlugPower,
    failedToUpdateDeviceList,
    failedToUpdatePlugStatus,
    failedToUpdatePlugStatusList,
    fetchDeviceList,
    togglePlugPower,
    turnPlugPowerOff,
    turnPlugPowerOn,
    updateDeviceList,
    updatePlugStatus,
    updatePlugStatusList
} from "./deviceActions";
import { getDeviceStateById } from "./deviceSelectors";
import { DeviceList, DeviceStatus, PlugStatus } from "./deviceTypes";

export const startListeningToSocketDeviceEventsEpic: Epic<RootAction, RootAction, RootState> =
    (action$, _, { socket }) => action$
        .pipe(
            filter(isActionOf(fetchDeviceList)),
            map(() => socket.observable('plugList')),
            map((response: DeviceList) => updateDeviceList(response)),
            catchError((error) => of(failedToUpdateDeviceList(error)))
        );

export const listeningToSocketDeviceEventsEpic: Epic<RootAction, RootAction, RootState> =
    (_, __, { socket }) =>
        socket.observable('plugList')
            .pipe(
                map((response: DeviceList) => updateDeviceList(response)),
                catchError((error) => of(failedToUpdateDeviceList(error)))
            );

export const listeningToSocketPlugStatusEpic: Epic<RootAction, RootAction, RootState> =
    (_, __, { socket }) =>
        socket.observable('plugStatus')
            .pipe(
                map((response: PlugStatus) => updatePlugStatus(response)),
                catchError((error) => of(failedToUpdateDeviceList(error)))
            );

export const plugStatusListSocketEpic: Epic<RootAction, RootAction, RootState> =
    (action$, _, { socket }) => action$
        .pipe(
            filter(isActionOf(fetchDeviceList)),
            map(() => socket.observable('plugStatusList')),
            map((response: PlugStatus[]) => updatePlugStatusList(response)),
            catchError((error) => of(failedToUpdatePlugStatusList(error)))
        );

export const plugStatusSocketEpic: Epic<RootAction, RootAction, RootState> =
    (action$, _, { socket }) => action$
        .pipe(
            filter(isActionOf(fetchDeviceList)),
            map(() => socket.observable('plugStatus')),
            map((response: PlugStatus) => updatePlugStatus(response)),
            catchError((error) => of(failedToUpdatePlugStatus(error)))
        );

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
            }),
            catchError((error) => of(failedToTogglePlugPower(error)))
        );

export const turnPlugPowerOnEpic: Epic<RootAction, RootAction, RootState> =
    (action$, _, { ajax }) => action$
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
            ignoreElements(),
            catchError((error) => of(failedToTogglePlugPower(error)))
    );

export const turnPlugPowerOffEpic: Epic<RootAction, RootAction, RootState> =
    (action$, _, { ajax }) => action$
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
            ignoreElements(),
            catchError((error) => of(failedToTogglePlugPower(error)))
        );

export default combineEpics(
    fetchDeviceListEpic,
    toggleDevicePowerEpic,
    turnPlugPowerOnEpic,
    turnPlugPowerOffEpic,
    listeningToSocketDeviceEventsEpic,
    listeningToSocketPlugStatusEpic
);