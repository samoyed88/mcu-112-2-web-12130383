import { Component } from '@angular/core';
import { ProductCardListComponent } from './product-card-list/product-card-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductCardListComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {}
