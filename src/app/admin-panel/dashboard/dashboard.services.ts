import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CalendarModel } from './calendar/calendar.model';

const API_CALENDAR_URL = environment.apiURL + environment.apiCalendarKey;

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  calendarEvents: CalendarModel[] = [];
  private eventsChanged$ = new Subject<CalendarModel[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getCalendarEvents() {
    this.http.get<CalendarModel[]>(API_CALENDAR_URL).subscribe((events) => {
      this.calendarEvents = events;
      this.eventsChanged$.next(this.calendarEvents);
    });
  }

  updatePost(events: CalendarModel) {
    this.http.patch(API_CALENDAR_URL, events).subscribe((response) => {});
  }

  getChangedEvents() {
    return this.eventsChanged$.asObservable();
  }

  getSingleCalendarEvents(calendar: CalendarModel[], id: string) {
    return calendar
      .find((el) => el.idItem === id)
      .events.map((el) => {
        return {
          color: el.color,
          draggable: el.draggable,
          resizable: el.resizable,
          title: el.title,
          start: new Date(el.start),
          end: new Date(el.end),
        };
      });
  }

  generateDisableDatesArray(events: any[]) {
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
