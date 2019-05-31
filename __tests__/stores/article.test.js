import ArticleStore from '../../stores/article';
import axios from 'axios/index';
import {autorun} from 'mobx/lib/mobx';
import articleJSON from '../../static/data/article.json';

jest.mock('axios');
axios.get.mockResolvedValue({data: articleJSON});

const ARTICLE_NAME = 'uruboros-1';

const SECOND_ARTICLE = {
    "id": "uruboros-2",
    "title": "Second article",
    "text": "Second Article Description",
    "author": "Anton",
    "publishDate": "2019-11-11T20:22:23Z",
    "coverImage": "/static/img/vending-machine-poster.jpg"
};

describe('Test ArticleStore', () => {
    let articleStore = null;

    beforeEach(() => {
        articleStore = new ArticleStore(articleJSON, ARTICLE_NAME);
    });

    test('Check initial data', () => {
        expect(articleStore.id).toBe(ARTICLE_NAME);
        expect(articleStore.article.title).toBe('Greeting new vending machine app');
    });

    test('Check article url', () => {
        expect(articleStore.articleURL).toBe(`/articles/${ARTICLE_NAME}`);
    });

    test('Check set article', (done) => {
        articleStore.setArticle(SECOND_ARTICLE);
        autorun(() => {
            expect(articleStore.article.title).toBe(SECOND_ARTICLE.title);
            expect(articleStore.article.text).toBe(SECOND_ARTICLE.text);
            done();
        });
    });

    test('Check fetch', async (done) => {
        const data = await articleStore.fetch();
        expect(data).toEqual(articleJSON);
        autorun(() => {
            expect(articleStore.article.title).toBe(articleJSON.title);
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/articles/uruboros-1');
            done();
        });
    });
});
