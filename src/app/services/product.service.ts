import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../complex-components/products/product.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ResponseData } from '../shared/loading-spinner/responsivedata.interface';
import { Package } from '../basic-components/more-promotions/package.model';
import { Mobile } from '../complex-components/logged-in/mobileCustomer.model';

export interface PackagePostResp {
  package: Package;
  idToken: string;
  userId: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [];

  isloading: boolean = false;
  authenticate = false;
  detailProductClicked = false;
  userId: string;
  idToken: string;
  email: string;
  ismobile: boolean = false;
  accCreated: boolean = false;

  customerPackageEmitter = new EventEmitter<Package>();
  productChange = new EventEmitter<Product[]>();
  detailProdEmitter = new EventEmitter<boolean>();
  loadingEmitter = new EventEmitter<boolean>();
  authenticateEmitter = new EventEmitter<boolean>();
  emailEmittet = new EventEmitter<string>();
  ismobhereEmitter = new EventEmitter<boolean>();

  private packages: Package[] = [
    new Package(
      'NEO 5',
      '5',
      ' Infinitive SMS and calls',
      'with protection against Internet overruns',
      '+1 GB with online shopping',
      '9.99'
    ),
    new Package(
      'NEO 10',
      '10',
      ' Infinitive SMS and calls',
      'with protection against Internet overruns',
      '+1 GB with online shopping',
      '12.99'
    ),
    new Package(
      'NEO 25',
      '25',
      ' Infinitive SMS and calls',
      'with protection against Internet overruns',
      '+1 GB with online shopping',
      '16.99'
    ),
    new Package(
      'NEO 100',
      '100',
      ' Infinitive SMS and calls',
      'with protection against Internet overruns',
      '+1 GB with online shopping',
      '20.99'
    ),
  ];

  constructor(private http: HttpClient, private router: Router) {}

  getPackages() {
    return this.packages.slice();
  }

  setProducts(products: Product[]) {
    this.products = products;
    this.productChange.emit(this.products);
    this.loadingEmitter.emit(this.isloading);
  }

  fetchProducts() {
    return this.http.get<Product[]>(
      'https://mobilestore-5e2b5.firebaseio.com/Products.json'
    );
  }

  canActive() {
    this.detailProductClicked = true;
    this.detailProdEmitter.emit(this.detailProductClicked);
  }

  getProdutsbyId(index: number) {
    this.detailProductClicked = !this.detailProductClicked;
    return this.products[index];
  }

  createAccount(email: string, password: string) {
    return this.http
      .post<ResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfw0-4X_GurReta6bVnCsmR34lS4CM9w4',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  signInWithExistAcc(email: string, password: string) {
    return this.http
      .post<ResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfw0-4X_GurReta6bVnCsmR34lS4CM9w4',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responsData) => {
          this.authenticate = true;
          this.authenticateEmitter.emit(this.authenticate);
          this.router.navigate(['/products']);
          this.userId = responsData.localId;
          this.idToken = responsData.idToken;
          this.email = responsData.email;
          this.emailEmittet.emit(this.email);
        })
      );
  }

  logout() {
    this.authenticate = false;
    this.authenticateEmitter.emit(this.authenticate);
  }

  getUserData() {
    const query = `?auth=${this.idToken}&orderBy="userId"&equalTo="${this.userId}"`;
    return this.http.get(
      'https://mobilestore-5e2b5.firebaseio.com/questions.json' + query
    );
  }

  postMobile(product: Product) {
    const obj = {
      userId: this.userId,
      idToken: this.idToken,
      product: product,
    };
    return this.http.post(
      'https://mobilestore-5e2b5.firebaseio.com/mobile.json',
      obj
    );
  }

  getMobileData() {
    const query = `?auth=${this.idToken}&orderBy="userId"&equalTo="${this.userId}"`;
    return this.http
      .get('https://mobilestore-5e2b5.firebaseio.com/mobile.json' + query)
      .pipe(
        tap((responseData) => {
          const stringArray = [];
          for (let key in responseData) {
            stringArray.push(responseData[key]);
          }
          if (stringArray.length > 0) {
            this.ismobile = true;
            this.ismobhereEmitter.emit(this.ismobile);
          }
          if (stringArray.length <= 0) {
            this.ismobile = false;
            this.ismobhereEmitter.emit(this.ismobile);
          }
        })
      );
  }

  postPackages(index: number) {
    const obj = {
      userId: this.userId,
      idToken: this.idToken,
      package: this.packages[index],
    };
    this.http
      .post('https://mobilestore-5e2b5.firebaseio.com/packages.json', obj)
      .subscribe((resData) => {});
  }

  getPostedPackages() {
    const query = `?auth=${this.idToken}&orderBy="userId"&equalTo="${this.userId}"`;
    return this.http.get(
      'https://mobilestore-5e2b5.firebaseio.com/packages.json' + query
    );
  }

  deleteReq() {
    this.http
      .delete('https://mobilestore-5e2b5.firebaseio.com/packages.json')
      .subscribe((resData) => {});
  }

  deleteMob() {
    this.http
      .delete('https://mobilestore-5e2b5.firebaseio.com/mobile.json')
      .subscribe((resData) => {
        this.ismobile = false;
        this.ismobhereEmitter.emit(this.ismobile);
      });
  }

  private handleError(errorRespons: HttpErrorResponse) {
    let errorMsg = 'An unknown error message';
    if (!errorRespons.error || !errorRespons.error.error) {
      throwError(errorMsg);
    }
    switch (errorRespons.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'Email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'Email not found';
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'Invalid password';
        break;
    }
    return throwError(errorMsg);
  }
}
