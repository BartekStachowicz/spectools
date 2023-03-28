import { CalendarEvent } from 'angular-calendar';

export class CalendarModel {
  constructor(public idItem: string, public events: CalendarEvent[]) {}
}
