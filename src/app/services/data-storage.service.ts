import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { Product } from '../complex-components/products/product.model';

@Injectable()
export class DataStorage {
    constructor(private http: HttpClient, private productService: ProductService) { }
    // fetchProducts() {
    //     return this.http.get<Product[]>('https://mobilestore-5e2b5.firebaseio.com/Products.json')
    // }
}