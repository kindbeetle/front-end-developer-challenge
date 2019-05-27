import {observable, action, computed} from 'mobx';
import {Context, createContext} from 'react';
import axios, {AxiosResponse} from 'axios';
import {delay} from '../utils';

class UserStore {
    @observable user?: IUser;

    constructor(user?: IUser) {
        this.user = user;
    }

    @action
    setUser(user: IUser): void {
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
}

export const UserContext: Context<UserStore> = createContext(new UserStore());

export default UserStore;
