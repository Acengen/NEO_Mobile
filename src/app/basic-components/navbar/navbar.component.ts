import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/complex-components/products/product.model';
import { ProductService } from 'src/app/services/product.service';
import { DataStorage } from 'src/app/services/data-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  closeNav: boolean = false;
  isAuthenticate: boolean;
  email: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.emailEmittet.subscribe(
      (email: string) => (this.email = email)
    );
    this.isAuthenticate = this.productService.authenticate;
    this.productService.authenticateEmitter.subscribe(
      (auth: boolean) => (this.isAuthenticate = auth)
    );
  }

  closeNavbar() {
    this.closeNav = true;
  }

  openNavbar() {
    this.closeNav = false;
  }

  logout() {
    this.productService.logout();
    this.router.navigate(['/header']);
  }
}
