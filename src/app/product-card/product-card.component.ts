import { Component, Input, booleanAttribute, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ transform: numberAttribute }) id!: number;
  @Input() productName!: string;
  @Input() authors!: string;
  @Input() company!: string;
  @Input({ transform: booleanAttribute }) isShow!: boolean;
  @Input() imgUrl!: string;
  onsetDisplay(isShow: boolean): void {
    this.isShow = isShow;
  }
}
