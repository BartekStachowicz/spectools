import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { startOfDay, endOfDay, isSameDay, isSameMonth } from 'date-fns';
import { map, Observable, Subject, Subscription } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { OfferItem } from 'src/app/offer-main/offer-page/offer-item.model';
import { DashboardService } from '../dashboard.services';
import { CalendarModel } from './calendar.model';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
      }

      .example-viewport {
        height: 400px;
        width: 800px;
      }

      .example-item {
        height: 100px;
      }
    `,
  ],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit, OnDestroy {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;
  offerSubscription: Subscription;
  calendarSub: Subscription;
  offerItems: OfferItem[] = [];
  panelOpenState: boolean = false;
  offerItem: OfferItem = null;
  calendarEvents: CalendarModel[] = [];
  timer: ReturnType<typeof setTimeout>;

  constructor(
    private store: Store<fromApp.AppState>,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getCalendarEvents();
    this.offerSubscription = this.store
      .select('offer')
      .pipe(map((state) => state.items))
      .subscribe((items: OfferItem[]) => (this.offerItems = items));
    this.calendarSub = this.dashboardService
      .getChangedEvents()
      .subscribe((events: CalendarModel[]) => {
        this.calendarEvents = events;
      });
  }

  onItemPicked(id: string) {
    this.ngOnInit();
    this.offerItem = this.offerItems.find((item) => item.id === id);
    if (this.calendarEvents.find((el) => el.idItem === this.offerItem.id)) {
      this.events = this.dashboardService.getSingleCalendarEvents(
        this.calendarEvents,
        this.offerItem.id
      );
    } else {
      this.events = [];
    }
    this.panelOpenState = false;
  }

  onSave() {
    const updateEvents: CalendarModel = {
      idItem: this.offerItem.id,
      events: this.events,
    };
    this.dashboardService.updatePost(updateEvents);

    this.timer = setTimeout(() => {
      this.ngOnInit();
    }, 1000);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: this.offerItem.name,
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnDestroy(): void {
    if (this.offerSubscription) {
      this.offerSubscription.unsubscribe();
    }

    if (this.calendarSub) {
      this.calendarSub.unsubscribe();
    }

    clearTimeout(this.timer);
  }
}
