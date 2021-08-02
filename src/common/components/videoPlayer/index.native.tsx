import React from "react";
import { IProps } from ".";
import VideoPlayer from "./VideoPlayer";

export default function CloudFlareVideoPlayer(props: IProps) {
  const { cloudflareStreamVideoId, ...rest } = props;
  return <VideoPlayer {...rest} />;
}
