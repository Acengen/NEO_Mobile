import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './basic-components/navbar/navbar.component';
import { HeaderComponent } from './basic-components/header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { DataStorage } from './services/data-storage.service';
import { PromotionsAndOtherComponent } from './basic-components/promotions-and-other/promotions-and-other.component';
import { MorePromotionsComponent } from './basic-components/more-promotions/more-promotions.component';
import { TariffSupplementsComponent } from './basic-components/tariff-supplements/tariff-supplements.component';
import { SupportComponent } from './basic-components/support/support.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CanDeactivateGuard } from './basic-components/contacts/favorite-articles/canDeactivate.service';
import { AuthenticationMyNeoComponent } from './complex-components/authentication-my-neo/authentication-my-neo.component';
import { LoggedInComponent } from './complex-components/logged-in/logged-in.component';
import { CustomerGuard } from './guard/customer.guard';
import { AboutNeoComponent } from './basic-components/about-neo/about-neo.component';
import { CovidAboutComponent } from './basic-components/covid-about/covid-about.component';
import { SharedModule } from './shared/shared.module';
import { ProductGuard } from './guard/product.guard';
import { ProductModule } from './complex-components/products/product.module';
import { ContactModule } from './basic-components/contacts/contact.module';

const appRoute: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },

  { path: 'auth-form', component: AuthenticationMyNeoComponent },
  {
    path: 'your-submission',
    component: LoggedInComponent,
    canActivate: [CustomerGuard],
  },
  { path: 'header', component: HeaderComponent },

  { path: 'about-neo', component: AboutNeoComponent },
  { path: 'covid-info', component: CovidAboutComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];
@NgModule({
  declarations: [
    AppComponent,
    AuthenticationMyNeoComponent,
    LoggedInComponent,
    NavbarComponent,
    HeaderComponent,
    PromotionsAndOtherComponent,
    MorePromotionsComponent,
    SupportComponent,
    TariffSupplementsComponent,
    AboutNeoComponent,
    CovidAboutComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ProductModule,
    ContactModule,
  ],
  providers: [DataStorage, CanDeactivateGuard, CustomerGuard, ProductGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
