import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { OfferDetailComponent } from './offer-main/offer-detail/offer-detail.component';
import { OfferMainComponent } from './offer-main/offer-main.component';
import { OfferPageComponent } from './offer-main/offer-page/offer-page.component';
import { RegulaminPageComponent } from './regulamin-page/regulamin-page.component';
import { OfferResolverService } from './offer-main/offer-resolver.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent, pathMatch: 'full' },
  {
    path: 'oferta',
    component: OfferMainComponent,
    children: [
      { path: '', component: OfferPageComponent },
      {
        path: ':itemId/:id',
        component: OfferDetailComponent,
        resolve: [OfferResolverService],
      },
    ],
  },

  { path: 'regulamin', component: RegulaminPageComponent },
  { path: 'kontakt', component: ContactPageComponent },
  { path: 'admin-settings', component: AdminDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
