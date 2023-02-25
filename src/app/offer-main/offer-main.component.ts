import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as OfferMainActions from './store/offer-main.actions';

@Component({
  selector: 'app-offer-main',
  templateUrl: './offer-main.component.html',
  styleUrls: ['./offer-main.component.css'],
})
export class OfferMainComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new OfferMainActions.FetchItems());
  }

  ngOnDestroy(): void {}
}
