import CurrenciesStore from '../../stores/currencies';
import axios from 'axios/index';
import {autorun} from 'mobx/lib/mobx';
import currenciesJSON from '../../static/data/currencies.json';

jest.mock('axios');
axios.get.mockResolvedValue({data: currenciesJSON});

describe('Test CurrenciesStore', () => {
    let currenciesStore = null;

    beforeEach(() => {
        currenciesStore = new CurrenciesStore(currenciesJSON);
    });

    test('Check initial data', () => {
        expect(currenciesStore.currencies.USD).toBe(1);
    });

    test('Set currencies', (done) => {
        expect(currenciesStore.currencies.USD).toBe(1);
        currenciesStore.setCurrencies({USD: 2, EUR: 2.5, RUB: 0.000000000000000000000000000000000000001});
        autorun(() => {
            expect(currenciesStore.currencies.USD).toBe(2);
            done();
        });
    });

    test('Convert into dollars', () => {
        const euros = 67;
        expect(currenciesStore.convertToDollars('EUR', euros)).toBe(euros * currenciesStore.currencies.EUR);
    });

    test('Check fetch', async (done) => {
        const data = await currenciesStore.fetch();
        expect(data).toEqual(currenciesJSON);
        autorun(() => {
            expect(currenciesStore.currencies.USD).toBe(1);
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/currencies');
            done();
        });
    });
});
