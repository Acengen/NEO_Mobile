import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[];
  isLoading: boolean;
  wasClicked: boolean;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.isLoading = true;
    this.productService.fetchProducts().subscribe((responseData) => {
      this.isLoading = false;
      this.productService.setProducts(responseData);
    });
    this.productService.productChange.subscribe(
      (products: Product[]) => (this.products = products)
    );
  }
}
