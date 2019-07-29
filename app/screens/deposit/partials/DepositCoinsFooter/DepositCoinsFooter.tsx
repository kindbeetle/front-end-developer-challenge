import * as React from "react";
import { Button, View } from "react-native";

interface DepositCoinsFooterProps {
  canPay: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}
export const DepositCoinsFooter: React.FC<DepositCoinsFooterProps> = ({ canPay, onCancel, onSubmit }) => (
  <View style={{ alignSelf: "stretch", flexDirection: "row", justifyContent: "space-around", paddingVertical: 10 }}>
    <Button title="Back" onPress={onCancel} />
    <Button title="Pay" disabled={!canPay} onPress={onSubmit} />
  </View>
);
