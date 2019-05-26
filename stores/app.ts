import {createContext, Context} from 'react';
import {configure} from 'mobx';
import {useStaticRendering} from 'mobx-react-lite';
import NavigationStore, {INavigationItem} from './navigation';
import GlobalStateStore from './globalState';
import UserStore from './user';
import _ from 'lodash';

configure({ enforceActions: 'observed' });
const isServer: boolean = !process.browser;
useStaticRendering(isServer);

export type StoresType = {
    navigation: NavigationStore,
    globalState: GlobalStateStore,
    user: UserStore
}

export type InitialStateStoresType = {
    navigation: INavigationItem[],
    globalState: any,
    user: IUser
}

export type InitialStateType = {
    stores: InitialStateStoresType
};

class AppStore {

    stores: StoresType;

    constructor(InitialState?: InitialStateType) {
        this.stores = {
            navigation: new NavigationStore(_.get(InitialState, 'stores.navigation.items', [])),
            globalState: new GlobalStateStore(_.get(InitialState, 'stores.globalState', {})),
            user: new UserStore(_.get(InitialState, 'stores.user.user', {}))
        };
    }

    async fetch(): Promise<InitialStateStoresType> {
        const {stores: {globalState}} = this;

        const results = await Promise.all(Object.values(this.stores)
                                     .map((store: any): Promise<any> | null => {
            return store.fetch && typeof store.fetch === 'function' ?
                globalState.fetchErrorHandlerDecorator(store.fetch, store)() : null;
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
