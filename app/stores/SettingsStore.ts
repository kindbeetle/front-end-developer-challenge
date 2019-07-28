import { types } from "mobx-state-tree";

import { ICurrency, IProduct, ECurrencyCode } from "../models";

export interface ISettings {
  currencies: ICurrency[];
  products: IProduct[];
}

const Currency = types.model("Currencies", {
  code: types.enumeration<ECurrencyCode>(Object.values(ECurrencyCode)),
  name: types.string,
  coinValues: types.array(types.number),
});

const ProductPrice = types.model("ProductPrice", {
  EUR: types.optional(types.number, 0),
  USD: types.optional(types.number, 0)
});

const Product = types.model("Product", {
  description: types.string,
  id: types.identifierNumber,
  name: types.string,
  price: types.optional(ProductPrice, {}),
  quantity: types.number
});

export const SettingsStore = types.model("SettingsStore", {
  currencies: types.array(Currency),
  products: types.array(Product)
});
