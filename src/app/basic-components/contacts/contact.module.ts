import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { CanDeactivateGuard } from './favorite-articles/canDeactivate.service';
import { CustomerGuard } from 'src/app/guard/customer.guard';
import { FavoriteArticlesComponent } from './favorite-articles/favorite-articles.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AddingUpdatingQuestionsComponent } from '../adding-updating-questions/adding-updating-questions.component';
import { SharedModule } from 'src/app/shared/shared.module';

const contactRoute: Routes = [
  {
    path: 'contact',
    component: ContactsComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [CustomerGuard],
  },
];

@NgModule({
  declarations: [
    ContactsComponent,
    FavoriteArticlesComponent,
    ContactUsComponent,
    AddingUpdatingQuestionsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(contactRoute),
  ],
})
export class ContactModule {}
