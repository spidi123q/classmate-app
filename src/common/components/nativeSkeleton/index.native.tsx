import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { IPlaceholderItemProps, IPlaceholderProps } from ".";
import {
  DefaultPlaceholderBackgroudColor,
  DefaultPlaceholderHighlightColor,
} from "../../config/themeConfig";

export const NativeSkeletonPlaceholder: React.FunctionComponent<IPlaceholderProps> =
  (props) => {
    const { items, backgroundColor, highlightColor } = props;

    return (
      <SkeletonPlaceholder
        backgroundColor={backgroundColor ?? DefaultPlaceholderBackgroudColor}
        highlightColor={highlightColor ?? DefaultPlaceholderHighlightColor}
      >
        {items.map((item, index) => (
          <SkeletonPlaceholder.Item key={index} {...item} />
        ))}
      </SkeletonPlaceholder>
    );
  };
