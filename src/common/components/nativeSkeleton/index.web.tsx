import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { IPlaceholderItemProps, IPlaceholderProps } from ".";
import {
  DefaultPlaceholderBackgroudColor,
  DefaultPlaceholderHighlightColor,
} from "../../config/themeConfig";

export const NativeSkeletonPlaceholder: React.FunctionComponent<IPlaceholderProps> =
  (props) => {
    const { children, backgroundColor, highlightColor } = props;

    return (
      <SkeletonTheme
        color={backgroundColor ?? DefaultPlaceholderBackgroudColor}
        highlightColor={highlightColor ?? DefaultPlaceholderHighlightColor}
      >
        {children as any}
      </SkeletonTheme>
    );
  };

export const NativeSkeletonItem = (props: IPlaceholderItemProps) => (
  <Skeleton {...props} />
);
