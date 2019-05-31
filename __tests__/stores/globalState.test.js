import GlobalStateStore from '../../stores/globalState';
import {autorun} from 'mobx/lib/mobx';

describe('Test GlobalStateStore', () => {
    let globalStateStore = null;

    beforeEach(() => {
        globalStateStore = new GlobalStateStore({isLoading: false, error: ''});
    });

    test('Check initial data', () => {
        expect(globalStateStore.isLoading).toBe(false);
    });

    test('Set isLoading', (done) => {
        expect(globalStateStore.isLoading).toBe(false);
        globalStateStore.setIsLoading(true);
        autorun(() => {
            expect(globalStateStore.isLoading).toBe(true);
            done();
        });
    });

    test('Set error', (done) => {
        expect(globalStateStore.error).toBe('');
        globalStateStore.setError('An error has been occurred');
        autorun(() => {
            expect(globalStateStore.error).toBe('An error has been occurred');
            done();
        });
    });
});
