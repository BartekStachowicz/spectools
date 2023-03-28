import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, Observable, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import * as AdminPanelActions from './admin-panel.actions';
import { CalendarModel } from '../dashboard/calendar/calendar.model';
import { environment } from 'src/environments/environment';
import * as fromApp from '../../store/app.reducer';

const API_URL_CALENDAR = environment.apiURL + environment.apiCalendarKey;

@Injectable()
export class AdminPanelEffects {
  fetchAllEvents = createEffect((): Observable<any> => {
    return this.actions$.pipe(
      ofType(AdminPanelActions.FETCH_EVENTS),
      switchMap(() => {
        return this.http.get<CalendarModel[]>(API_URL_CALENDAR);
      }),
      map((events) => {
        return new AdminPanelActions.SetEvents(events);
      })
    );
  });

  saveSingleEvents = createEffect(
    (): Observable<any> => {
      return this.actions$.pipe(
        ofType(AdminPanelActions.SAVE_SINGLE_EVENTS),
        withLatestFrom(this.store.select('admin')),
        switchMap(([action, state]) => {
          return this.http.patch(API_URL_CALENDAR, state.updatedEvent);
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
