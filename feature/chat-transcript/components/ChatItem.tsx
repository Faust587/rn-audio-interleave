import { FC, memo } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/const/index';
import { ChatMessage } from '@/types';

type ChatItemProps = ChatMessage & { isActive?: boolean };

const ChatItemComponent: FC<ChatItemProps> = ({ speaker, message, right, isActive }) => {
  return (
    <View
      style={StyleSheet.flatten([
        styles.wrapper,
        right ? styles.rightMessageContainer : styles.leftMessageContainer,
      ])}
    >
      <View style={styles.labelContainer}>
        <Text
          style={StyleSheet.flatten([
            right ? styles.rightLabel : undefined,
            styles.boldText,
            isActive ? styles.activeText : undefined,
          ])}
        >
          {speaker}
        </Text>
      </View>
      <View
        style={StyleSheet.flatten([
          styles.messageContainer,
          isActive && styles.activeMessageContainer,
        ])}
      >
        <Text
          style={StyleSheet.flatten([styles.boldText, isActive ? styles.activeText : undefined])}
        >
          {message}
        </Text>
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
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 8,
    paddingVertical: 15.5,
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
  activeMessageContainer: {
    backgroundColor: '#E1E4FF',
  },
  rightMessageContainer: {
    alignSelf: 'flex-end',
  },
  leftMessageContainer: {
    alignSelf: 'flex-start',
  },
  rightLabel: {
    textAlign: 'right',
  },
  boldText: {
    fontWeight: 600,
  },
  activeText: {
    color: Colors.gold,
  },
  labelContainer: {
    paddingHorizontal: 16,
  },
});
