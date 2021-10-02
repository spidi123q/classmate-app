import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { IPlaceholderItemProps, IPlaceholderProps } from ".";
import {
  DefaultPlaceholderBackgroudColor,
  DefaultPlaceholderHighlightColor,
} from "../../config/themeConfig";

export const NativeSkeletonPlaceholder: React.FunctionComponent<IPlaceholderProps> =
  (props) => {
    const { backgroundColor, highlightColor, items } = props;

    return (
      <SkeletonTheme
        color={backgroundColor ?? DefaultPlaceholderBackgroudColor}
        highlightColor={highlightColor ?? DefaultPlaceholderHighlightColor}
      >
        {items.map((item, index) => (
          <Skeleton key={index} {...item} />
        ))}
      </SkeletonTheme>
    );
  };
