import { FormControl } from '@angular/forms';

export interface IProductForm {
  name: FormControl<string | null>;
  id: FormControl<number | null>;
  company: FormControl<string | null>;
  isShow: FormControl<boolean>;
  price: FormControl<string | null>;
}
