import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, Observable, switchMap } from 'rxjs';

import { OfferItem } from '../offer-page/offer-item.model';
import * as fromApp from '../../store/app.reducer';
import * as OfferMainActions from './offer-main.actions';

@Injectable()
export class OfferMainEffects {
  itemsFileAddress = 'assets/offer-items.json';

  fetchItems = createEffect((): Observable<any> => {
    return this.actions$.pipe(
      ofType(OfferMainActions.FETCH_ITEMS),
      switchMap(() => {
        return this.http.get<OfferItem[]>(this.itemsFileAddress);
      }),
      map((items) => {
        return new OfferMainActions.SetItems(items);
      })
    );
  });

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
