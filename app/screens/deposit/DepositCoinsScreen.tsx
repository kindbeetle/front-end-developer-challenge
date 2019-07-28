import * as React from "react";
import { ScrollView, View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { connect } from "stent/lib/react";

import { useStore } from "../../stores";
import { VendingMachineHeader } from "../../components";
import { VirtualCoinMarket, DepositCoinsFooter } from "./partials";

import { ECurrencyCode } from "../../models";
import { IVendingMachineState } from '../../services';

interface DepositCoinsScreenProps {
  state: IVendingMachineState;
  depositCash: (currency: ECurrencyCode, amount: number) => void;
}
const DepositCoinsScreen: React.FC<DepositCoinsScreenProps> = ({ depositCash, state }) => {
  const { navigate } = useNavigation();
  const { settings } = useStore();
  const { balance } = state;
  const goToHome = () => navigate("Home");

  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "space-between" }}>
      <VendingMachineHeader balance={balance} />

      <VirtualCoinMarket currencies={settings.currencies} depositCash={depositCash} />
      <DepositCoinsFooter onHomeClick={goToHome} />
    </ScrollView>
  );
};

export const ConnectedDepositCoinsScreen = connect(DepositCoinsScreen)
  .with("vendingMachine")
  .map((vendingMachine: any) => ({
    state: vendingMachine.state,
    depositCash: vendingMachine.depositCash
  }));
