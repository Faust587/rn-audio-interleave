import { FC, memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ChatMessage } from "@/types";

type ChatItemProps = ChatMessage & { isActive?: boolean };

const ChatItemComponent: FC<ChatItemProps> = ({
  speaker,
  message,
  right,
  isActive,
}) => {
  return (
    <View
      style={StyleSheet.flatten([
        styles.wrapper,
        right ? styles.rightMessageContainer : styles.leftMessageContainer,
      ])}
    >
      <Text style={right ? styles.rightLabel : undefined}>{speaker}</Text>
      <View
        style={StyleSheet.flatten([
          styles.messageContainer,
          isActive && styles.activeMessageContainer,
        ])}
      >
        <Text>{message}</Text>
      </View>
    </View>
  );
};

export const ChatItem = memo(ChatItemComponent);

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  messageContainer: {
    paddingHorizontal: 8,
    paddingVertical: 15.5,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  activeMessageContainer: {
    backgroundColor: "#E1E4FF",
  },
  rightMessageContainer: {
    alignSelf: "flex-end",
  },
  leftMessageContainer: {
    alignSelf: "flex-start",
  },
  rightLabel: {
    textAlign: "right",
  },
});
