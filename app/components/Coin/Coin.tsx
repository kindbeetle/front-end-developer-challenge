import * as React from "react";
import { Text, View } from "react-native";

import { ECurrencyCode } from "../../models";

const getCoinLabel = (amount: number, currency: ECurrencyCode) => {
  let newAmount = amount;
  let newCurrency = currency === ECurrencyCode.USD ? '$' : '€';

  if (amount < 1) {
    newAmount = amount * 100;
    newCurrency = "cents";
    if (amount === 0.01) {
      newCurrency = "cent";
    }
  }
  return (
    <>
      <Text>{newAmount}</Text>
      <Text>{newCurrency}</Text>
    </>
  );
};

interface CoinProps {
  amount: number;
  currency: ECurrencyCode;
}
export const Coin: React.FC<CoinProps> = ({ amount, currency }) => (
  <View
    style={{
      alignItems: "center",
      justifyContent: 'center',
      width: 60,
      height: 60,
      borderWidth: 2,
      color: "#ab7c14",
      borderColor: "#e2b24e",
      backgroundColor: "#fdebaa",
      borderRadius: 30
    }}
  >
    {getCoinLabel(amount, currency)}
  </View>
);
