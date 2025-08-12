import { FC, useCallback, useEffect, useMemo } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { Colors } from '@/const/colors';
import { useScreenWidth } from '@/hooks';

interface ProgressBarProps {
  currentTimeMs: number;
  durationMs: number;
  onSeek: (timeMs: number) => void;
}
const THUMB_SIZE = 20;

export const ProgressBar: FC<ProgressBarProps> = ({ currentTimeMs, durationMs, onSeek }) => {
  const screenWidth = useScreenWidth();
  const sliderWidth = useMemo(() => screenWidth - 40, [screenWidth]);
  const translateX = useSharedValue(0);
  const isDragging = useSharedValue(false);

  // Calculate progress based on current time and duration
  const progress = useMemo(() => {
    if (durationMs === 0) return 0;
    return Math.min(currentTimeMs / durationMs, 1);
  }, [currentTimeMs, durationMs]);

  // Update translateX when not dragging
  useEffect(() => {
    if (!isDragging.value) {
      translateX.value = progress * (sliderWidth - THUMB_SIZE);
    }
  }, [progress, isDragging.value, translateX, sliderWidth]);

  const formatTime = useCallback((ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const handleSeek = useCallback(
    (x: number) => {
      const clampedX = Math.max(0, Math.min(x, sliderWidth - THUMB_SIZE));
      const progressValue = clampedX / (sliderWidth - THUMB_SIZE);
      const timeMs = progressValue * durationMs;
      onSeek(timeMs);
    },
    [durationMs, onSeek, sliderWidth],
  );

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number }
  >({
    onStart: (_, context) => {
      context.startX = translateX.value;
      isDragging.value = true;
    },
    onActive: (event, context) => {
      const newX = context.startX + event.translationX;
      const clampedX = Math.max(0, Math.min(newX, sliderWidth - THUMB_SIZE));
      translateX.value = clampedX;
    },
    onEnd: () => {
      isDragging.value = false;
      runOnJS(handleSeek)(translateX.value);
    },
  });

  const tapGestureHandler = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onEnd: event => {
      const tapX = event.x - THUMB_SIZE / 2;
      const clampedX = Math.max(0, Math.min(tapX, sliderWidth - THUMB_SIZE));
      translateX.value = clampedX;
      runOnJS(handleSeek)(clampedX);
    },
  });

  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const progressStyle = useAnimatedStyle(() => {
    const width = translateX.value + THUMB_SIZE / 2;
    return {
      width: Math.max(0, width),
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(currentTimeMs)}</Text>
        <Text style={styles.timeText}>{formatTime(durationMs)}</Text>
      </View>

      <View style={styles.sliderContainer}>
        <TapGestureHandler onGestureEvent={tapGestureHandler}>
          <Animated.View style={styles.track}>
            <Animated.View style={[styles.progress, progressStyle]} />
            <PanGestureHandler onGestureEvent={panGestureHandler}>
              <Animated.View style={[styles.thumb, thumbStyle]} />
            </PanGestureHandler>
          </Animated.View>
        </TapGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 12,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 4,
    backgroundColor: Colors.gray.medium,
    borderRadius: 2,
    position: 'relative',
  },
  progress: {
    height: 4,
    backgroundColor: Colors.primary,
    borderRadius: 2,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    backgroundColor: Colors.primary,
    borderRadius: THUMB_SIZE / 2,
    position: 'absolute',
    top: -8,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
