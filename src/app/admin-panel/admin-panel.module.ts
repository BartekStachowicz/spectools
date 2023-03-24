import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';

@NgModule({
  declarations: [LoginComponent, DashboardComponent],
  imports: [
    MaterialModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    AdminPanelRoutingModule,
  ],
  providers: [],
  exports: [],
})
export class AdminPanelModule {}
