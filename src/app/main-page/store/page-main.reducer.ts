import { OfferItem } from '../../offer-main/offer-page/offer-item.model';
import { PromoItem } from '../promo.model';
import * as PageMainActions from './page-main.actions';

export interface State {
  items: OfferItem[];
  promo: PromoItem;
}

const initState: State = {
  items: [],
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
        items: [...state.items, action.payload],
      };

    case PageMainActions.UPDATE_ITEM:
      const item = state.items[action.payload.index];
      const updatedItem = {
        ...item,
        ...action.payload.item,
      };
      const updatedItems = [...state.items];
      updatedItems[action.payload.index] = updatedItem;
      return {
        ...state,
        items: updatedItems,
      };

    case PageMainActions.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload),
      };

    case PageMainActions.UPDATE_PROMO:
      const promo = state.promo;
      const updatedPromo = {
        ...promo,
        ...action.payload,
      };
      return {
        ...state,
        promo: updatedPromo,
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
