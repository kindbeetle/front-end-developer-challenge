import * as React from "react";

import { RootStore, IRootStore } from "./RootStore";
import { EAppState } from '../models';

export const storeContext = React.createContext<IRootStore | null>(null);

export const configureStore = (): IRootStore => {
  return RootStore.create({ state: EAppState.LOADING });
};

interface StoreProviderProps {
  store: IRootStore;
}
export const StoreProvider: React.FC<StoreProviderProps> = ({ store, children }) => {
  const { Provider } = storeContext;
  return <Provider value={store}>{children}</Provider>;
};

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) throw new Error("You have forgot to use StoreProvider.");

  return store;
};
