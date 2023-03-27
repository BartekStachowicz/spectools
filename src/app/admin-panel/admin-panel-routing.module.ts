import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferResolverService } from '../services/offer-resolver.service';
import { PromoResolverService } from '../services/promo-resolver.service';
import { AdminPanelComponent } from './admin-panel.component';
import { MainPanelComponent } from './dashboard/main-panel.component';
import { OfferEditComponent } from './dashboard/offer-edit/offer-edit.component';
import { PromoEditComponent } from './dashboard/promo-edit/promo-edit.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'dashboard',
        component: MainPanelComponent,
      },

      {
        path: 'dashboard/offer/:mode',
        component: OfferEditComponent,
      },
      {
        path: 'dashboard/promo-edit',
        component: PromoEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelRoutingModule {}
