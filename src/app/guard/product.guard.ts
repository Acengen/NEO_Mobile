import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductGuard implements CanActivate {
  constructor(
    private productsService: ProductService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (this.productsService.detailProductClicked) {
      return true;
    } else {
      return this.router.navigate(['/products']);
    }
  }
}
