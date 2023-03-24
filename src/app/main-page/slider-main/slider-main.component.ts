import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { OfferItem } from 'src/app/offer-main/offer-page/offer-item.model';

import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-slider-main',
  templateUrl: './slider-main.component.html',
  styleUrls: ['./slider-main.component.css'],
})
export class SliderMainComponent {
  offerSubscription: Subscription;
  offerItems: OfferItem[] = [];
  responsiveOptions;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {
    this.responsiveOptions = [
      {
        breakpoint: '1980px',
        numVisible: 4,
        numScroll: 1,
      },
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '320px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  onNavigate(itemPathId: string) {
    let index = this.offerItems.findIndex((item) => {
      return item.itemPathId === itemPathId;
    });
    this.router.navigate(['/oferta', itemPathId]);
  }

  ngOnInit(): void {
    this.offerSubscription = this.store
      .select('offer')
      .pipe(map((state) => state.items))
      .subscribe((items: OfferItem[]) => (this.offerItems = items));
  }
  ngOnDestroy(): void {
    this.offerSubscription.unsubscribe();
  }
}
