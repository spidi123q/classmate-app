import { isEmpty, isNil } from "lodash";
import React from "react";
import { ViewStyle } from "react-native";
import { Icon, withBadge, BadgeProps, IconProps } from "react-native-elements";
import NativeView from "./NativeView";

interface IProps extends IconProps {
  count?: number;
}

const BadgedIcon = ({
  count,
  onPress,
  marginLeft,
  marginRight,
  ...rest
}: IProps & ViewStyle) => {
  const CustomBadgeIcon = withBadge(count, {
    top: -1,
    right: -2,
    hidden: isNil(count) || count === 0,
  })(Icon);
  return (
    <NativeView
      type="ripple"
      onPress={onPress}
      rippleContainerBorderRadius={500}
      padding={0.2 * (rest.size ?? 0)}
      marginLeft={marginLeft}
      marginRight={marginRight}
    >
      <CustomBadgeIcon {...rest} />
    </NativeView>
  );
};

export default BadgedIcon;
