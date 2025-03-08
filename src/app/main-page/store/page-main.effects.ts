import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, Observable, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import { OfferItem } from '../../offer-main/offer-page/offer-item.model';
import * as PageMainActions from './page-main.actions';
import { PromoItem } from '../promo.model';
import * as fromApp from '../../store/app.reducer';
import { environment } from '../../../environments/environment';

const API_URL_OFFER = environment.apiURL + environment.apiOfferKey;
const API_URL_PROMO = environment.apiURL + environment.apiPromoKey;

const TEMP_URL_OFFER = 'assets/offer-items.json';
const TEMP_URL_PROMO = 'assets/promo.json';

@Injectable()
export class PageMainEffects {
  // OFFER

  //get offer items
  fetchItems = createEffect((): Observable<any> => {
    return this.actions$.pipe(
      ofType(PageMainActions.FETCH_ITEMS),
      switchMap(() => {
        return this.http.get<OfferItem[]>(API_URL_OFFER);
      }),
      map((items) => {
        return new PageMainActions.SetItems(items);
      })
    );
  });

  //post new offer item
  addNewItem = createEffect(
    (): Observable<any> => {
      return this.actions$.pipe(
        ofType(PageMainActions.SAVE_NEW_ITEM),
        withLatestFrom(this.store.select('offer')),
        switchMap(([action, state]) => {
          return this.http.post(API_URL_OFFER, state.newItem);
        })
      );
    },
    { dispatch: false }
  );

  //patch updated offer item
  updateItem = createEffect(
    (): Observable<any> => {
      return this.actions$.pipe(
        ofType(PageMainActions.SAVE_UPDATED_ITEM),
        withLatestFrom(this.store.select('offer')),
        switchMap(([action, state]) => {
          return this.http.patch(
            API_URL_OFFER + '/' + state.editedId,
            state.updatedItem
          );
        })
      );
    },
    { dispatch: false }
  );

  //patch updated offer items
  updateAllItems = createEffect(
    (): Observable<any> => {
      return this.actions$.pipe(
        ofType(PageMainActions.SAVE_ALL_UPDATED_ITEMS),
        withLatestFrom(this.store.select('offer')),
        switchMap(([action, state]) => {
          return this.http.patch(API_URL_OFFER + '/all', state.updatedItems);
        })
      );
    },
    { dispatch: false }
  );

  //delete offer item
  deleteItem = createEffect(
    (): Observable<any> => {
      return this.actions$.pipe(
        ofType(PageMainActions.SAVE_DELETED_ITEM),
        withLatestFrom(this.store.select('offer')),
        switchMap(([action, state]) => {
          return this.http.delete(API_URL_OFFER);
        })
      );
    },
    { dispatch: false }
  );

  // PROMO

  //get promo
  fetchPromo = createEffect((): Observable<any> => {
    return this.actions$.pipe(
      ofType(PageMainActions.FETCH_PROMO),
      switchMap(() => {
        return this.http.get<PromoItem>(API_URL_PROMO);
      }),
      map((promo) => {
        return new PageMainActions.SetPromo(promo);
      })
    );
  });

  //patch changed promo
  savePromo = createEffect(
    (): Observable<any> => {
      return this.actions$.pipe(
        ofType(PageMainActions.SAVE_PROMO),
        withLatestFrom(this.store.select('offer')),
        switchMap(([action, state]) => {
          return this.http.patch(API_URL_PROMO, state.updatedPromo);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
