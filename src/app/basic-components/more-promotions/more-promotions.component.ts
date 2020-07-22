import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Package } from './package.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more-promotions',
  templateUrl: './more-promotions.component.html',
  styleUrls: ['./more-promotions.component.css'],
})
export class MorePromotionsComponent implements OnInit {
  @Input() isAuth: boolean;
  isMobdata: boolean;
  packages: Package[];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.packages = this.productService.getPackages();
    this.isMobdata = this.productService.ismobile;
    this.productService.authenticateEmitter.subscribe(
      (auth: boolean) => (this.isAuth = auth)
    );
    this.productService.ismobhereEmitter.subscribe(
      (ismob: boolean) => (this.isMobdata = ismob)
    );
  }

  addPackage(index: number) {
    this.productService.postPackages(index);
    this.router.navigate(['/your-submission']);
  }
}
