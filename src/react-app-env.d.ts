/// <reference types="react-scripts" />

declare module "*.svg" {
  const content: React.ComponentType<
    {
      width?: string | number;
      height?: string | number;
      opacity?: string;
      preserveAspectRatio?: string | "none";
      style?: any;
    } & ViewStyle
  >;
  export default content;
}

declare module "*.png" {
  export default content;
}

declare module "react-native-material-ripple" {
  import { TouchableWithoutFeedbackProps } from "react-native";
  export interface RippleProps extends TouchableWithoutFeedbackProps {
    rippleColor?: string;
    rippleOpacity?: number;
    rippleDuration?: number;
    rippleSize?: number;
    rippleContainerBorderRadius?: number;
    rippleCentered?: boolean;
    rippleSequential?: boolean;
    rippleFades?: boolean;
    disabled?: boolean;
    onRippleAnimation?: Function;
  }
  declare const Ripple: React.ComponentType<RippleProps>;
  export default Ripple;
}

declare module "react-native-android-location-enabler" {
  declare const RNAndroidLocationEnabler: {
    promptForEnableLocationIfNeeded({
      interval: number,
      fastInterval: number,
    }): Promise<"already-enabled" | "enabled">;
  };
  export default RNAndroidLocationEnabler;
}
