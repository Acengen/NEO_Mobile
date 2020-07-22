import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contacts.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  articleEmitter = new EventEmitter<Contact[]>();
  favArticalEmitter = new EventEmitter<Contact>();
  addOrupdateEmitter = new EventEmitter<Contact[]>();
  editEmitter = new EventEmitter<number>();
  newAddedItem: boolean = false;

  private contactlist: Contact[] = [
    new Contact(
      'Where can I see the listing for the current or past billing period using a Vip online account?'
    ),
    new Contact(
      'How can I check the current balance on my Vip postpaid account?'
    ),
    new Contact('How to check the credit for a Vip prepaid number?'),
    new Contact('What are Vip internet settings and Vip MMS settings?'),
    new Contact(
      'What is the number of Vip Customer Service and how is this call charged?'
    ),
  ];

  private favoriteArticles: Contact;

  getContactList() {
    return this.contactlist;
  }

  getFavoriteAritcles(newItem: Contact) {
    this.favoriteArticles = newItem;
    this.favArticalEmitter.emit(this.favoriteArticles);
  }

  removeFavoriteArticles(index: number) {}

  pushnewItemInList(newItem: Contact) {
    this.contactlist.push(newItem);
    this.addOrupdateEmitter.emit(this.contactlist);
  }

  getContactsByIndex(index: number) {
    return this.contactlist[index];
  }

  addItemToForm(index: number) {
    this.editEmitter.emit(index);
  }

  updateItem(index: number, newItem: Contact) {
    this.contactlist[index] = newItem;
    this.addOrupdateEmitter.emit(this.contactlist);
  }
}
