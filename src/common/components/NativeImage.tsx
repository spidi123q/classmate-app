import React, { useEffect, useState } from "react";
import { ImageStyle, StyleProp, View } from "react-native";
import { Image, ImageProps } from "react-native-elements";
import Shimmer from "react-native-shimmer";
import { getBase64Image } from "../helpers/image";
import useFirebaseStorage from "../hooks/useFirebaseStorage";

interface IProps extends Partial<ImageProps> {
  firebaseRef?: string;
  thumbnail?: boolean;
}
function NativeImage(props: IProps & ImageStyle) {
  const {
    firebaseRef,
    style,
    source: originalSource,
    thumbnail,
    height,
    width,
    borderRadius,
    borderWidth,
    borderColor,
    ...rest
  } = props;
  const { isLoading, getDownloadURL } = useFirebaseStorage();
  const [uri, setUri] = useState<string>();
  const source = originalSource ?? require("../assets/no-photo.png");
  const imageStyle: StyleProp<ImageStyle> = [
    {
      height,
      width,
      borderRadius,
      borderWidth,
      borderColor,
    },
    style,
  ];
  const PlaceholderContent = null;
  const getFirebaseDownloadUrl = async () => {
    if (firebaseRef) {
      const url = await getDownloadURL(firebaseRef, thumbnail);
      setUri(getBase64Image(url));
    }
  };

  useEffect(() => {
    getFirebaseDownloadUrl();
    return () => {};
  }, []);

  return isLoading ? (
    PlaceholderContent
  ) : (
    <Image style={imageStyle} source={uri ? { uri } : source} {...rest} />
  );
}

export default React.memo(NativeImage);
