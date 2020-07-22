import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ResponseData } from 'src/app/shared/loading-spinner/responsivedata.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-favorite-articles',
  templateUrl: './favorite-articles.component.html',
  styleUrls: ['./favorite-articles.component.css'],
})
export class FavoriteArticlesComponent implements OnInit {
  favoriteAr: Contact;
  isLoading: boolean;
  errorMsg = null;
  userId: string = '';
  idToken: string = '';
  @ViewChild('fullname') fullnameInput: ElementRef;
  @Input() id: number;

  constructor(
    private contactService: ContactService,
    private http: HttpClient,
    private productSErvice: ProductService
  ) {}

  ngOnInit() {
    this.userId = this.productSErvice.userId;
    this.idToken = this.productSErvice.idToken;
    this.contactService.favArticalEmitter.subscribe(
      (favArticle: Contact) => (this.favoriteAr = favArticle)
    );
  }

  removeFavArticle(index: number) {
    this.contactService.removeFavoriteArticles(index);
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    const fullname = form.value.name;
    let nameOfArticle = this.favoriteAr.name;

    const objData = {
      fullname: fullname,
      name: nameOfArticle,
      userId: this.userId,
      idToken: this.idToken,
    };

    this.http
      .post<ResponseData>(
        'https://mobilestore-5e2b5.firebaseio.com/questions.json',
        objData
      )
      .pipe(catchError(this.handleError))
      .subscribe(
        (responseData) => {
          this.isLoading = false;
          this.errorMsg = null;
        },
        (errormsg) => {
          this.errorMsg = errormsg;
        }
      );
    form.reset();
  }

  private handleError(errorrespon: HttpErrorResponse) {
    let errorMsg = 'Unknown error message';
    if (!errorrespon.statusText) {
      return throwError(errorMsg);
    }

    if (errorrespon.statusText === 'Unknown Error') {
      errorMsg = 'Something went wrong!';
    }

    return throwError(errorMsg);
  }
}
