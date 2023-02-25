import { OfferItem } from '../offer-page/offer-item.model';
import * as OfferMainActions from './offer-main.actions';

export interface State {
  items: OfferItem[];
}

const initState: State = {
  items: [],
};

export function offerMainReducer(
  state = initState,
  action: OfferMainActions.OfferMainActions
) {
  switch (action.type) {
    case OfferMainActions.SET_ITEMS:
      return {
        ...state,
        items: [...action.payload],
      };

    case OfferMainActions.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case OfferMainActions.UPDATE_ITEM:
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

    case OfferMainActions.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload),
      };

    default:
      return state;
  }
}
