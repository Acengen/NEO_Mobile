import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from 'src/app/shared/loading-spinner/responsivedata.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: number;
  userId: string = '';
  idToken: string = '';
  authent: boolean;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = this.productService.userId;
    this.idToken = this.productService.idToken;
    this.authent = this.productService.authenticate;
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.product = this.productService.getProdutsbyId(this.id);
    });
    this.productService.authenticateEmitter.subscribe(
      (auth: boolean) => (this.authent = auth)
    );
  }

  postMobile() {
    this.isLoading = true;
    this.productService.postMobile(this.product).subscribe((resdata) => {
      this.isLoading = false;
      this.router.navigate(['/your-submission']);
    });
  }
}
