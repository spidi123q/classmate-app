import React from "react";
import { View, Linking, Alert } from "react-native";
import NativeLayout from "../../common/components/NativeLayout";
import styles from "./ErrorLayout.style";
import Sync from "./assets/Sync.svg";
import Bug from "./assets/Bug.svg";
import { slideUpProps } from "../../common/helpers/animation";
import * as Animatable from "react-native-animatable";
import { openStore, openURL } from "../../common/helpers/platform";
import config from "../../config.json";
import SystemConfig from "../../SystemConfig";
import Typography from "../../common/components/Typography";
import { Button } from "react-native-elements";
import NativeView from "../../common/components/NativeView";
import {
  DefaultMargin,
  DefaultThumbnailSize,
} from "../../common/config/themeConfig";
import NativeButton from "../../common/components/NativeButton";
import { getSystemConfigValue } from "../../common/helpers/remoteConfig";

interface IProps {
  type?: "update";
}

export default function ErrorLayout(props: IProps) {
  const { type } = props;
  return (
    <NativeLayout>
      <NativeView style={styles.container}>
        {(() => {
          switch (type) {
            case "update":
              return (
                <>
                  <Animatable.View {...slideUpProps}>
                    <Sync
                      height={DefaultThumbnailSize}
                      width={DefaultThumbnailSize}
                    />
                  </Animatable.View>
                  <NativeView justifyContent="center" alignItems="center">
                    <Typography
                      family="semiBold"
                      type="h2"
                      marginVertical={DefaultMargin}
                    >
                      Update app to continue
                    </Typography>
                    <NativeButton
                      title="Update"
                      width={200}
                      onPress={() => openStore(config.packageId)}
                    />
                  </NativeView>
                </>
              );
            default:
              return (
                <>
                  <Animatable.View {...slideUpProps}>
                    <Bug height={150} width={150} />
                  </Animatable.View>
                  <View style={styles.messageConatiner}>
                    <Typography>
                      Something went wrong! Contact support for help
                    </Typography>
                    <Button
                      onPress={() =>
                        openURL(
                          `mailto:${getSystemConfigValue("supportEmail")}`
                        )
                      }
                    >
                      Contact
                    </Button>
                  </View>
                </>
              );
          }
        })()}
      </NativeView>
    </NativeLayout>
  );
}
