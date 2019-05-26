import {observable, action} from 'mobx';

interface IGlobalStoreInitialState {
    isLoading: boolean,
    error: string
}

class GlobalStateStore {
    @observable isLoading: boolean = false;
    @observable error: string = '';

    constructor({isLoading, error}: IGlobalStoreInitialState) {
        this.isLoading = isLoading;
        this.error = error;
    }

    @action
    setIsLoading(isLoading: boolean): void {
        this.isLoading = isLoading;
    }

    @action
    setError(error: string): void {
        this.error = error;
    }

    fetchErrorHandlerDecorator(fetch: Function, context: any): Function {
        const store = this;
        return async function(): Promise<any> {
            try {
                store.setIsLoading(true);
                const result = await fetch.apply(context, arguments);
                store.setIsLoading(false);
                return result;
            } catch (e) {
                store.setIsLoading(false);
                store.setError(e.message);
                return {};
            }
        }
    }
}

export default GlobalStateStore;
