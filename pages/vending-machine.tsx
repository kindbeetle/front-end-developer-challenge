import React from 'react';
import Layout from '../components/layouts/default';
import ProductsStore, {ProductsContext} from '../stores/products';
import SessionStore, {SessionContext} from '../stores/session';
import {injectStoreHOC} from '../components/hocs/inject-store';
import VendingMachine from '../components/modules/VendingMachine/VendingMachine';

interface IVendingMachinePageProps {
    initialState: [],
    stores: {
        productsStore: ProductsStore
        sessionStore: SessionStore
    }
}

function VendingMachinePage({stores: {productsStore, sessionStore}}: IVendingMachinePageProps) {

    return (
        <ProductsContext.Provider value={productsStore}>
            <SessionContext.Provider value={sessionStore}>
                <Layout title="Vending Machine | Vending Machine">
                    <VendingMachine />
                </Layout>
            </SessionContext.Provider>
        </ProductsContext.Provider>
    )
}

VendingMachinePage.stores = {
    productsStore: {
        Store: ProductsStore,
        initialState: []
    },
    sessionStore: {
        Store: SessionStore,
        initialState: []
    }
};

export default injectStoreHOC(VendingMachinePage);
