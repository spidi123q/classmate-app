declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "*.png" {
  export default content;
}

declare module "*.jpg" {
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

declare module "react-native-html-parser" {
  export class DOMParser {
    parseFromString(html: string, format: string): any {}
  }
}

declare module "react-native-android-immersive-mode" {
  declare const immersiveModeOn: () => void;
  declare const immersiveModeOff: () => void;
}
