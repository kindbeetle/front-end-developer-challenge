export enum ECurrencyCode {
  EUR = "EUR",
  USD = "USD"
}

export interface ICurrency {
  code: ECurrencyCode;
  name: string;
  coinValues: number[];
}

export interface ICash {
  [key: string]: number;
  [ECurrencyCode.EUR]: number;
  [ECurrencyCode.USD]: number;
}

export interface IMessage {
  text: string;
  date: number;
}

export interface IProduct {
  description: string;
  id: number;
  name: string;
  price: ICash;
  quantity: number;
}
