import { ECurrencyCode } from './ECurrencyCode';

export interface ICash {
  [key: string]: number;
  [ECurrencyCode.EUR]: number;
  [ECurrencyCode.USD]: number;
}

export interface IProduct {
  count: number;
  description: string;
  id: number;
  name: string,
  price: ICash;
}
