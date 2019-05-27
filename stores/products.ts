import {observable, action} from 'mobx';
import {Context, createContext} from "react";
import axios, {AxiosResponse} from "axios";
import {delay} from "../utils";

class ProductsStore {
    @observable products?: IProduct[];

    constructor(products?: IProduct[]) {
        this.products = products;
    }

    @action
    setProducts(products: IProduct[]): void {
        this.products = products;
    }

    @action
    async fetch(): Promise<IProduct[]> {
        const response: AxiosResponse = await axios.get('/products');
        await delay(Math.random() * 1000);
        this.setProducts(response.data);
        return response.data;
    }
}

export const ProductsContext: Context<ProductsStore> = createContext(new ProductsStore());

export default ProductsStore;
