import {createContext, Context} from 'react';
import {configure} from 'mobx';
import {useStaticRendering} from 'mobx-react-lite';
import NavigationStore, {INavigationItem} from './navigation';
import GlobalStateStore from './globalState';
import UserStore from './user';
import CurrenciesStore from './currencies';
import {loadingAndErrorDecorator} from './loadingAndError';
import _ from 'lodash';
// Remove in case of REAL API is available
import '../utils/mocks';

configure({ enforceActions: 'observed' });
const isServer: boolean = !process.browser;
useStaticRendering(isServer);

export type StoresType = {
    navigationStore: NavigationStore,
    globalStateStore: GlobalStateStore,
    userStore: UserStore,
    currenciesStore: CurrenciesStore
}

export type InitialStateStoresType = {
    navigationStore: INavigationItem[],
    globalStateStore: any,
    userStore: IUser,
    currenciesStore: ICurrencies
}

export type InitialStateType = {
    stores: InitialStateStoresType
};

class AppStore {

    stores: StoresType;

    constructor(InitialState?: InitialStateType) {
        this.stores = {
            navigationStore: new NavigationStore(_.get(InitialState, 'stores.navigationStore.items', [])),
            globalStateStore: new GlobalStateStore(_.get(InitialState, 'stores.globalStateStore', {})),
            userStore: new UserStore(_.get(InitialState, 'stores.userStore.user', {})),
            currenciesStore: new CurrenciesStore(_.get(InitialState, 'stores.currenciesStore.currencies', {}))
        };
    }

    async fetch(): Promise<InitialStateStoresType> {
        const {stores: {globalStateStore}} = this;

        const results = await Promise.all(Object.values(this.stores)
                                     .map((store: any): Promise<any> | null => {
            return store.fetch && typeof store.fetch === 'function' ?
                loadingAndErrorDecorator(store.fetch, store, globalStateStore)() : null;
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
