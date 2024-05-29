import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, combineLatest, startWith, switchMap } from 'rxjs';
import { Product } from '../model/product';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
  imports: [AsyncPipe, JsonPipe, ReactiveFormsModule, ProductCardListComponent],
})
export class ProductPageComponent {
  private productService = inject(ProductService);

  protected pageSize = 5;

  private readonly condition$ = new BehaviorSubject<string | undefined>(undefined);
  get condition() {
    return this.condition$.value;
  }
  set condition(value: string | undefined) {
    this.condition$.next(value);
  }

  private readonly pageIndex$ = new BehaviorSubject<number>(1);
  get pageIndex() {
    return this.pageIndex$.value;
  }
  set pageIndex(value: number) {
    this.pageIndex$.next(value);
  }

  private readonly refresh$ = new Subject<void>();

  protected readonly formControl = new FormControl<string | undefined>(undefined, { nonNullable: true });

  readonly products$ = combineLatest([this.refresh$.pipe(startWith(undefined)), this.condition$, this.pageIndex$]).pipe(
    switchMap(([_, condition, pageIndex]) => this.productService.getList(condition, pageIndex, this.pageSize))
  );

  readonly totalCount$ = combineLatest([this.refresh$.pipe(startWith(undefined)), this.condition$]).pipe(
    switchMap(([_, condition]) => this.productService.getCount(condition))
  );

  router = inject(Router);

  onPageIndexChange(index: number): void {
    this.pageIndex = index;
  }

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
    this.productService.add(product).subscribe(() => this.refresh$.next());
  }

  onEdit(product: Product): void {
    this.router.navigate(['product', 'form', product.id]);
  }
  onRemove({ id }: Product): void {
    this.productService.remove(id).subscribe(() => this.refresh$.next());
  }
  onView(product: Product): void {
    this.router.navigate(['product', 'view', product.id]);
  }
}
