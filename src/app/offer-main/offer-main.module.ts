import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';

import { OfferPageComponent } from './offer-page/offer-page.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { OfferMainComponent } from './offer-main.component';
import { OfferMainRoutingModule } from './offer-main-routing.module';

@NgModule({
  declarations: [OfferPageComponent, OfferDetailComponent, OfferMainComponent],
  imports: [
    MaterialModule,
    HttpClientModule,
    CommonModule,
    OfferMainRoutingModule,
  ],
  providers: [],
  exports: [],
})
export class OfferMainModule {}
