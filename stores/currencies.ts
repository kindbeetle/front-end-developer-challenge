import {observable, action} from 'mobx';
import {Context, createContext} from 'react';
import axios, {AxiosResponse} from 'axios';
import {delay} from '../utils';

class CurrenciesStore {
    @observable currencies?: ICurrencies;

    constructor(currencies?: ICurrencies) {
        this.currencies = currencies;
    }

    @action
    setCurrencies(currencies: ICurrencies): void {
        this.currencies = currencies;
    }

    @action
    async fetch(): Promise<ICurrencies> {
        const response: AxiosResponse = await axios.get('/currencies');
        await delay(Math.random() * 1000);
        this.setCurrencies(response.data);
        return response.data;
    }

    convertToDollars(currency: string, amount: number) {
        return this.currencies && this.currencies[currency] * amount;
    }
}

export const CurrenciesContext: Context<CurrenciesStore> = createContext(new CurrenciesStore());

export default CurrenciesStore;
