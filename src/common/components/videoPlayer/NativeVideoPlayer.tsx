import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import CloudFlareVideoPlayer, { INativeVideoPlayerProps } from ".";
import { getSystemConfigValue } from "../../helpers/remoteConfig";
import useCloudflareStreamAPI from "../../hooks/useCloudflareStreamAPI";
import {
  ICloudflareVideoDetails,
  IPlayback,
} from "../../models/cloudflare/CloudflareVideoDetails";
import { NativeSkeletonPlaceholder } from "../nativeSkeleton";

export default function NativeVideoPlayer(props: INativeVideoPlayerProps) {
  const { cloudflareStreamVideoId, height, width, ...rest } = props;
  const { getVideoSignedToken } = useCloudflareStreamAPI();
  const [signedVideoToken, setSignedVideoToken] = useState<string>();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initVideo = async () => {
    const result = await getVideoSignedToken(cloudflareStreamVideoId);
    setSignedVideoToken(result?.payload.data);
    setIsLoading(false);
  };

  useEffect(() => {
    initVideo();
  }, []);

  if (isLoading) {
    return (
      <NativeSkeletonPlaceholder
        items={[
          {
            height,
            width,
          },
        ]}
      />
    );
  }

  if (!signedVideoToken) {
    return null;
  }

  return (
    <CloudFlareVideoPlayer
      cloudflareStreamVideoId={signedVideoToken}
      style={{ height, width }}
      onBack={navigation.goBack}
      {...rest}
      source={{
        uri: `https://videodelivery.net/${signedVideoToken}/manifest/video.m3u8`,
      }}
    />
  );
}
