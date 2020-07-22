import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from '../contacts/contact.service';
import { Contact } from '../contacts/contacts.model';

@Component({
  selector: 'app-adding-updating-questions',
  templateUrl: './adding-updating-questions.component.html',
  styleUrls: ['./adding-updating-questions.component.css'],
})
export class AddingUpdatingQuestionsComponent implements OnInit {
  updatingForm: FormGroup;
  indexEdited: number;
  contact: Contact;
  editMode = false;
  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.editEmitter.subscribe((index: number) => {
      this.indexEdited = index;
      this.editMode = true;
      this.contact = this.contactService.getContactsByIndex(index);
      this.updatingForm.setValue({
        name: this.contact.name,
      });
    });

    this.updatingForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const name = this.updatingForm.get('name').value;
    const newItem = new Contact(name);
    if (this.editMode) {
      this.contactService.updateItem(this.indexEdited, newItem);
    } else {
      this.contactService.pushnewItemInList(newItem);
    }
    this.editMode = false;
    this.updatingForm.reset();
  }
}
