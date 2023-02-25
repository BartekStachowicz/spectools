export class OfferItem {
  public name: string;
  public itemId: string;
  public priceRent: string;
  public priceCaution: string;
  public description: string;
  public shortDescription: string;
  public technicalCondition: string;
  public imagePath: string;
  public minRentalPeriod: string;
  public rentOnlineURL: string;

  constructor(
    name: string,
    itemId: string,
    priceRent: string,
    priceCaution: string,
    description: string,
    shortDescription: string,
    technicalCondition: string,
    imagePath: string,
    minRentalPeriod: string,
    rentOnlineURL: string
  ) {
    this.name = name;
    this.itemId = itemId;
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
