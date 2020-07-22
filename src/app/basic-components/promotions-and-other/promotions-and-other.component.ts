import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Package } from '../more-promotions/package.model';

@Component({
  selector: 'app-promotions-and-other',
  templateUrl: './promotions-and-other.component.html',
  styleUrls: ['./promotions-and-other.component.css'],
})
export class PromotionsAndOtherComponent implements OnInit {
  clicked: boolean = false;
  isAuth: boolean;

  constructor(private productService: ProductService) {}

  ngOnInit() {}

  withoutDevice() {
    this.clicked = false;
  }

  withDevice() {
    this.clicked = true;
    this.isAuth = this.productService.authenticate;
  }
}
