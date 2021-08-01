import React from "react";

export interface IPlaceholderItemProps {
  width?: string | number | undefined;
  height?: string | number | undefined;
  borderRadius?: number;
  marginTop?: number;
  marginRight?: number;
}

export interface IPlaceholderProps {
  highlightColor?: string;
  backgroundColor?: string;
  items: IPlaceholderItemProps[];
}

declare const NativeSkeletonPlaceholder: React.ComponentType<IPlaceholderProps>;

export { NativeSkeletonPlaceholder };
