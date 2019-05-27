import {observable, action} from 'mobx';
import {Context, createContext} from 'react';
import axios, {AxiosResponse} from 'axios';
import {delay} from '../utils';

const BASE_URL = process.env.BASE_URL;

class SessionStore {
    @observable session?: ISession;

    constructor(session?: ISession) {
        this.session = session;
    }

    @action
    setSession(session: ISession): void {
        this.session = session;
    }

    @action
    async createSession(): Promise<ISession> {
        const response: AxiosResponse = await axios.put(`${BASE_URL || ''}/session`);
        await delay(Math.random() * 1000);
        console.log(response.data);
        this.setSession(response.data);
        return response.data;
    }
}

export const SessionContext: Context<SessionStore> = createContext(new SessionStore());

export default SessionStore;
