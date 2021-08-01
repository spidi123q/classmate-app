import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { IPlaceholderItemProps, IPlaceholderProps } from ".";
import {
  DefaultPlaceholderBackgroudColor,
  DefaultPlaceholderHighlightColor,
} from "../../config/themeConfig";

export const NativeSkeletonPlaceholder: React.FunctionComponent<IPlaceholderProps> =
  (props) => {
    const { children, backgroundColor, highlightColor } = props;

    return (
      <SkeletonPlaceholder
        backgroundColor={backgroundColor ?? DefaultPlaceholderBackgroudColor}
        highlightColor={highlightColor ?? DefaultPlaceholderHighlightColor}
      >
        {children as any}
      </SkeletonPlaceholder>
    );
  };

export const NativeSkeletonItem = (props: IPlaceholderItemProps) => (
  <SkeletonPlaceholder.Item {...props} />
);
