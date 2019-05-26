import NavigationStore from '../../stores/navigation';
import axios from 'axios/index';
import {autorun} from 'mobx/lib/mobx';

const NAVIGATION_INITIAL_DATA = [
    {
        "id": "home",
        "title": "Home",
        "href": "/"
    },
    {
        "id": "vending-machine",
        "title": "Vending Machine",
        "href": "/vending-machine"
    }
];

jest.mock('axios');
axios.get.mockResolvedValue({data: NAVIGATION_INITIAL_DATA});

describe('Test NavigationStore', () => {
    let navigationStore = null;

    beforeEach(() => {
        navigationStore = new NavigationStore(NAVIGATION_INITIAL_DATA);
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
        expect(data).toEqual(NAVIGATION_INITIAL_DATA);
        autorun(() => {
            expect(navigationStore.items[0].title).toBe('Home');
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/static/data/navigation.json');
            done();
        });
    });
});
