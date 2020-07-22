import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Application } from './contact.model';
import { ContactService } from '../contact.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  contact = ['Private user', 'Bussiness user'];
  helperApplications: Application[];
  contactForm: FormGroup;
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      c: new FormControl('Private user'),
      email: new FormControl(null, [Validators.required, Validators.email]),
      select: new FormControl('Pripeid'),
      textarea: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    this.isLoading = true;
    const name = this.contactForm.get('name').value;
    const number = this.contactForm.get('number').value;
    const c = this.contactForm.get('c').value;
    const email = this.contactForm.get('email').value;
    const select = this.contactForm.get('select').value;
    const textarea = this.contactForm.get('textarea').value;

    const contact = new Application(name, number, c, email, select, textarea);

    this.http
      .post('https://mobilestore-5e2b5.firebaseio.com/helpneeded.json', contact)
      .subscribe((responseData) => {
        this.isLoading = false;
      });
  }
}
