import { useRef } from "react";
import { Animated } from "react-native";

export default function useScroll(useNativeDriver: boolean = true) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY, x: scrollX } } }],
    { useNativeDriver }
  );

  return {
    scrollX,
    scrollY,
    onScroll,
  };
}
