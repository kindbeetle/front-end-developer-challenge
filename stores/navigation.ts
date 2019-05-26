import {observable, action} from 'mobx';
import axios, {AxiosResponse} from 'axios';
import {delay} from '../utils';

const BASE_URL = process.env.BASE_URL;

export interface INavigationItem extends ILink {
    items?: ILink[]
}

class NavigationStore {
    @observable items?: INavigationItem[] = [];

    constructor(items: INavigationItem[]) {
        this.items = items;
    }

    @action
    async fetch(): Promise<INavigationItem[]> {
        const response: AxiosResponse = await axios.get(`${BASE_URL || ''}/static/data/navigation.json`);
        await delay(300);
        this.setItems(response.data);
        return response.data;
    }

    @action
    setItems(items: INavigationItem[]): void {
        this.items = items;
    }
}

export default NavigationStore;
