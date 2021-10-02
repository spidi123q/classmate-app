import React from "react";
import Ripples from "react-ripples";
import { INativeRippleProps } from ".";
import NativeView from "../NativeView";

const NativeRipple: React.FunctionComponent<INativeRippleProps> = ({
  children,
  rippleColor,
  style,
  onPress,
  ...rest
}) => {
  return (
    <Ripples color={rippleColor} onClick={onPress} {...(rest as any)}>
      <NativeView
        style={[
          style,
          {
            cursor: onPress ? "pointer" : undefined,
            width: "100%",
          } as any,
        ]}
      >
        {children}
      </NativeView>
    </Ripples>
  );
};

export default NativeRipple;
