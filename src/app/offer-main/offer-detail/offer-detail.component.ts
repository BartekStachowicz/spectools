import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfferItem } from '../offer-page/offer-item.model';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LeafletMapService } from 'src/app/leaflet-map.service';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css'],
  providers: [LeafletMapService],
})
export class OfferDetailComponent implements OnInit, OnDestroy {
  offerItem: OfferItem;
  itemId: string;
  id: number;
  offerSubscription: Subscription;

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
    private leafletMapService: LeafletMapService
  ) {}

  ngOnInit(): void {
    this.leafletMapService.initMap('map3');
    this.offerSubscription = this.route.params
      .pipe(
        map((params: Params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select('offer');
        }),
        map((state) => {
          return state.items.find((_, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe((item) => {
        this.offerItem = item;
      });
  }

  ngOnDestroy(): void {
    this.offerSubscription.unsubscribe();
  }
}
