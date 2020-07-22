import {
  Component,
  OnInit,
  AfterContentInit,
  DoCheck,
  SimpleChange,
  Input,
} from '@angular/core';
import { Contact } from './contacts.model';
import { ContactService } from './contact.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  added: boolean;
  contacts: Contact[];
  favoritArt: Contact[];
  @Input() id: number;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contacts = this.contactService.getContactList();
    this.contactService.addOrupdateEmitter.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  addToFavoriteArticles(newItem: Contact) {
    this.contactService.getFavoriteAritcles(newItem);
  }

  favorit() {
    this.added = false;
  }

  contactUs() {
    this.added = true;
  }
  updateItem(index: number) {
    this.contactService.addItemToForm(index);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.added) {
      return confirm('Are you sure');
    } else {
      return true;
    }
  }
}
