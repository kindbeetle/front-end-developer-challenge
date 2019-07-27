import { types } from "mobx-state-tree";

import { IProduct, ECurrencyCode } from "../models";

export interface ISettings {
  currencies: ECurrencyCode[];
  products: IProduct[];
}

const ProductPrice = types.model("ProductPrice", {
  EUR: types.optional(types.number, 0),
  USD: types.optional(types.number, 0)
});

const Product = types.model("Product", {
  count: types.number,
  description: types.string,
  id: types.identifierNumber,
  name: types.string,
  price: types.optional(ProductPrice, {})
});

export const SettingsStore = types.model("SettingsStore", {
  currencies: types.array(types.enumeration<ECurrencyCode>(Object.values(ECurrencyCode))),
  products: types.array(Product)
});
