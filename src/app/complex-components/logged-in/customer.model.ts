import { Product } from '../products/product.model';

export class Customer {
  constructor(
    public fullname: string,
    public name: string,
    public userId: string,
    public idToken: string
  ) {}
}
