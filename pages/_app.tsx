import App, { Container } from 'next/app';
import { NextContext, NextComponentType } from 'next';
import AppStore, {AppStoreContext} from '../stores/app';
import {toJS} from 'mobx';

import 'bootstrap/dist/css/bootstrap.css';

export interface INextInitialProps {
    Component: NextComponentType,
    ctx: NextContext
}

type VendingMachineAppProps = NextComponentType & {initialState: any};

class VendingMachineApp extends App<VendingMachineAppProps> {
    static async getInitialProps({ Component, ctx }: INextInitialProps) {
        let pageProps = {};
        const appStore = new AppStore();

        if (typeof appStore.fetch === 'function') {
            await appStore.fetch();
        }

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        let baseUrl = '';
        if (ctx.req) {
            baseUrl = `http://${ctx.req.headers.host}`;
        }

        const initialState = toJS(appStore);

        return { pageProps, initialState, baseUrl};
    }

    render() {
        const { Component, pageProps, initialState } = this.props;

        return (
            <Container>
                <AppStoreContext.Provider value={new AppStore(initialState)}>
                    <Component {...pageProps} />
                </AppStoreContext.Provider>
            </Container>
        );
    }
}

export default VendingMachineApp;
