import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// /////////////////////////////////////////////////////////////////////////////////////

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { RegulaminPageComponent } from './regulamin-page/regulamin-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { SliderMainComponent } from './main-page/slider-main/slider-main.component';
import { MaterialModule } from './material.module';
import { PageMainEffects } from './main-page/store/page-main.effects';
import * as fromApp from './store/app.reducer';
import { AdminPanelEffects } from './admin-panel/store/admin-panel.effects';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    RegulaminPageComponent,
    ContactPageComponent,
    HeaderComponent,
    MainPageComponent,
    SliderMainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    EffectsModule.forRoot([PageMainEffects, AdminPanelEffects]),
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    ReactiveFormsModule,
    MaterialModule,
    NgbModule,
  ],
  providers: [
    { provide: HashLocationStrategy, useClass: PathLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
