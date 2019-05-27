import React from 'react';
import Layout from '../components/layouts/default';
import HomeGreeting from '../components/modules/HomeGreeting';
import ArticleStore, {ArticleStoreContext} from '../stores/article';
import {injectStoreHOC} from '../components/hocs/inject-store';

interface IHomePageProps {
    initialState: [IArticle],
    stores: any
}

function HomePage(props: IHomePageProps) {
    return (
        <ArticleStoreContext.Provider value={props.stores.articleStore}>
            <Layout title="Vending Machine | Welcome">
                <HomeGreeting />
            </Layout>
        </ArticleStoreContext.Provider>
    );
}

HomePage.stores = {
    articleStore: {
        Store: ArticleStore,
        initialState: [undefined, 'uruboros-1']
    }
};

export default injectStoreHOC(HomePage);
