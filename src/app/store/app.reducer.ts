import { ActionReducerMap } from '@ngrx/store';

import * as fromPageMain from 'src/app/main-page/store/page-main.reducer';
export interface AppState {
  offer: fromPageMain.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  offer: fromPageMain.pageMainReducer,
};
