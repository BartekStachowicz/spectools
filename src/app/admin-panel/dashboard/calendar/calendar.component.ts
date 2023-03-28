import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { startOfDay, endOfDay, isSameDay, isSameMonth } from 'date-fns';
import { map, Subject, Subscription } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { OfferItem } from 'src/app/offer-main/offer-page/offer-item.model';
import { CalendarModel } from './calendar.model';
import { CalendarService } from './calendar.service';

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

  test: CalendarModel = {
    idItem: 'asd',
    events: [
      {
        title: 'test1',
        start: new Date(
          'Tue Mar 28 2023 23:59:59 GMT+0200 (czas środkowoeuropejski letni)'
        ),
        end: new Date(
          'Tue Mar 28 2023 23:59:59 GMT+0200 (czas środkowoeuropejski letni)'
        ),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
      {
        title: 'test2',
        start: new Date(
          'Tue Mar 29 2023 23:59:59 GMT+0200 (czas środkowoeuropejski letni)'
        ),
        end: new Date(
          'Tue Mar 30 2023 23:59:59 GMT+0200 (czas środkowoeuropejski letni)'
        ),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
      {
        title: 'test3',
        start: new Date(
          'Tue Apr 10 2023 23:59:59 GMT+0200 (czas środkowoeuropejski letni)'
        ),
        end: new Date(
          'Tue Apr 15 2023 23:59:59 GMT+0200 (czas środkowoeuropejski letni)'
        ),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ],
  };

  activeDayIsOpen: boolean = true;
  offerSubscription: Subscription;
  offerItems: OfferItem[] = [];
  panelOpenState: boolean = false;
  offerItem: OfferItem = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.offerSubscription = this.store
      .select('offer')
      .pipe(map((state) => state.items))
      .subscribe((items: OfferItem[]) => (this.offerItems = items));
  }

  onItemPicked(id: string) {
    const item = this.offerItems.find((item) => item.id === id);
    //pobranie z bazy danych informacji po wybranym ID
    this.offerItem = item;
  }

  onSave() {
    const calendarItem: CalendarModel = {
      idItem: this.offerItem.id,
      events: this.events,
    };

    const testArray = this.calendarService.getDisableDates(this.test);
    console.log(testArray);
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
    this.offerSubscription.unsubscribe();
  }
}
