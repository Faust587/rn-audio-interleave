import { FC, useCallback } from 'react';
import { ChatMessage } from '@/types';
import { FlatList, StyleSheet, View } from 'react-native';
import { ChatItem } from './ChatItem';
import { useAutoScroll } from '../hooks';
import { ScrollIndicator } from '@/components';

type ChatListProps = {
  list: ChatMessage[];
  activeMessageId?: string;
};

const keyExtractor = (item: ChatMessage) => item.id;
const renderSeparator = () => <View style={styles.separator} />;

export const ChatList: FC<ChatListProps> = ({ list, activeMessageId }) => {
  // Find the index of the active message
  const activeMessageIndex = list.findIndex(item => item.id === activeMessageId);

  // Use the auto-scroll hook
  const { flatListRef, isUserScrolling, handleScroll, handleScrollToIndexFailed } = useAutoScroll({
    activeIndex: activeMessageIndex,
    scrollThreshold: 50,
    autoScrollDisableDuration: 3000,
    scrollAnimationDuration: 300,
  });

  const renderItem = useCallback(
    ({ item }: { item: ChatMessage }) => {
      return <ChatItem {...item} isActive={item.id === activeMessageId} />;
    },
    [activeMessageId],
  );

  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={flatListRef}
        data={list}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={keyExtractor}
        extraData={activeMessageId}
        removeClippedSubviews
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onScrollToIndexFailed={handleScrollToIndexFailed}
        getItemLayout={(data, index) => ({
          length: 80, // Approximate item height (can be adjusted)
          offset: 80 * index + 10 * index, // item height + separator height
          index,
        })}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.contentContainer}
      />
      <ScrollIndicator isUserScrolling={isUserScrolling} />
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
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
