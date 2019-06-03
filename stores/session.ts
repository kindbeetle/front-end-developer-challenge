import {observable, action} from 'mobx';
import {Context, createContext} from 'react';
import axios, {AxiosResponse} from 'axios';
import {delay} from '../utils';
import LoadingAndErrorStore, {loadingAndErrorDecorator} from './loadingAndError';

class SessionStore extends LoadingAndErrorStore {
    @observable session?: ISession;

    constructor(session?: ISession) {
        super({isLoading: false, error: ''});
        this.session = session;
        this.createSession = loadingAndErrorDecorator(this.createSession, this, this);
        this.apply = loadingAndErrorDecorator(this.apply, this, this);
        this.charge = loadingAndErrorDecorator(this.charge, this, this);
    }

    @action
    setSession(session: ISession): void {
        this.session = session;
    }

    @action
    increaseSessionFunds(dollarsAmount: number) {
        if (this.session) {
            this.session.funds += dollarsAmount;
        }
    }

    @action
    async createSession(): Promise<ISession> {
        const response: AxiosResponse = await axios.put('/session');
        await delay(Math.random() * 2000);
        this.setSession(response.data);
        return response.data;
    }

    @action
    async apply(dollarsAmount: number): Promise<IResponse> {
        const response: AxiosResponse = await axios.put('/session/apply', {dollarsAmount});
        await delay(Math.random() * 2000);
        if (dollarsAmount) {
            this.increaseSessionFunds(dollarsAmount);
        }
        return response.data;
    }

    @action
    async charge(dollarsAmount: number): Promise<IResponse> {
        const response: AxiosResponse = await axios.put('/session/charge', {dollarsAmount});
        await delay(Math.random() * 2000);
        if (dollarsAmount) {
            this.increaseSessionFunds(-dollarsAmount);
        }
        return response.data;
    }
}

export const SessionContext: Context<SessionStore> = createContext(new SessionStore());

export default SessionStore;
