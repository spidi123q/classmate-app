import React from "react";
import NativeImage from "./NativeImage";

interface IProps {
  firebaseRef?: string;
  size?: number;
}

export function NativeAvatar({ firebaseRef, size }: IProps) {
  const imageSize = size ?? 35;
  return (
    <NativeImage
      height={imageSize}
      width={imageSize}
      borderRadius={imageSize}
      firebaseRef={firebaseRef}
    />
  );
}

export default React.memo(NativeAvatar);
