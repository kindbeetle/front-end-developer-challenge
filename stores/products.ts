import {observable, action} from 'mobx';
import {Context, createContext} from "react";
import axios, {AxiosResponse} from "axios";
import {delay} from "../utils";
import LoadingAndErrorStore, {loadingAndErrorDecorator} from './loadingAndError';

class ProductsStore extends LoadingAndErrorStore{
    @observable products?: IProduct[];

    constructor(products?: IProduct[]) {
        super({isLoading: false, error: ''});
        this.products = products;
        this.buy = loadingAndErrorDecorator(this.buy, this, this);
    }

    @action
    setProducts(products: IProduct[]): void {
        this.products = products;
    }

    @action
    decreaseAmount(id: string): void {
        if (this.products) {
            const product = this.products.find(product => product.id === id);
            if (product) {
                product.quantity -- ;
            }
        }
    }

    @action
    async fetch(): Promise<IProduct[]> {
        const response: AxiosResponse = await axios.get('/products');
        await delay(Math.random() * 1000);
        this.setProducts(response.data);
        return response.data;
    }

    @action
    async buy(id: string): Promise<IResponse> {
        const response: AxiosResponse = await axios.post(`/products/${id}/buy`);
        await delay(Math.random() * 1000);
        this.decreaseAmount(id);
        return response.data;
    }
}

export const ProductsContext: Context<ProductsStore> = createContext(new ProductsStore());

export default ProductsStore;
