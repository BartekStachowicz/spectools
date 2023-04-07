import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Observable, shareReplay, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { LeafletMapService } from '../services/leaflet-map.service';
import { PromoItem } from './promo.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as PageMainActions from './store/page-main.actions';
import * as fromApp from '../store/app.reducer';

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
  form: FormGroup;
  price: string | boolean;
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
    this.initForm();
  }

  onCheck() {
    const address = this.form.value.address + ' ' + this.form.value.postalCode;
    this.onCheckDistance(address);
  }

  private async onCheckDistance(address: string) {
    this.price = await this.leafletMapService.geoSearch(address);
  }

  private initForm() {
    this.form = new FormGroup({
      address: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{2}-[0-9]{3}$'),
      ]),
    });
  }

  ngOnDestroy(): void {
    this.promoSub.unsubscribe();
  }
}
