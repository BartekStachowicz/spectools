import { OfferItem } from '../../offer-main/offer-page/offer-item.model';
import { PromoItem } from '../promo.model';
import * as PageMainActions from './page-main.actions';

export interface State {
  items: OfferItem[];
  newItem: OfferItem;
  updatedItem: OfferItem;
  deletedItemId: string;
  promo: PromoItem;
}

const initState: State = {
  items: [],
  newItem: null,
  updatedItem: null,
  deletedItemId: null,
  promo: null,
};

export function pageMainReducer(
  state = initState,
  action: PageMainActions.PageMainActions
) {
  switch (action.type) {
    case PageMainActions.SET_ITEMS:
      return {
        ...state,
        items: [...action.payload],
      };

    case PageMainActions.ADD_ITEM:
      return {
        ...state,
        newItem: action.payload,
      };

    case PageMainActions.UPDATE_ITEM:
      return {
        ...state,
        updatedItem: action.payload,
      };

    case PageMainActions.DELETE_ITEM:
      return {
        ...state,
        deletedItemId: action.payload,
      };

    case PageMainActions.UPDATE_PROMO:
      return {
        ...state,
        promo: action.payload,
      };

    case PageMainActions.SET_PROMO:
      return {
        ...state,
        promo: action.payload,
      };

    default:
      return state;
  }
}
