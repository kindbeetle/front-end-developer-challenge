import * as React from "react";
import { ScrollView, View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { connect } from "stent/lib/react";

import { useStore } from "../../stores";
import { VendingMachineHeader } from "../../components";
import { VirtualCoinMarket, DepositCoinsFooter } from "./partials";

import { ECurrencyCode } from "../../models";
import { IVendingMachineState, IVendingMachineService } from "../../services";

interface DepositCoinsScreenProps {
  state: IVendingMachineState;
  depositCash: (currency: ECurrencyCode, amount: number) => void;
  pay: () => void;
}
const DepositCoinsScreen: React.FC<DepositCoinsScreenProps> = ({ depositCash, pay, state }) => {
  const { navigate } = useNavigation();
  const { settings } = useStore();
  const { balance, selectedProduct } = state;
  const canPay = selectedProduct && selectedProduct.id ? true : false;
  const cancelPay = () => navigate("Home");

  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "space-between" }}>
      <VendingMachineHeader balance={balance} />

      <VirtualCoinMarket currencies={settings.currencies} depositCash={depositCash} />
      <DepositCoinsFooter canPay={canPay} onCancel={cancelPay} onSubmit={pay} />
    </ScrollView>
  );
};

export const ConnectedDepositCoinsScreen = connect(DepositCoinsScreen)
  .with("vendingMachine")
  .map((vendingMachine: IVendingMachineService) => ({
    state: vendingMachine.state,
    depositCash: vendingMachine.depositCash,
    pay: vendingMachine.pay
  }));
