import { ActionReducerMap } from '@ngrx/store';

import * as fromOfferMain from 'src/app/offer-main/store/offer-main.reducer';

export interface AppState {
  offer: fromOfferMain.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  offer: fromOfferMain.offerMainReducer,
};
