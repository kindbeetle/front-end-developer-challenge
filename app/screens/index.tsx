import * as React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { observer } from "mobx-react-lite";

import { useStore } from "../stores";
import { ConnectedHomeScreen } from "./home";
import { ConnectedDepositCoinsScreen } from "./deposit";
import { ErrorView, LoadingView, MainLayout } from "../layouts";

import { EAppState } from "../models";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: ConnectedHomeScreen },
    DepositCoins: { screen: ConnectedDepositCoinsScreen }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export const RootScreen = observer(() => {
  const { state } = useStore();
  const AppContainer = createAppContainer(MainNavigator);

  return state === EAppState.SUCCESS ? (
    <MainLayout>
      <AppContainer />
    </MainLayout>
  ) : state === EAppState.LOADING ? (
    <LoadingView />
  ) : (
    <ErrorView />
  );
});
