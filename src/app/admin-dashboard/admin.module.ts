import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    MaterialModule,
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [],
})
export class AdminModule {}
