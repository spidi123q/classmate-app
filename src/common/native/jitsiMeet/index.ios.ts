import { NativeModules, requireNativeComponent } from "react-native";

export const JitsiMeetView = requireNativeComponent("RNJitsiMeetView");
export const RNJitsiMeet = NativeModules.RNJitsiMeetView;
