import React from "react";
import { IProps } from ".";
import { Stream } from "@cloudflare/stream-react";

export default function VideoPlayer(props: IProps) {
  const { source, ...rest } = props;
  return <Stream controls src={source.uri} {...rest} />;
}
