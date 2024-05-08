import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.css',
})
export class ProductDetailPageComponent {
  product = new Product({
    id: 1,
    name: '書籍 A',
    authors: ['作者甲', '作者乙', '作者丙'],
    company: '博碩文化',
    isShow: true,
    imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
    createDate: new Date(),
    price: 10000,
  });

  private router = inject(Router);

  onBack(): void {
    this.router.navigate(['products']);
  }

  onEdit(): void {
    this.router.navigate(['product', 'form', this.product.id]);
  }
}
