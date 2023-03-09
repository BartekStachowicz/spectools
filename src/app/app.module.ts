import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { OfferPageComponent } from './offer-main/offer-page/offer-page.component';
import { RegulaminPageComponent } from './regulamin-page/regulamin-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';

import { OfferDetailComponent } from './offer-main/offer-detail/offer-detail.component';
import { OfferMainComponent } from './offer-main/offer-main.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OfferMainEffects } from './offer-main/store/offer-main.effects';
import * as fromApp from './store/app.reducer';
import { ResponsiveGridDirective } from './directives/responsive-grid.directive';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MaterialModule } from './material.module';
import { SliderMainComponent } from './main-page/slider-main/slider-main.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainPageComponent,
    OfferPageComponent,
    RegulaminPageComponent,
    ContactPageComponent,
    HeaderComponent,
    OfferDetailComponent,
    OfferMainComponent,
    ResponsiveGridDirective,
    AdminDashboardComponent,
    SliderMainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([OfferMainEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
