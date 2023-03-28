import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

import { CalendarModel } from '../dashboard/calendar/calendar.model';
import * as fromApp from '../../store/app.reducer';
import * as AdminPanelActions from '../store/admin-panel.actions';

@Injectable({
  providedIn: 'root',
})
export class CalendarEventsResolverService implements Resolve<CalendarModel[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('admin').pipe(
      take(1),
      map((state) => state.events),
      switchMap((items) => {
        if (items.length === 0) {
          this.store.dispatch(new AdminPanelActions.FetchEvents());
          return this.actions$.pipe(
            ofType(AdminPanelActions.SET_EVENTS),
            take(1)
          );
        } else {
          return of(items);
        }
      })
    );
  }
}
