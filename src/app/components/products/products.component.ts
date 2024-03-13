import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/interfaces/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        this.products = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
