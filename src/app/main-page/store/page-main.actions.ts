import { Action } from '@ngrx/store';
import { OfferItem } from '../../offer-main/offer-page/offer-item.model';
import { PromoItem } from '../promo.model';

export const FETCH_ITEMS = '[OFFER] FETCH_ITEMS';
export const SAVE_NEW_ITEM = '[OFFER] SAVE_NEW_ITEM';
export const SAVE_UPDATED_ITEM = '[OFFER] SAVE_UPDATED_ITEM';
export const SET_ITEMS = '[OFFER] SET_ITEMS';
export const ADD_ITEM = '[OFFER] ADD_ITEM';
export const UPDATE_ITEM = '[OFFER] UPDATE_ITEM';
export const DELETE_ITEM = '[OFFER] DELETE_ITEM';
export const SAVE_DELETED_ITEM = '[OFFER] SAVE_DELETED_ITEM';

export const UPDATE_PROMO = '[PROMO] UPDATE_PROMO';
export const FETCH_PROMO = '[PROMO] FETCH_PROMO';
export const SET_PROMO = '[PROMO] SET_PROMO';
export const SAVE_PROMO = '[PROMO] SAVE_PROMO';

export class FetchItems implements Action {
  readonly type = FETCH_ITEMS;
}

export class SaveNewItem implements Action {
  readonly type = SAVE_NEW_ITEM;
}
export class SaveUpdatedItem implements Action {
  readonly type = SAVE_UPDATED_ITEM;
}

export class SaveDeletedItem implements Action {
  readonly type = SAVE_DELETED_ITEM;
}

export class SetItems implements Action {
  readonly type = SET_ITEMS;
  constructor(public payload: OfferItem[]) {}
}

export class AddItem implements Action {
  readonly type = ADD_ITEM;
  constructor(public payload: FormData) {}
}

export class UpdateItem implements Action {
  readonly type = UPDATE_ITEM;
  constructor(public payload: { item: OfferItem | FormData; id: string }) {}
}

export class DeleteItem implements Action {
  readonly type = DELETE_ITEM;
  constructor(public payload: string) {}
}

export class SavePromo implements Action {
  readonly type = SAVE_PROMO;
}

export class UpdatePromo implements Action {
  readonly type = UPDATE_PROMO;
  constructor(public payload: PromoItem | FormData) {}
}

export class FetchPromo implements Action {
  readonly type = FETCH_PROMO;
}

export class SetPromo implements Action {
  readonly type = SET_PROMO;
  constructor(public payload: PromoItem) {}
}

export type PageMainActions =
  | FetchItems
  | SaveNewItem
  | SaveUpdatedItem
  | SetItems
  | AddItem
  | UpdateItem
  | DeleteItem
  | UpdatePromo
  | FetchPromo
  | SetPromo
  | SavePromo;
