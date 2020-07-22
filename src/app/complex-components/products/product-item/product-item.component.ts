import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: '.product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() productItem: Product;
  @Input() index: number;
  constructor(private productService: ProductService) {}

  ngOnInit() {}

  canActive() {
    this.productService.canActive();
  }
}
