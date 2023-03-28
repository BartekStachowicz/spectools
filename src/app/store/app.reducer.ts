import { ActionReducerMap } from '@ngrx/store';

import * as fromPageMain from 'src/app/main-page/store/page-main.reducer';
import * as fromAdminPanel from 'src/app/admin-panel/store/admin-panel.reducer';

export interface AppState {
  offer: fromPageMain.State;
  admin: fromAdminPanel.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  offer: fromPageMain.pageMainReducer,
  admin: fromAdminPanel.adminPanelReducer,
};
