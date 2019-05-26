import * as React from 'react';

export type CStore = {
    Store: any
    initialState: any[]
}

export type StoresType = {
    [key: string]: CStore
};

export type ReactNodeWithStore = React.ReactNode & {
    stores: StoresType
}

export type InjectedStoresType = {
    [key: string]: any
}

export function injectStoreHOC(WrappedComponent: ReactNodeWithStore): React.ReactNode {
    const stores: InjectedStoresType = {};

    const HOC = function WithStoresHOC(props: any) {

        if (!Object.keys(stores).length) {
            Object.keys(WrappedComponent.stores).forEach((storeName: string, index: number): void => {
                stores[storeName] = new WrappedComponent.stores[storeName].Store(props.initialState ? props.initialState[index] : {});
            });
        }

        return (
            <WrappedComponent stores={stores} {...props} />
        );
    };

    HOC.getInitialProps = async function getInitialProps() {
        const result = await Promise.all(Object.values(WrappedComponent.stores).map((CStore: CStore): Promise<any> | null => {
            const store = new CStore.Store(...CStore.initialState);
            return store.fetch && typeof store.fetch === 'function' ? store.fetch() : null;
        }));
        return {initialState: result};
    }

    return HOC;
}


