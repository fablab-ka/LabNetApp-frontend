import { RootState } from 'src/state/rootReducers';

export const getSelectedTab = (state: RootState) => state.ui.currentTab;
