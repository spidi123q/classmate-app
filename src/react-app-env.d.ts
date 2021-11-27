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

declare module "*.ttf" {
  export default content;
}

declare module "*.otf" {
  export default content;
}

declare module "*.woff2" {
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

declare module "react-native-razorpay" {
  export interface IOptions {
    description: string;
    image: string;
    currency: string;
    key: string;
    amount: string;
    name: string;
    order_id: string;
    prefill: IPrefill;
    theme: ITheme;
  }

  export interface IPrefill {
    email: string;
    contact: string;
    name: string;
  }

  export interface ITheme {
    color: string;
  }
  declare const RazorpayCheckout: {
    open(options: IOptions): Promise<"already-enabled" | "enabled">;
  };
  export default RazorpayCheckout;
}
