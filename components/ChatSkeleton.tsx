import { FC, useEffect } from 'react';

import { StyleSheet, View } from 'react-native';

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Colors } from '@/const/colors';

interface ChatSkeletonProps {
  count?: number;
}

const SKELETON_MESSAGES = [
  { width: 75, right: false },
  { width: 60, right: true },
  { width: 85, right: false },
  { width: 70, right: true },
  { width: 90, right: false },
  { width: 55, right: true },
];

const SkeletonMessage: FC<{ width: number; right: boolean; delay: number }> = ({
  width,
  right,
  delay: _delay,
}) => {
  const shimmerProgress = useSharedValue(0);

  useEffect(() => {
    shimmerProgress.value = withRepeat(withTiming(1, { duration: 1500 }), -1, false);
  }, [shimmerProgress]);

  const shimmerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(shimmerProgress.value, [0, 0.5, 1], [0.3, 0.7, 0.3]);

    return {
      opacity,
    };
  });

  return (
    <View style={[styles.messageContainer, right && styles.rightMessage]}>
      <Animated.View
        style={[
          styles.skeletonBubble,
          { width: `${width}%` },
          right && styles.rightBubble,
          shimmerStyle,
        ]}
      >
        <View style={styles.skeletonLine} />
        <View style={[styles.skeletonLine, styles.shortLine]} />
      </Animated.View>
    </View>
  );
};

export const ChatSkeleton: FC<ChatSkeletonProps> = ({ count = 6 }) => {
  const messages = SKELETON_MESSAGES.slice(0, count);

  return (
    <View style={styles.container}>
      {messages.map((message, index) => (
        <View key={index}>
          <SkeletonMessage width={message.width} right={message.right} delay={index * 200} />
          {index < messages.length - 1 && <View style={styles.separator} />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  rightMessage: {
    justifyContent: 'flex-end',
  },
  skeletonBubble: {
    backgroundColor: Colors.gray.light,
    borderRadius: 12,
    padding: 12,
    maxWidth: '85%',
  },
  rightBubble: {
    backgroundColor: Colors.background.skeleton,
  },
  skeletonLine: {
    height: 14,
    backgroundColor: Colors.gray.dark,
    borderRadius: 7,
    marginVertical: 2,
  },
  shortLine: {
    width: '60%',
  },
  separator: {
    height: 10,
  },
});
