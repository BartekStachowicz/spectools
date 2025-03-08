import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as MainPageActions from '../../../main-page/store/page-main.actions';
import { Subscription, map } from 'rxjs';
import { OfferItem } from 'src/app/offer-main/offer-page/offer-item.model';

@Component({
  selector: 'app-offer-position',
  templateUrl: './offer-position.component.html',
  styleUrls: ['./offer-position.component.css'],
})
export class OfferPositionComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {}

  offerSubscription: Subscription;
  offerItems: OfferItem[] = [];
  newOffer: OfferItem[] = [];

  ngOnInit(): void {
    this.store.dispatch(new MainPageActions.FetchItems());

    this.offerSubscription = this.store
      .select('offer')
      .pipe(map((state) => state.items))
      .subscribe((items: OfferItem[]) => {
        // this.offerItems = items;
        this.newOffer = [...items];
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.newOffer, event.previousIndex, event.currentIndex);
  }

  ngOnDestroy(): void {
    if (this.offerSubscription) {
      this.offerSubscription.unsubscribe();
    }
  }
}
