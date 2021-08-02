import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import CloudFlareVideoPlayer, { INativeVideoPlayerProps } from ".";
import { getSystemConfigValue } from "../../helpers/remoteConfig";
import useCloudflareStream from "../../hooks/useCloudflareStream";
import {
  ICloudflareVideoDetails,
  IPlayback,
} from "../../models/cloudflare/CloudflareVideoDetails";
import { NativeSkeletonPlaceholder } from "../nativeSkeleton";

export default function NativeVideoPlayer(props: INativeVideoPlayerProps) {
  const { cloudflareStreamVideoId, height, width, ...rest } = props;
  const { getVideoDetails } = useCloudflareStream();
  const [videoDetails, setVideoDetails] = useState<ICloudflareVideoDetails>();
  const navigation = useNavigation();
  const protocol = getSystemConfigValue("streamingProtocol") as keyof IPlayback;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initVideo = async () => {
    const result = await getVideoDetails(cloudflareStreamVideoId);
    setVideoDetails(result?.payload);
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

  if (!videoDetails) {
    return null;
  }

  return (
    <CloudFlareVideoPlayer
      cloudflareStreamVideoId={videoDetails.token}
      style={{ height, width }}
      onBack={navigation.goBack}
      {...rest}
      source={{
        uri: videoDetails.playback[protocol],
      }}
    />
  );
}
