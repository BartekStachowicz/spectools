import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OfferResolverService } from '../services/offer-resolver.service';
import { PromoResolverService } from '../services/promo-resolver.service';
import { AdminPanelComponent } from './admin-panel.component';
import { AuthGuard } from './auth/auth-guard';
import { CalendarComponent } from './dashboard/calendar/calendar.component';
import { MainPanelComponent } from './dashboard/main-panel.component';
import { OfferEditComponent } from './dashboard/offer-edit/offer-edit.component';
import { PromoEditComponent } from './dashboard/promo-edit/promo-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children: [
      {
        canActivate: [AuthGuard],
        path: 'dashboard',
        component: MainPanelComponent,
      },

      {
        canActivate: [AuthGuard],
        path: 'dashboard/offer/:mode',
        component: OfferEditComponent,
        resolve: [OfferResolverService],
      },
      {
        canActivate: [AuthGuard],
        path: 'dashboard/promo-edit',
        component: PromoEditComponent,
      },
      {
        canActivate: [AuthGuard],
        path: 'dashboard/calendar',
        component: CalendarComponent,
        resolve: [OfferResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelRoutingModule {}
