import * as React from "react";
import { View, Text } from "react-native";
import { observer } from "mobx-react-lite";

import { useStore } from "../../stores";
import { MachineCashier, MachineDisplay, MachineProductList } from "./partials";

export const HomeScreen = observer(() => {
  const { getVendingMachine } = useStore();

  const vendingMachine = getVendingMachine();
  const { balance, currencies, products, queue } = vendingMachine;

  return (
    <View style={{ flex: 1, alignItems: "center", padding: 5 }}>
      <Text style={{ fontSize: 16, paddingBottom: 10 }}>Select product:</Text>

      <MachineProductList products={products} />

      <MachineDisplay messages={queue} />

      <MachineCashier balance={balance} currencies={currencies} />
    </View>
  );
});
