import * as React from "react";
import { Text, View } from "react-native";
import { IProduct } from "../../../../models";

interface MachineProductItemProps {
  product: IProduct;
}
export const MachineProductItem: React.FC<MachineProductItemProps> = ({ product }) => (
  <View style={{ width: '45%', borderWidth: 1, margin: 5 }}>
    <Text>{product.name}</Text>
    <Text>{product.description}</Text>
    <Text>price: {product.price.USD}$</Text>
    <Text>price: {product.price.EUR}Euro</Text>
  </View>
);
