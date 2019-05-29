import {observable, action, computed} from 'mobx';
import {Context, createContext} from 'react';
import axios, {AxiosResponse} from 'axios';
import {delay} from '../utils';
import LoadingAndErrorStore, {loadingAndErrorDecorator} from './loadingAndError';

class UserStore extends LoadingAndErrorStore {
    @observable user?: IUser;

    constructor(user?: IUser) {
        super({isLoading: false, error: ''});
        this.user = user;
        this.charge = loadingAndErrorDecorator(this.charge, this, this);
    }

    @action
    setUser(user?: IUser): void {
        this.user = user;
    }

    @computed get fullName() {
        if (!this.user || !this.user.profile) {
            return '';
        }
        return `${this.user.profile.firstName} ${this.user.profile.lastName}`;
    }

    @action
    async fetch(): Promise<IUser> {
        const response: AxiosResponse = await axios.get('/user');
        await delay(Math.random() * 1000);
        this.setUser(response.data);
        return response.data;
    }

    @action
    decreaseFunds(currency: string, amount: number): void {
        if (this.user) {
            this.user.funds[currency] -= amount;
        }
    }

    @action
    async charge(currency: string, amount: number): Promise<IResponse> {
        const response: AxiosResponse = await axios.put('/user/charge', {currency, amount});
        await delay(Math.random() * 1000);

        this.decreaseFunds(currency, amount);

        return response.data;
    }
}

export const UserContext: Context<UserStore> = createContext(new UserStore());

export default UserStore;
