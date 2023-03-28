import { CalendarModel } from '../dashboard/calendar/calendar.model';
import * as AdminPanelActions from './admin-panel.actions';

export interface State {
  events: CalendarModel[];
  updatedEvent: CalendarModel;
  selectedEvent: CalendarModel;
}

const initState: State = {
  events: null,
  updatedEvent: null,
  selectedEvent: null,
};

export function adminPanelReducer(
  state = initState,
  action: AdminPanelActions.AdminPanelActions
) {
  switch (action.type) {
    case AdminPanelActions.SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };

    case AdminPanelActions.UPDATE_SINGLE_EVENTS:
      return {
        ...state,
        updatedEvent: action.payload,
      };

    default:
      return state;
  }
}
