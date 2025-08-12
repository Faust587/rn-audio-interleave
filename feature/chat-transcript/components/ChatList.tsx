import { FC, useCallback } from "react";
import { ChatMessage } from "@/types";
import { FlatList, StyleSheet, View } from "react-native";
import { ChatItem } from "./ChatItem";

type ChatListProps = {
  list: ChatMessage[];
  activeMessageId?: string;
};

const keyExtractor = (item: ChatMessage) => item.id;
const renderSeparator = () => <View style={styles.separator} />;

export const ChatList: FC<ChatListProps> = ({ list, activeMessageId }) => {
  const renderItem = useCallback(
    ({ item }: { item: ChatMessage }) => {
      return <ChatItem {...item} isActive={item.id === activeMessageId} />;
    },
    [activeMessageId],
  );

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={list}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={keyExtractor}
        extraData={activeMessageId}
        removeClippedSubviews
      />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  wrapper: {
    paddingVertical: 20,
    flex: 1,
  },
});
