import {observable, action, computed} from 'mobx';
import axios, {AxiosResponse} from 'axios';
import {Context, createContext} from 'react';

class ArticleStore {
    @observable id?: string;
    @observable article?: IArticle;

    constructor(article?: IArticle, id?: string) {
        this.id = id;
        this.article = article;
    }

    @computed
    get articleURL() {
        return `/articles/${this.id}`;
    }

    @action
    async fetch(): Promise<IArticle> {
        const response: AxiosResponse = await axios.get(this.articleURL);
        this.setArticle(response.data);
        return response.data;
    }

    @action
    setArticle(article: IArticle): void {
        this.article = article;
    }
}

export const ArticleStoreContext: Context<ArticleStore> = createContext(new ArticleStore());

export default ArticleStore;
