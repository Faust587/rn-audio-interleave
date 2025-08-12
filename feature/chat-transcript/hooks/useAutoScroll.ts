import { useRef, useEffect, useState, useCallback, RefObject } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

interface UseAutoScrollConfig {
  activeIndex: number;
  scrollThreshold?: number;
  autoScrollDisableDuration?: number;
  scrollAnimationDuration?: number;
}

interface UseAutoScrollReturn {
  flatListRef: RefObject<FlatList | null>;
  isUserScrolling: boolean;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  handleScrollToIndexFailed: (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => void;
}

export const useAutoScroll = ({
  activeIndex,
  scrollThreshold = 50,
  autoScrollDisableDuration = 3000,
  scrollAnimationDuration = 300,
}: UseAutoScrollConfig): UseAutoScrollReturn => {
  const flatListRef = useRef<FlatList | null>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const userScrollTimeoutRef = useRef<number | null>(null);
  const lastAutoScrollTimeRef = useRef<number>(0);

  // Handle scroll events to detect user scrolling
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentY = event.nativeEvent.contentOffset.y;
      const scrollDelta = Math.abs(currentY - lastScrollY);

      // Only consider it user scrolling if they moved more than threshold
      // and it's not from our auto-scroll
      const timeSinceAutoScroll = Date.now() - lastAutoScrollTimeRef.current;
      const isFromAutoScroll =
        timeSinceAutoScroll < scrollAnimationDuration + 100;

      if (scrollDelta > scrollThreshold && !isFromAutoScroll) {
        setIsUserScrolling(true);

        // Clear existing timeout
        if (userScrollTimeoutRef.current !== null) {
          clearTimeout(userScrollTimeoutRef.current);
        }

        // Re-enable auto-scroll after a delay
        userScrollTimeoutRef.current = setTimeout(() => {
          setIsUserScrolling(false);
        }, autoScrollDisableDuration);
      }

      setLastScrollY(currentY);
    },
    [
      lastScrollY,
      scrollThreshold,
      autoScrollDisableDuration,
      scrollAnimationDuration,
    ],
  );

  // Handle scroll to index failures
  const handleScrollToIndexFailed = useCallback(
    (info: {
      index: number;
      highestMeasuredFrameIndex: number;
      averageItemLength: number;
    }) => {
      // Scroll to the highest measured frame first, then try again
      flatListRef.current?.scrollToIndex({
        index: Math.min(info.index, info.highestMeasuredFrameIndex),
        animated: false,
      });

      // Try again after a short delay
      setTimeout(() => {
        if (flatListRef.current && activeIndex !== -1) {
          flatListRef.current.scrollToIndex({
            index: activeIndex,
            animated: true,
            viewPosition: 0.5,
          });
        }
      }, 100);
    },
    [activeIndex],
  );

  // Auto-scroll to active message
  useEffect(() => {
    if (activeIndex !== -1 && !isUserScrolling && flatListRef.current) {
      lastAutoScrollTimeRef.current = Date.now();

      // Use a small delay to ensure the FlatList is ready
      const timeoutId = setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: activeIndex,
          animated: true,
          viewPosition: 0.5, // Center the item in the viewport
        });
      }, 50);

      return () => clearTimeout(timeoutId);
    }
  }, [activeIndex, isUserScrolling]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (userScrollTimeoutRef.current !== null) {
        clearTimeout(userScrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    flatListRef,
    isUserScrolling,
    handleScroll,
    handleScrollToIndexFailed,
  };
};
