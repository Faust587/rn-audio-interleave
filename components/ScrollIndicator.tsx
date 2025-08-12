import { FC } from "react";
import { Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

interface ScrollIndicatorProps {
  isUserScrolling: boolean;
}

export const ScrollIndicator: FC<ScrollIndicatorProps> = ({
  isUserScrolling,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = withTiming(isUserScrolling ? 1 : 0, { duration: 200 });
    const backgroundColor = interpolateColor(
      isUserScrolling ? 1 : 0,
      [0, 1],
      ["transparent", "rgba(255, 107, 107, 0.9)"],
    );

    return {
      opacity,
      backgroundColor,
    };
  });

  if (!isUserScrolling) return null;

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.text}>Auto-scroll paused</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    zIndex: 1000,
  },
  text: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});
