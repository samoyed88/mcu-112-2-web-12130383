import { Component } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  productName = '書籍 A';
  authors = '作者甲、作者乙、作者丙';
  company = '博碩文化';
  isShow = true;
  imgUrl = 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img';
  createDate = new Date();
}
