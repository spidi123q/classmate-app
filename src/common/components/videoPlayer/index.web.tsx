import React from "react";
import { IProps } from ".";
import { Stream } from "@cloudflare/stream-react";
import { Icon } from "react-native-elements";
import { DefaultIconFamily } from "../../config/themeConfig";
import styles, { PlayerIconColor } from "./VideoPlayer.style";
import NativeView from "../NativeView";

export default function CloudFlareVideoPlayer(props: IProps) {
  const { cloudflareStreamVideoId, onBack, ...rest } = props;
  return (
    <NativeView minHeight={200}>
      <NativeView style={styles.webTopControls as any}>
        <Icon
          type={DefaultIconFamily}
          name="chevron-back-outline"
          color={PlayerIconColor}
          containerStyle={styles.webControlButton as any}
          onPress={onBack}
        />
      </NativeView>
      <Stream controls src={cloudflareStreamVideoId} {...rest} />
    </NativeView>
  );
}
