import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Observable, shareReplay, Subscription } from 'rxjs';

import { LeafletMapService } from '../leaflet-map.service';

import { OfferItem } from '../offer-main/offer-page/offer-item.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [LeafletMapService],
})
export class MainPageComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  offerSubscription: Subscription;
  offerItems: OfferItem[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private leafletMapService: LeafletMapService
  ) {}

  ngOnInit(): void {
    this.leafletMapService.initMap('map');
  }

  ngOnDestroy(): void {}
}
