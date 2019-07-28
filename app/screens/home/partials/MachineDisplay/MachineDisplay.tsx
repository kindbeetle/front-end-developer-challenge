import * as React from "react";
import { Text, View } from "react-native";

import { IMessage } from "../../../../models";

interface MachineDisplayProps {
  messages: IMessage[];
}

export const MachineDisplay: React.FC<MachineDisplayProps> = ({ messages }) => {
  const lastMessage = messages[messages.length - 1];
  let date;
  let text = "";

  if (messages.length > 0) {
    const dateOptions = {
      timezone: "Europe/Moscow",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    };
    date = new Date(lastMessage.date).toLocaleString("ru", dateOptions);
    text = lastMessage.text;
  }

  return (
    <View style={{ flex: 0.5, alignSelf: "stretch", padding: 5, borderWidth: 1, borderStyle: "dashed" }}>
      {lastMessage ? (
        <Text>
          [{date}] - {text}
        </Text>
      ) : null}
    </View>
  );
};
