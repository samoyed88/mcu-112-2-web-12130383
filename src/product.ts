export class Product {
  constructor(
    id: number,
    name: String,
    company: String,
    price: number,
    isShow: boolean,
    createDate: Date,
    modifyDate: undefined | Date
  ) {
    this.id = id;
    this.name = name;
    this.company = company;
    this.price = price;
    this.isShow = isShow;
    this.createDate = createDate;
    this.modifyDate = modifyDate;
  }
  id: number;
  name: String;
  company: String;
  price: number;
  isShow: boolean;
  createDate: Date;
  modifyDate: undefined | Date;
}
