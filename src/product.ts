export class Product {
  constructor(
    public id: number,
    public name: String,
    public company: String,
    public price: number,
    public isShow: boolean,
    public createDate: Date,
    public modifyDate?: Date
  ) {}
}
