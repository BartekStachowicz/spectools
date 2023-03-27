import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { OfferItem } from '../offer-main/offer-page/offer-item.model';
import * as fromApp from '../store/app.reducer';
import * as OfferMainActions from '../main-page/store/page-main.actions';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { PromoItem } from '../main-page/promo.model';

@Injectable({
  providedIn: 'root',
})
export class PromoResolverService implements Resolve<PromoItem> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('offer').pipe(
      take(1),
      map((state) => {
        return state.promo;
      }),
      switchMap((promo) => {
        if (promo === null) {
          this.store.dispatch(new OfferMainActions.FetchPromo());
          return this.actions$.pipe(
            ofType(OfferMainActions.SET_PROMO),
            take(1)
          );
        } else {
          return of(promo);
        }
      })
    );
  }
}
