import * as React from "react";
import { Text, View } from "react-native";

interface MachineDisplayProps {
  messages: string[];
}
export const MachineDisplay: React.FC<MachineDisplayProps> = ({ messages }) => (
  <View style={{ flex: 1, alignSelf: 'stretch', borderWidth: 3, borderStyle: "dashed" }}>
    {messages.map((message: string) => (
      <Text key={message}>{message}</Text>
    ))}
  </View>
);
