import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication-my-neo',
  templateUrl: './authentication-my-neo.component.html',
  styleUrls: ['./authentication-my-neo.component.css'],
})
export class AuthenticationMyNeoComponent implements OnInit {
  isLoggedIn: boolean = false;
  errorMsg: string = '';
  accCreated: boolean = false;
  isLoading: boolean;
  user: string;
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.psw;
    this.isLoading = true;

    if (!this.isLoggedIn) {
      this.productService.createAccount(email, password).subscribe(
        (responsiveData) => {
          this.isLoading = false;
          this.errorMsg = '';
          this.accCreated = true;

          setTimeout(() => {
            this.accCreated = false;
          }, 1600);
        },
        (error) => {
          this.errorMsg = error;
        }
      );
    } else {
      this.productService.signInWithExistAcc(email, password).subscribe(
        (responsiveData) => {
          this.isLoading = false;
          this.errorMsg = '';
        },
        (error) => (this.errorMsg = error)
      );
    }
  }
  createAcc() {
    this.isLoggedIn = !this.isLoggedIn;
  }
}
