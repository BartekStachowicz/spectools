import { Action } from '@ngrx/store';
import { OfferItem } from '../../offer-main/offer-page/offer-item.model';
import { PromoItem } from '../promo.model';

export const FETCH_ITEMS = '[OFFER] FETCH_ITEMS';
export const STORE_ITEMS = '[OFFER] STORE_ITEMS';
export const SET_ITEMS = '[OFFER] SET_ITEMS';
export const ADD_ITEM = '[OFFER] ADD_ITEM';
export const UPDATE_ITEM = '[OFFER] UPDATE_ITEM';
export const DELETE_ITEM = '[OFFER] DELETE_ITEM';

export const UPDATE_PROMO = '[PROMO] UPDATE_PROMO';
export const FETCH_PROMO = '[PROMO] FETCH_PROMO';
export const SET_PROMO = '[PROMO] SET_PROMO';

export class FetchItems implements Action {
  readonly type = FETCH_ITEMS;
}

export class StoreItems implements Action {
  readonly type = STORE_ITEMS;
}

export class SetItems implements Action {
  readonly type = SET_ITEMS;
  constructor(public payload: OfferItem[]) {}
}

export class AddItem implements Action {
  readonly type = ADD_ITEM;
  constructor(public payload: OfferItem) {}
}

export class UpdateItem implements Action {
  readonly type = UPDATE_ITEM;
  constructor(public payload: { index: number; item: OfferItem }) {}
}

export class DeleteItem implements Action {
  readonly type = DELETE_ITEM;
  constructor(public payload: number) {}
}

export class UpdatePromo implements Action {
  readonly type = UPDATE_PROMO;
  constructor(public payload: PromoItem) {}
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
  | StoreItems
  | SetItems
  | AddItem
  | UpdateItem
  | DeleteItem
  | UpdatePromo
  | FetchPromo
  | SetPromo;
