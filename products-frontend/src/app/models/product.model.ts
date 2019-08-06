export class Product {
  private _id: string;
  private name: string;
  private description: string;
  private category: string;
  private price: number;
  private currency: string;
  private images: string[];
  private warrantyDetails: string;
  private units: string;

  constructor(
    _id: string,
    name: string,
    description: string,
    category: string,
    price: number,
    currency: string,
    images: string[],
    warrantyDetails: string,
    units: string) {
      this._id = _id;
      this.name = name;
      this.description = description;
      this.category = category;
      this.price = price;
      this.currency = currency;
      this.images = images;
      this.warrantyDetails = warrantyDetails;
      this.units = units;
    }

    getId() {
      return this._id;
    }
}