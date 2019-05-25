import {createContext, Context} from 'react';
import {configure} from 'mobx';
import {useStaticRendering} from 'mobx-react-lite';
import NavigationStore, {ItemType} from './navigation';

configure({ enforceActions: 'observed' });
const isServer: boolean = !process.browser;
useStaticRendering(isServer);

export type StoresType = {
    navigation: NavigationStore
}

export type InitialStateStoresType = {
    navigation: ItemType[]
}

export type InitialStateType = {
    stores: InitialStateStoresType
};

class AppStore {

    stores: StoresType;

    constructor(InitialState?: InitialStateType) {
        this.stores = {
            navigation: new NavigationStore(InitialState && InitialState.stores.navigation)
        };
    }

    async fetch(): Promise<InitialStateStoresType> {
        const results = await Promise.all(Object.values(this.stores).map((store: any): Promise<any> | null => {
            return store.fetch && typeof store.fetch === 'function' ? store.fetch() : null;
        }));

        const initialState: any = {stores: {}};
        Object.keys(this.stores).forEach((storeName: string, i) => {
            initialState.stores[storeName] = results[i];
        });

        return initialState;
    }
}

export const AppStoreContext: Context<AppStore> = createContext(new AppStore());

export default AppStore;
