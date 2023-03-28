import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Observable, shareReplay, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { LeafletMapService } from '../services/leaflet-map.service';
import * as PageMainActions from './store/page-main.actions';
import * as fromApp from '../store/app.reducer';
import { PromoItem } from './promo.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [LeafletMapService],
})
export class MainPageComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.Small])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  promoSub: Subscription;
  promo: PromoItem;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private leafletMapService: LeafletMapService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.leafletMapService.initMap('map');
    this.store.dispatch(new PageMainActions.FetchItems());
    this.store.dispatch(new PageMainActions.FetchPromo());
    this.promoSub = this.store
      .select('offer')
      .pipe(map((state) => state.promo))
      .subscribe((item: PromoItem) => {
        this.promo = item;
      });
  }

  ngOnDestroy(): void {
    this.promoSub.unsubscribe();
  }
}
