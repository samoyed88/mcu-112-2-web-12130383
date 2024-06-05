import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { IProductForm } from '../interface/product-form.interface';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-form-page',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './product-form-page.component.html',
  styleUrl: './product-form-page.component.css',
})
export class ProductFormPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  form = new FormGroup<IProductForm>({
    id: new FormControl<number | null>(null),
    name: new FormControl<string | null>(null, { validators: [Validators.required] }),
    authors: new FormArray<FormControl<string | null>>([], { validators: [Validators.required] }),
    company: new FormControl<string | null>(null, { validators: [Validators.required] }),
    isShow: new FormControl<boolean>(false, { nonNullable: true }),
    price: new FormControl<number | null>(null, { validators: [Validators.required, Validators.pattern('\\d+')] }),
  });

  get id(): FormControl<number | null> {
    return this.form.get('id') as FormControl<number | null>;
  }

  get name(): FormControl<string | null> {
    return this.form.get('name') as FormControl<string | null>;
  }

  get authors(): FormArray<FormControl<string | null>> {
    return this.form.get('authors') as FormArray<FormControl<string | null>>;
  }

  get company(): FormControl<string | null> {
    return this.form.get('company') as FormControl<string | null>;
  }

  get isShow(): FormControl<boolean> {
    return this.form.get('isShow') as FormControl<boolean>;
  }

  get price(): FormControl<number | null> {
    return this.form.get('price') as FormControl<number | null>;
  }

  product!: Product;

  private readonly router = inject(Router);

  private readonly productService = inject(ProductService);

  ngOnInit(): void {
    this.route.data
      .pipe(
        map(({ product }: Data) => product as Product),
        filter((product) => !!product),
        tap(({ authors }) => this.onAddAuthors(authors.length))
      )
      .subscribe((product) => this.form.patchValue(product));
  }

  onAddAuthors(count = 1): void {
    for (let i = 1; i <= count; i++) {
      const formControl = new FormControl<string | null>(null, { validators: [Validators.required] });
      this.authors.push(formControl);
    }
  }

  onSave(): void {
    const formData = new Product({
      id: this.id.value ?? undefined,
      name: this.name.value!,
      authors: this.authors.value.map((author) => author!),
      company: this.company.value!,
      isShow: this.isShow.value!,
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      createDate: new Date(),
      price: this.price.value!,
    });
    const action$ = this.id.value ? this.productService.update(formData) : this.productService.add(formData);
    action$.subscribe(() => this.router.navigate(['products']));
  }

  onCancel(): void {
    this.router.navigate(['products']);
  }
}
