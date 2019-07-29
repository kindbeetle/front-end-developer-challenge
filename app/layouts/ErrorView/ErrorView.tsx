import * as React from "react";
import { SafeAreaView, Text } from "react-native";

export const ErrorView: React.FC = () => (
  <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Error</Text>
  </SafeAreaView>
);
