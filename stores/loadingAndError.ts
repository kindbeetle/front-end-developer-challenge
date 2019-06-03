import {observable, action} from 'mobx';

interface ILoadingAndErrorStoreInitialState {
    isLoading: boolean,
    error: string
}

class LoadingAndErrorStore {
    @observable isLoading: boolean = false;
    @observable error: string = '';

    constructor({isLoading, error}: ILoadingAndErrorStoreInitialState) {
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
}

export function loadingAndErrorDecorator(fetch: Function, context: any, store: any): any {
    return async function(): Promise<any> {
        try {
            store.setIsLoading(true);
            const result = await fetch.apply(context, arguments);
            store.setIsLoading(false);
            return result;
        } catch (e) {
            store.setIsLoading(false);
            store.setError(e.message);
            return {error: e.message};
        }
    }
}

export default LoadingAndErrorStore;
