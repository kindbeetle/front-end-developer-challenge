import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { Coin } from "../../../../components";

import { ICurrency, ECurrencyCode } from "../../../../models";

interface VirtualCoinMarketProps {
  currencies: ICurrency[];
  depositCash: (code: ECurrencyCode, amount: number) => void;
}
export const VirtualCoinMarket: React.FC<VirtualCoinMarketProps> = ({ currencies, depositCash }) => (
  <View style={{ flexDirection: "row", alignSelf: "stretch" }}>
    {currencies.map(currency => (
      <View style={{ alignItems: "center", width: "49%" }} key={currency.code}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>{currency.name}</Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {currency.coinValues.map(value => (
            <View key={value} style={{ alignItems: "center", width: "50%", marginBottom: 20 }}>
              <TouchableOpacity onPress={() => depositCash(currency.code, value)}>
                <Coin amount={value} currency={currency.code} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    ))}
  </View>
);
