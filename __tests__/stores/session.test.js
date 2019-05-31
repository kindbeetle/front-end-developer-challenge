import SessionStore from '../../stores/session';
import axios from 'axios/index';
import {autorun} from 'mobx/lib/mobx';
import sessionJSON from '../../static/data/session.json';

jest.mock('axios');

describe('Test SessionStore', () => {
    let sessionStore = null;

    beforeEach(() => {
        sessionStore = new SessionStore(sessionJSON);
    });

    test('Check initial data', () => {
        expect(sessionStore.session.id).toBe('session-1');
    });

    test('Set session', (done) => {
        sessionStore.setSession({id: 'session-2', funds: 10});
        autorun(() => {
            expect(sessionStore.session.id).toBe('session-2');
            expect(sessionStore.session.funds).toBe(10);
            done();
        });
    });

    test('Create session', async (done) => {
        axios.put.mockResolvedValue({data: sessionJSON});
        const data = await sessionStore.createSession();
        expect(data).toEqual(sessionJSON);
        autorun(() => {
            expect(sessionStore.session.id).toBe('session-1');
            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(axios.put).toHaveBeenCalledWith('/session');
            done();
        });
    });

    test('Apply session', async (done) => {
        axios.put.mockResolvedValue({data: {status: 200, message: 'Successfully applied'}});
        const data = await sessionStore.apply(10);
        expect(data.status).toBe(200);
        autorun(() => {
            expect(sessionStore.session.funds).toBe(10);
            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(axios.put).toHaveBeenCalledWith('/session/apply', {dollarsAmount: 10});
            done();
        });
    });

    test('Charge session', async (done) => {
        axios.put.mockResolvedValue({data: {status: 200, message: 'Successfully charged'}});
        const data = await sessionStore.charge(10);
        expect(data.status).toBe(200);
        autorun(() => {
            expect(sessionStore.session.funds).toBe(-10);
            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(axios.put).toHaveBeenCalledWith('/session/charge', {dollarsAmount: 10});
            done();
        });
    });
});
