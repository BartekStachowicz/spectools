import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { OfferItem } from '../offer-page/offer-item.model';
import { LeafletMapService } from 'src/app/services/leaflet-map.service';
import { CalendarModel } from 'src/app/admin-panel/dashboard/calendar/calendar.model';
import { DashboardService } from 'src/app/admin-panel/dashboard/dashboard.services';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css'],
  providers: [LeafletMapService],
})
export class OfferDetailComponent implements OnInit, OnDestroy {
  offerItem: OfferItem;
  itemPathId: string;
  id: number;
  offerSubscription: Subscription;
  calendarSub: Subscription;
  calendar: CalendarModel[];
  calendarEvent: CalendarEvent[];
  disableDates = [];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private breakpointObserver: BreakpointObserver,
    private leafletMapService: LeafletMapService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getCalendarEvents();
    this.leafletMapService.initMap('map3');
    this.offerSubscription = this.route.params
      .pipe(
        map((params: Params) => {
          return params['itemPathId'];
        }),
        switchMap((itemPathId) => {
          this.itemPathId = itemPathId;
          return this.store.select('offer');
        }),
        map((state) => {
          return state.items.find((item) => {
            return item.itemPathId === this.itemPathId;
          });
        })
      )
      .subscribe((item) => {
        this.offerItem = item;
      });

    if (this.offerItem.calendarFlag) {
      this.calendarSub = this.dashboardService
        .getChangedEvents()
        .subscribe((events: CalendarModel[]) => {
          this.calendar = events;
          this.calendarEvent = this.dashboardService.getSingleCalendarEvents(
            this.calendar,
            this.offerItem.id
          );
          this.disableDates = this.dashboardService.generateDisableDatesArray(
            this.calendarEvent
          );
        });
    }
  }

  ngOnDestroy(): void {
    if (this.offerSubscription) {
      this.offerSubscription.unsubscribe();
    }
    if (this.calendarSub) {
      this.calendarSub.unsubscribe();
    }
  }
}
