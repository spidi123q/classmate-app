import { useRef } from "react";
import { NativeScrollEvent } from "react-native";
import { NativeSyntheticEvent } from "react-native";
import { useDispatch } from "react-redux";
import { AppInfoActions } from "../state/AppInfoAction";
import { IScrollDirection } from "../state/AppInfoReducerState";
import useAppInfo from "./useAppInfo";

const SCROLLVIEW_DIRECTION_UP = 0; // indicates that the ScrollView component is scrolling up
const SCROLLVIEW_DIRECTION_DOWN = 1; // indicates that the ScrollView component scrolls down

export default function useScrollDirection() {
  const dispatch = useDispatch();

  const scrollViewStartOffsetYRef = useRef<number>(0);
  const scrollViewScrollDirectionYRef = useRef<number>(0);
  const scrollDirection = useAppInfo("scrollDirection");

  /**
   * Sliding start callback event
   *
   * Note: event.nativeEvent.contentOffset.y is still the value of the last slide when there is just started to slide, no change
   *
   * @param event
   * @private
   */
  const onScrollBeginDrag = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    //event.nativeEvent.contentOffset.y represents the offset of the Y-axis scroll
    const offsetY = event.nativeEvent.contentOffset.y;
    ///Record the Y axis offset of the scroll view scrolling
    scrollViewStartOffsetYRef.current = offsetY;
  };

  /**
   * ScrollView sliding callback event
   * @param event
   * @private
   */
  const onScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (scrollViewStartOffsetYRef.current > offsetY) {
      //Shift down, ScrollView component scrolls up
      //console.log('The gesture slides down, the ScrollView component scrolls up');
      scrollViewScrollDirectionYRef.current = SCROLLVIEW_DIRECTION_UP;
      dispatch(AppInfoActions.SetScrollDirection("up"));
    } else if (scrollViewStartOffsetYRef.current < offsetY) {
      //The gesture slides up and the ScrollView component scrolls down
      //console.log('The gesture is swiping up, the ScrollView component scrolling down');
      scrollViewScrollDirectionYRef.current = SCROLLVIEW_DIRECTION_DOWN;
      dispatch(AppInfoActions.SetScrollDirection("down"));
    }
  };

  return {
    onScrollBeginDrag,
    onScroll,
    onScrollEndDrag: onScroll,
  };
}
