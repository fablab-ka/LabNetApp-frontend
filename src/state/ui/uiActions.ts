import { createStandardAction } from 'typesafe-actions';

import { AppTab } from "src/state/ui/uiTypes";

export const switchTab = createStandardAction('@@ui/SWITCH_TAB')<AppTab>();
