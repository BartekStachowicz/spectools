import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, Observable, switchMap } from 'rxjs';

import { OfferItem } from '../../offer-main/offer-page/offer-item.model';
import * as PageMainActions from './page-main.actions';
import { PromoItem } from '../promo.model';

@Injectable()
export class PageMainEffects {
  itemsFileAddress = 'assets/offer-items.json';

  fetchItems = createEffect((): Observable<any> => {
    return this.actions$.pipe(
      ofType(PageMainActions.FETCH_ITEMS),
      switchMap(() => {
        return this.http.get<OfferItem[]>(this.itemsFileAddress);
      }),
      map((items) => {
        return new PageMainActions.SetItems(items);
      })
    );
  });

  fetchPromo = createEffect((): Observable<any> => {
    return this.actions$.pipe(
      ofType(PageMainActions.FETCH_ITEMS),
      switchMap(() => {
        return this.http.get<PromoItem>('assets/promo.json');
      }),
      map((promo) => {
        return new PageMainActions.SetPromo(promo[0]);
      })
    );
  });

  constructor(private actions$: Actions, private http: HttpClient) {}
}
