import { event, useValue, Value } from "react-native-reanimated";

export default function useGesture() {
  const gestureX = useValue(0);
  const gestureY = useValue(0);
  const state = useValue(-1);

  const onGestureEvent = event([
    {
      nativeEvent: {
        translationX: gestureX,
        translationY: gestureY,
        state: state,
      },
    },
  ]);

  return {
    gestureX,
    gestureY,
    onGestureEvent,
  };
}
