import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CalendarModel } from './calendar.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private http: HttpClient) {}

  getDisableDates(calendarItem: CalendarModel) {
    return this.generateDisableDatesArray(calendarItem);
  }

  private generateDisableDatesArray(calendarItem: CalendarModel) {
    const events = calendarItem.events;
    let dates: any[] = [];
    for (let i = 0; i < events.length; i++) {
      let startDate = events[i].start;
      let stopDate = events[i].end;
      while (startDate <= stopDate) {
        dates.push(startDate);
        startDate = new Date(startDate.getTime() + 60 * 60 * 24 * 1000);
      }
    }
    return dates;
  }
}
