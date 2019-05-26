import {observable, action} from 'mobx';
import {Context, createContext} from "react";

interface IProductsInitialState {

}

class ProductsStore {

}

export const ProductsContext: Context<ProductsStore> = createContext(new ProductsStore());

export default ProductsStore;
