import UserStore from '../../stores/user';
import axios from 'axios/index';
import {autorun} from 'mobx/lib/mobx';
import userJSON from '../../static/data/user.json';

jest.mock('axios');

const NEW_USER = {
    "email": "doe@john.com",
    "profile": {
        "firstName": "Doe",
        "lastName": "John",
        "age": "22"
    },
    "funds": {
        "USD": 100,
        "EUR": 50
    }
};

describe('Test UserStore', () => {
    let userStore = null;

    beforeEach(() => {
        userStore = new UserStore(userJSON);
    });

    test('Check initial data', () => {
        expect(userStore.user.email).toBe('john@doe.com');
    });

    test('Set user', (done) => {
        axios.get.mockResolvedValue({data: userJSON});
        userStore.setUser(NEW_USER);
        autorun(() => {
            expect(userStore.user.email).toBe('doe@john.com');
            expect(userStore.user.funds.USD).toBe(100);
            expect(userStore.fullName).toBe('Doe John');
            done();
        });
    });

    test('Check fetch', async(done) => {
        const data = await userStore.fetch();
        expect(data).toEqual(userJSON);
        autorun(() => {
            expect(userStore.user.email).toBe('john@doe.com');
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/user');
            done();
        });
    });

    test('Charge', async(done) => {
        axios.put.mockResolvedValue({data: {status: 200, message: 'Successfully charged'}});
        const data = await userStore.charge('USD', 20);
        expect(data.status).toBe(200);
        autorun(() => {
            expect(userStore.user.funds.USD).toBe(50);
            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(axios.put).toHaveBeenCalledWith('/user/charge', {"amount": 20, "currency": "USD"});
            done();
        });
    });
});
