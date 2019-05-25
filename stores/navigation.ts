import {observable, action} from 'mobx';
import axios, {AxiosResponse} from 'axios';

const BASE_URL = process.env.BASE_URL;

export type ItemType = {
    id: string,
    title: string,
    href: string,
    items?: ItemType[]
};

class NavigationStore {
    @observable items?: ItemType[] = [];

    constructor(items?: ItemType[]) {
        this.items = items;
    }

    @action
    async fetch(): Promise<ItemType[]> {
        const response: AxiosResponse = await axios.get(`${BASE_URL || ''}/static/data/navigation.json`);
        this.setItems(response.data);
        return response.data;
    }

    @action
    setItems(items: ItemType[]): void {
        this.items = items;
    }
}

export default NavigationStore;
