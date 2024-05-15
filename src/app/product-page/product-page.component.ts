import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
  imports: [ProductPageComponent, ProductCardListComponent],
})
export class ProductPageComponent implements OnInit {
  private productService = inject(ProductService);

  products!: Product[];

  ngOnInit(): void {
    this.productService.getList().subscribe((products) => (this.products = products));
  }
  router = inject(Router);

  onAdd(): void {
    const product = new Product({
      name: '書籍 Z',
      authors: ['作者甲', '作者乙', '作者丙'],
      company: '博碩文化',
      isShow: true,
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      createDate: new Date(),
      price: 10000,
    });
    this.productService.add(product);
  }

  onEdit(product: Product): void {
    this.router.navigate(['product', 'form', product.id]);
  }
  onRemove({ id }: Product): void {
    this.productService.remove(id);
  }
  onView(product: Product): void {
    this.router.navigate(['product', 'view', product.id]);
  }
}
