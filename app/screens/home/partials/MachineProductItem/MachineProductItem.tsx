import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { IProduct } from "../../../../models";

interface MachineProductItemProps {
  product: IProduct;
  onProductSelect: () => void;
}
export const MachineProductItem: React.FC<MachineProductItemProps> = ({ product, onProductSelect }) => {
  return (
    <TouchableOpacity
      style={{ width: "49%", borderWidth: 1, borderRadius: 10, padding: 5, marginBottom: 5 }}
      onPress={onProductSelect}
    >
      <Text style={{ marginBottom: 10, fontSize: 20 }}>{product.name}</Text>
      <Text style={{ marginBottom: 5, fontSize: 16 }}>{product.quantity > 0 ? product.quantity : "not"} available</Text>
      <Text>{product.price.USD}$</Text>
      <Text>{product.price.EUR}€</Text>
    </TouchableOpacity>
  );
};
