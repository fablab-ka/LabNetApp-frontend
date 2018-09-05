import { combineEpics } from 'redux-observable';

import deviceEpics from './device/deviceEpics';
import uiEpics from './ui/uiEpics';

export const rootEpic = combineEpics(
    deviceEpics,
    uiEpics,
);
