export class OfferItem {
  public id: string;
  public name: string;
  public itemPathId: string;
  public priceRent: number;
  public priceCaution: number;
  public description: string;
  public shortDescription: string;
  public technicalCondition: string;
  public imagePath: string;
  public minRentalPeriod: string;
  public rentOnlineURL: string;

  constructor(
    id: string,
    name: string,
    itemPathId: string,
    priceRent: number,
    priceCaution: number,
    description: string,
    shortDescription: string,
    technicalCondition: string,
    imagePath: string,
    minRentalPeriod: string,
    rentOnlineURL: string
  ) {
    this.id = id;
    this.name = name;
    this.itemPathId = itemPathId;
    this.priceRent = priceRent;
    this.priceCaution = priceCaution;
    this.description = description;
    this.shortDescription = shortDescription;
    this.technicalCondition = technicalCondition;
    this.imagePath = imagePath;
    this.minRentalPeriod = minRentalPeriod;
    this.rentOnlineURL = rentOnlineURL;
  }
}
