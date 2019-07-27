import { ISettings } from "../stores/SettingsStore";
import { ECurrencyCode, IProduct, ICash } from "../models";

interface IVendingMachine {
  selectProduct: (id: number) => void;
  pay: () => void;
}

export class VendingMachine implements IVendingMachine {
  public products: IProduct[] = [];
  public currencies: ECurrencyCode[];
  public messages: string[] = [];
  public balance: ICash;
  private selectedProduct: number | null = null;

  constructor(settings: ISettings) {
    this.products = settings.products;
    this.currencies = settings.currencies;
    this.balance = settings.currencies.reduce((result: ICash, currency: ECurrencyCode) => {
      result[currency] = 0;
      return result;
    }, {} as ICash);

    this.messages.push("Total products count is " + this.products.length);
  }

  selectProduct(id: number) {
    this.selectedProduct = id;
  }

  pay() {
    if (!this.selectedProduct) return;
  }

  get queue() {
    return this.messages;
  }
}
