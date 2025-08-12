import { FC, useCallback } from "react";
import { ChatMessage } from "@/types";
import { FlatList, StyleSheet, View } from "react-native";
import { ChatItem } from "./ChatItem";

type ChatListProps = {
  list: ChatMessage[];
};

const keyExtractor = (item: ChatMessage) => item.id;
const renderSeparator = () => <View style={styles.separator} />;

export const ChatList: FC<ChatListProps> = ({ list }) => {
  const activeId = list[0].id;

  const renderItem = useCallback(
    ({ item }: { item: ChatMessage }) => {
      return <ChatItem {...item} isActive={item.id === activeId} />;
    },
    [activeId],
  );

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={list}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={keyExtractor}
        extraData={activeId}
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
