import ProductsStore from '../../stores/products';
import {autorun} from 'mobx/lib/mobx';
import axios from 'axios/index';
import productsJSON from '../../static/data/products.json';

jest.mock('axios');
axios.get.mockResolvedValue({data: productsJSON});
axios.post.mockResolvedValue({data: {status: 200, message: 'Product was successfully bought'}});

const NEW_PRODUCT = {
    "id": "product-33",
    "title": "Fanta",
    "quantity": 4,
    "price": 13,
    "picture": "https://pizzaman.ru/image/cache/data/3j2gpO-760x445.png"
};

describe('Test ProductsStore', () => {
    let productsStore = null;

    beforeEach(() => {
        productsStore = new ProductsStore(productsJSON);
    });

    test('Check initial data', () => {
        expect(productsStore.products[0].title).toBe('Coca-Cola');
        expect(productsStore.products[1].title).toBe('Lays');
    });

    test('Set products', (done) => {
        productsStore.setProducts([NEW_PRODUCT]);
        autorun(() => {
            expect(productsStore.products[0].title).toBe('Fanta');
            done();
        });
    });

    test('Test fetch', async (done) => {
        const data = await productsStore.fetch();
        expect(data).toEqual(productsJSON);
        autorun(() => {
            expect(productsStore.products[2].title).toBe('Snickers');
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/products');
            done();
        });
    });

    test('Test buy', async (done) => {
        const data = await productsStore.buy('product-1');
        expect(data.status).toBe(200);
        autorun(() => {
            expect(productsStore.products[0].quantity).toBe(4);
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith('/products/product-1/buy');
            done();
        });
    });

});
