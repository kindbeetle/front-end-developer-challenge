import * as React from "react";
import { View } from "react-native";
import { observer } from "mobx-react-lite";
import { useNavigation } from "react-navigation-hooks";
import { connect } from "stent/lib/react";

import { VendingMachineHeader } from '../../components';
import { MachineDisplay, MachineProductList } from "./partials";
import { IVendingMachineState, IVendingMachineService } from '../../services';

import { IProduct }from '../../models';

interface HomeScreenProps {
  state: IVendingMachineState;
  selectProduct: (product: IProduct) => void;
}
const HomeScreen = observer<HomeScreenProps>(({ state, selectProduct }) => {
  const { navigate } = useNavigation();
  const { balance, messages, products } = state;
  const startDeposit = () => navigate("DepositCoins");

  console.log("vendingMachine state ", state);

  return (
    <View style={{ flex: 1, alignItems: "center", padding: 5 }}>
      <VendingMachineHeader balance={balance} onDeposit={startDeposit} />

      <MachineProductList products={products} onProductSelect={selectProduct} />

      <MachineDisplay messages={messages} />
    </View>
  );
});

export const ConnectedHomeScreen = connect(HomeScreen)
  .with("vendingMachine")
  .map((vendingMachine: IVendingMachineService) => ({
    state: vendingMachine.state,
    selectProduct: vendingMachine.selectProduct
  }));
