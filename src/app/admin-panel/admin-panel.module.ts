import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { MainPanelComponent } from './dashboard/main-panel.component';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { MaterialModule } from '../material.module';
import { OfferEditComponent } from './dashboard/offer-edit/offer-edit.component';
import { PromoEditComponent } from './dashboard/promo-edit/promo-edit.component';
import { CalendarComponent } from './dashboard/calendar/calendar.component';
import { ManualsComponent } from './dashboard/manuals/manuals.components';

@NgModule({
  declarations: [
    MainPanelComponent,
    AdminPanelComponent,
    OfferEditComponent,
    PromoEditComponent,
    CalendarComponent,
    ManualsComponent,
  ],
  imports: [
    MaterialModule,
    HttpClientModule,
    CommonModule,
    AdminPanelRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [],
  exports: [CalendarComponent],
})
export class AdminPanelModule {}
