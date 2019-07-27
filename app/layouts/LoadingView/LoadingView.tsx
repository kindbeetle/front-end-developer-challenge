import * as React from "react";
import { Image, SafeAreaView } from "react-native";

export const LoadingView: React.FC = () => (
  <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Image source={require("../../assets/images/loading.gif")} />
  </SafeAreaView>
);
