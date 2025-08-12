import { FC, useEffect } from 'react';

import { View, StyleSheet } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

interface DotProps {
  animationProgress: Animated.SharedValue<number>;
  index: number;
  size: number;
  color: string;
}

const SIZES = {
  small: 20,
  medium: 32,
  large: 48,
};

const DOT_COUNT = 3;

const Dot: FC<DotProps> = ({ animationProgress, index, size, color }) => {
  const dotStyle = useAnimatedStyle(() => {
    const delay = index * 0.15;
    const progress = (animationProgress.value + delay) % 1;

    const scale = interpolate(progress, [0, 0.5, 1], [0.8, 1.2, 0.8], Extrapolate.CLAMP);

    const opacity = interpolate(progress, [0, 0.5, 1], [0.4, 1, 0.4], Extrapolate.CLAMP);

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        styles.dot,
        dotStyle,
        {
          width: size,
          height: size,
          backgroundColor: color,
        },
      ]}
    />
  );
};

export const LoadingIndicator: FC<LoadingIndicatorProps> = ({
  size = 'medium',
  color = '#8794FF',
}) => {
  const animationProgress = useSharedValue(0);
  const containerSize = SIZES[size];
  const dotSize = containerSize * 0.25;

  useEffect(() => {
    animationProgress.value = withRepeat(withTiming(1, { duration: 1200 }), -1, false);
  }, [animationProgress]);

  const containerStyle = useAnimatedStyle(() => ({
    width: containerSize,
    height: containerSize,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dotContainer, containerStyle]}>
        {Array.from({ length: DOT_COUNT }).map((_, index) => (
          <Dot
            key={index}
            animationProgress={animationProgress}
            index={index}
            size={dotSize}
            color={color}
          />
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dot: {
    borderRadius: 100,
  },
});
