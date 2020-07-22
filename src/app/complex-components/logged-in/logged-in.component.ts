import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Customer } from './customer.model';
import { Mobile } from './mobileCustomer.model';
import { Package } from 'src/app/basic-components/more-promotions/package.model';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css'],
})
export class LoggedInComponent implements OnInit {
  show: boolean = false;
  customerData: Customer[] = [];
  customerMobileData: Mobile;
  customerPackages: Package;
  email: string = '';
  isLoading: boolean;
  packageCancel: boolean = false;
  errorMsg: string = '';
  isMobDataHere: boolean;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.email = this.productService.email;
    this.isLoading = true;

    /* getting a user data from get request- using product service */
    this.productService.getUserData().subscribe((responseData) => {
      for (let key in responseData) {
        this.customerData.push(responseData[key]);
      }
      this.isLoading = false;
    });

    /* getting a mobile data from get request- using product service */
    this.productService.getMobileData().subscribe(
      (responseData) => {
        for (let key in responseData) {
          this.customerMobileData = responseData[key].product;
        }
        this.errorMsg = '';
        this.isLoading = false;
      },
      (error) => {
        if (error.error) {
          this.errorMsg = 'Something went wrong!';
        }
      }
    );
    /* getting a packages data from get request- using product service */
    this.productService.getPostedPackages().subscribe((resdata) => {
      this.isLoading = false;
      for (let key in resdata) {
        this.customerPackages = resdata[key].package;
      }
    });

    this.productService.ismobhereEmitter.subscribe((ismob: boolean) => {
      this.isMobDataHere = ismob;
      console.log(this.isMobDataHere);
    });
  }

  /* Sending delete request - using product service */
  deletePackage() {
    this.productService.deleteReq();
    this.customerPackages = null;
    this.packageCancel = true;

    setTimeout(() => {
      this.packageCancel = false;
    }, 3000);
  }

  /* Sending delete req for mobile */
  deleteMobile() {
    this.productService.deleteMob();
    this.customerMobileData = null;
    this.packageCancel = true;

    setTimeout(() => {
      this.packageCancel = false;
    }, 3000);
  }
}
