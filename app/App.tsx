/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import * as React from "react";

import { RootScreen } from "./screens";
import { StoreProvider, configureStore } from "./stores";

import { IRootStore } from "./stores/RootStore";

const App: React.FC = () => {
  const store: IRootStore = configureStore();

  const startApp = async (): Promise<void> => {
    await store.initApp();
  };

  React.useEffect(() => {
    startApp();
  }, []);

  return (
    <StoreProvider store={store}>
      <RootScreen />
    </StoreProvider>
  );
};

export default App;
