import * as React from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";

export const MainLayout: React.FC = ({ children }) => (
  <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, alignSelf:'center', paddingVertical: 30 }}>Ultimate Vending machine</Text>
      {children}
    </SafeAreaView>
  </>
);
