import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface DepositCoinsFooterProps {
  onHomeClick: () => void;
}
export const DepositCoinsFooter: React.FC<DepositCoinsFooterProps> = ({ onHomeClick }) => (
  <View style={{ alignItems: "center" }}>
    <TouchableOpacity style={{ borderWidth: 1, padding: 4, backgroundColor: "#ccc" }} onPress={onHomeClick}>
      <Text style={{ fontSize: 24 }}>Ok</Text>
    </TouchableOpacity>
  </View>
);
