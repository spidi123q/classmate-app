import React from "react";
import { IProps } from ".";
import VideoPlayer from "./VideoPlayer";

export default function CloudFlareVideoPlayer(props: IProps) {
  return <VideoPlayer {...props} />;
}
