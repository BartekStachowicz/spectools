import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CalendarModel } from './calendar/calendar.model';
import { ManualModel } from './manuals/manuals.model';

const API_CALENDAR_URL = environment.apiURL + environment.apiCalendarKey;
const API_MANUALS_URL = environment.apiURL + environment.apiManuals;

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  calendarEvents: CalendarModel[] = [];
  manuals: ManualModel[] = [];
  private eventsChanged$ = new Subject<CalendarModel[]>();
  private manualChanged$ = new Subject<ManualModel[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getManuals() {
    this.http.get<ManualModel[]>(API_CALENDAR_URL).subscribe((events) => {
      this.manuals = events;
      this.manualChanged$.next(this.manuals);
    });
  }

  updateManual(data: FormData) {
    this.http.patch(API_MANUALS_URL, data).subscribe((response) => {});
  }

  getChangedManual() {
    return this.manualChanged$.asObservable();
  }

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
    const singleCalendar: CalendarModel = calendar.find(
      (el) => el.idItem === id
    );

    if (singleCalendar) {
      return singleCalendar.events.map((el) => {
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
  }

  generateDisableDatesArray(events: any[]) {
    let dates: any[] = [];
    if (events) {
      for (let i = 0; i < events.length; i++) {
        let startDate = events[i].start;
        let stopDate = events[i].end;
        while (startDate <= stopDate) {
          dates.push(startDate);
          startDate = new Date(startDate.getTime() + 60 * 60 * 24 * 1000);
        }
      }
    }

    return dates;
  }
}
