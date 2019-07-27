import * as React from "react";
import { View } from "react-native";

import { IProduct } from "../../../../models";
import { MachineProductItem } from "../MachineProductItem";

interface MachineProductListProps {
  products: IProduct[];
}
export const MachineProductList: React.FC<MachineProductListProps> = ({ products }) => (
  <View style={{ flex: 3, flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
    {products.map(product => (
      <MachineProductItem key={product.id} product={product} />
    ))}
  </View>
);
