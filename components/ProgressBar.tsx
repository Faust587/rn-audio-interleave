import { FC, useEffect, useRef } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { Slider } from 'react-native-awesome-slider';
import { runOnJS, useSharedValue } from 'react-native-reanimated';

import { Colors } from '@/const/colors';
import { formatTime } from '@/utils';

interface ProgressBarProps {
  currentTimeMs: number;
  durationMs: number;
  onSeek: (timeMs: number) => void;
}

export const ProgressBar: FC<ProgressBarProps> = ({ currentTimeMs, durationMs, onSeek }) => {
  const isSlidingRef = useRef(false);
  const progress = useSharedValue(currentTimeMs);
  const min = useSharedValue(0);
  const max = useSharedValue(durationMs);

  useEffect(() => {
    if (!isSlidingRef.current) {
      progress.value = currentTimeMs;
    }
  }, [currentTimeMs, progress]);

  useEffect(() => {
    max.value = durationMs;
  }, [durationMs, max]);

  return (
    <View style={styles.container}>
      <Slider
        renderBubble={() => null}
        style={styles.slider}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        theme={{
          minimumTrackTintColor: Colors.gold,
          maximumTrackTintColor: Colors.primaryLight,
        }}
        onSlidingStart={() => {
          runOnJS(() => {
            isSlidingRef.current = true;
          })();
        }}
        onSlidingComplete={value => {
          runOnJS(onSeek)(value);
          runOnJS(() => {
            isSlidingRef.current = false;
          })();
        }}
        onValueChange={value => {
          progress.value = value;
        }}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(currentTimeMs)}</Text>
        <Text style={styles.timeText}>{formatTime(durationMs)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  slider: {
    height: 10,
    borderRadius: 10,
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
});
