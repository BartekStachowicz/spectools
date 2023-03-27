import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { LoginComponent } from './login/login.component';
import { MainPanelComponent } from './dashboard/main-panel.component';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OfferEditComponent } from './dashboard/offer-edit/offer-edit.component';
import { PromoEditComponent } from './dashboard/promo-edit/promo-edit.component';

@NgModule({
  declarations: [
    LoginComponent,
    MainPanelComponent,
    AdminPanelComponent,
    OfferEditComponent,
    PromoEditComponent,
  ],
  imports: [
    MaterialModule,
    HttpClientModule,
    CommonModule,
    AdminPanelRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [],
})
export class AdminPanelModule {}
