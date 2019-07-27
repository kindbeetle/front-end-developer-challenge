import * as React from "react";
import { Text, View } from "react-native";

import { ECurrencyCode, ICash } from "../../../../models";

interface MachineCashierProps {
  currencies: ECurrencyCode[];
  balance: ICash;
}
export const MachineCashier: React.FC<MachineCashierProps> = ({ balance, currencies }) => (
  <View style={{ flex: 0.5, flexDirection: "row", padding: 10 }}>
    <Text style={{ paddingRight: 5 }}>Balance:</Text>

    {Object.keys(balance).map((currency: string, index: number) => (
      <React.Fragment key={currency}>
        <Text>
          {currency} - {balance[currency]}
        </Text>
        <Text>{index + 1 === Object.keys(balance).length ? "" : ", "}</Text>
      </React.Fragment>
    ))}
  </View>
);
