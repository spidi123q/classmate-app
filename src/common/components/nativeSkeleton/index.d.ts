export interface IPlaceholderProps {
  highlightColor?: string;
  backgroundColor?: string;
}

export interface IPlaceholderItemProps {
  width?: string | number | undefined;
  height?: string | number | undefined;
  borderRadius?: number;
  marginTop?: number;
  marginRight?: number;
}

declare const NativeSkeletonPlaceholder: React.ComponentType<IPlaceholderProps>;
declare const NativeSkeletonItem: React.ComponentType<IPlaceholderItemProps>;

export { NativeSkeletonItem, NativeSkeletonPlaceholder };
