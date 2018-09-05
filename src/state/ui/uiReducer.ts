import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { AppTab } from 'src/state/ui/uiTypes';

import * as actions from './uiActions';
export type UIAction = ActionType<typeof actions>;

export interface UIState {
    currentTab: AppTab;
}

const initialUIState: UIState = {
    currentTab: AppTab.ControlCenter
};

export const uiReducer = combineReducers<UIState>({
    currentTab: (state: AppTab = initialUIState.currentTab, action: UIAction): AppTab => {
        switch (action.type) {
            case getType(actions.switchTab):
                return action.payload;

            default:
                return state;
        }
    }
});
