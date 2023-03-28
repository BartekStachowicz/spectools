import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { OfferMainComponent } from './offer-main.component';
import { OfferPageComponent } from './offer-page/offer-page.component';
import { OfferResolverService } from '../services/offer-resolver.service';
import { CalendarEventsResolverService } from '../admin-panel/services/calendar-events-resolver.service';

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
        path: ':itemPathId',
        component: OfferDetailComponent,
        resolve: [OfferResolverService, CalendarEventsResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferMainRoutingModule {}
