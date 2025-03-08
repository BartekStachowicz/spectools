import { OfferItem } from '../../offer-main/offer-page/offer-item.model';
import { PromoItem } from '../promo.model';
import * as PageMainActions from './page-main.actions';

export interface State {
  items: OfferItem[];
  newItem: FormData;
  updatedItem: OfferItem | FormData;
  updatedItems: OfferItem[];
  deletedItemId: string;
  editedId: string;
  promo: PromoItem;
  updatedPromo: PromoItem | FormData;
}

const initState: State = {
  items: [],
  newItem: null,
  updatedItem: null,
  updatedItems: [],
  deletedItemId: null,
  editedId: null,
  promo: null,
  updatedPromo: null,
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
        updatedItem: action.payload.item,
        editedId: action.payload.id,
      };

    case PageMainActions.UPDATE_ALL_ITEMS:
      return {
        ...state,
        updatedItems: action.payload,
      };

    case PageMainActions.DELETE_ITEM:
      return {
        ...state,
        deletedItemId: action.payload,
      };

    case PageMainActions.UPDATE_PROMO:
      return {
        ...state,
        updatedPromo: action.payload,
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
