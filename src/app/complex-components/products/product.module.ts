import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { StartComponentComponent } from 'src/app/basic-components/start-component/start-component.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ProductGuard } from 'src/app/guard/product.guard';
import { SharedModule } from 'src/app/shared/shared.module';

const productRoute: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      { path: '', component: StartComponentComponent },
      {
        path: ':id',
        component: ProductDetailComponent,
        canActivate: [ProductGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductItemComponent,
    ProductDetailComponent,
    StartComponentComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(productRoute),
    SharedModule,
  ],
  exports: [],
})
export class ProductModule {}
