import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { OfferMainComponent } from './offer-main.component';
import { OfferPageComponent } from './offer-page/offer-page.component';
import { OfferResolverService } from '../services/offer-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: OfferMainComponent,
    children: [
      {
        path: '',
        component: OfferPageComponent,
        resolve: [OfferResolverService],
      },
      {
        path: ':itemId/:id',
        component: OfferDetailComponent,
        resolve: [OfferResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferMainRoutingModule {}
