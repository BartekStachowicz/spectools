import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import { OfferItem } from './offer-item.model';

@Component({
  selector: 'app-offer-page',
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.css'],
})
export class OfferPageComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  isAdminAuth = false;
  offerSubscription: Subscription;
  offerItems: OfferItem[] = [];
  gridCols: number = 2;
  isLoading: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.offerSubscription = this.store
      .select('offer')
      .pipe(map((state) => state.items))
      .subscribe((items: OfferItem[]) => {
        this.isLoading = false;
        this.offerItems = items;
      });
  }

  onViewChange(mode: string) {
    this.viewModeChange(mode);
  }

  ngOnDestroy(): void {
    this.offerSubscription.unsubscribe();
  }

  private viewModeChange(mode: string = 'default') {
    if (mode === 'list') {
      this.gridCols = 1;
    } else if (mode === 'grid') {
      this.gridCols = 2;
    }
  }
}
