import * as React from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";

export const MainLayout: React.FC = ({ children }) => (
  <>
    <StatusBar barStyle="light-content" />
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ alignSelf: "center", paddingVertical: 30, fontSize: 24, fontStyle: "italic" }}>
        Jelly beans Vending machine
      </Text>
      {children}
    </SafeAreaView>
  </>
);
