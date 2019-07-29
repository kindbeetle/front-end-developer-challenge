import * as React from "react";
import { Image, Text, View } from "react-native";

import { ICash } from "../../models";
import { Utils } from "../../Utils";
import { TouchableOpacity } from "react-native-gesture-handler";

interface VendingMachineHeaderProps {
  onDeposit?: () => void;
  balance: Partial<ICash>;
  onHomeClick?: () => void;
}
export const VendingMachineHeader: React.FC<VendingMachineHeaderProps> = ({ balance, onHomeClick, onDeposit }) => (
  <View style={{ flex: 1, flexDirection: "row", position: "relative" }}>
    <View style={{ alignItems: "center", paddingRight: 30 }}>
      <Text style={{ fontSize: 20 }}>Cash:</Text>

      {Object.keys(balance).map((item: string) => (
        <Text key={item} style={{ paddingBottom: 5 }}>
          {balance[item]} {item}
        </Text>
      ))}
    </View>

    <TouchableOpacity onPress={onDeposit ? onDeposit : Utils.noop}>
      <Image
        style={{ width: 64, height: 64, marginRight: 10 }}
        source={require("../../assets/images/insert-coin-icon.png")}
      />
    </TouchableOpacity>
  </View>
);
