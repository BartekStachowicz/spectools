import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegulaminPageComponent } from './regulamin-page/regulamin-page.component';
import { OfferResolverService } from './services/offer-resolver.service';

const appRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    pathMatch: 'full',
    resolve: [OfferResolverService],
  },
  {
    path: 'oferta',
    loadChildren: () =>
      import('./offer-main/offer-main.module').then((x) => x.OfferMainModule),
  },
  { path: 'regulamin', component: RegulaminPageComponent },
  { path: 'kontakt', component: ContactPageComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-dashboard/admin.module').then((x) => x.AdminModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      // scrollPositionRestoration: 'top',
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
