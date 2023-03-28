import { Action } from '@ngrx/store';
import { CalendarModel } from '../dashboard/calendar/calendar.model';

export const FETCH_EVENTS = '[CALENDAR] FETCH_EVENTS';
export const SET_EVENTS = '[CALENDAR] SET_EVENTS';
export const UPDATE_SINGLE_EVENTS = '[CALENDAR] UPDATE_SINGLE_EVENTS';
export const SAVE_SINGLE_EVENTS = '[CALENDAR] SAVE_SINGLE_EVENTS';

export class SaveSingleEvents implements Action {
  readonly type = SAVE_SINGLE_EVENTS;
}

export class FetchEvents implements Action {
  readonly type = FETCH_EVENTS;
}

export class SetEvents implements Action {
  readonly type = SET_EVENTS;
  constructor(public payload: CalendarModel[]) {}
}

export class UpdateSingleEvents implements Action {
  readonly type = UPDATE_SINGLE_EVENTS;
  constructor(public payload: CalendarModel) {}
}

export type AdminPanelActions =
  | FetchEvents
  | SetEvents
  | UpdateSingleEvents
  | SaveSingleEvents;
