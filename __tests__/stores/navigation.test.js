import NavigationStore from '../../stores/navigation';
import axios from 'axios/index';
import {autorun} from 'mobx/lib/mobx';
import navigationJSON from '../../static/data/navigation.json';

jest.mock('axios');
axios.get.mockResolvedValue({data: navigationJSON});

describe('Test NavigationStore', () => {
    let navigationStore = null;

    beforeEach(() => {
        navigationStore = new NavigationStore(navigationJSON);
    });

    test('Check initial data', () => {
        expect(navigationStore.items[0].title).toBe('Home');
    });

    test('Check set items', (done) => {
        navigationStore.setItems([{id:"Test", title: "Test", href: "/test"}]);
        autorun(() => {
            expect(navigationStore.items[0].title).toBe('Test');
            done();
        });
    });

    test('Check fetch', async (done) => {
        const data = await navigationStore.fetch();
        expect(data).toEqual(navigationJSON);
        autorun(() => {
            expect(navigationStore.items[0].title).toBe('Home');
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/navigation');
            done();
        });
    });
});
