import * as React from "react";
import { View } from "react-native";

import { IProduct } from "../../../../models";
import { MachineProductItem } from "../MachineProductItem";

interface MachineProductListProps {
  onProductSelect: (product: IProduct) => void;
  products: IProduct[];
}
export const MachineProductList: React.FC<MachineProductListProps> = ({ onProductSelect, products }) => {
  return (
    <View style={{ flex: 3, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
      {products.map(product => (
        <MachineProductItem key={product.id} product={product} onProductSelect={() => onProductSelect(product)} />
      ))}
    </View>
  );
};
