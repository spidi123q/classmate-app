import React from "react";
import { View, Linking, Alert } from "react-native";
import NativeLayout from "../../common/components/NativeLayout";
import styles from "./ErrorLayout.style";
import Sync from "./assets/Sync.svg";
import Bug from "./assets/Bug.svg";
import { slideUpProps } from "../../common/helpers/animation";
import * as Animatable from "react-native-animatable";
import { openURL } from "../../common/helpers/platform";
import { getPlaystoreURL } from "../../common/helpers/format";
import config from "../../config.json";
import SystemConfig from "../../SystemConfig";
import Typography from "../../common/components/Typography";
import { Button } from "react-native-elements";

interface IParams {
  type?: "update";
}

export default function ErrorLayout() {
  const params = { type: "error" };
  return (
    <NativeLayout>
      <View style={styles.container}>
        {(() => {
          switch (params.type) {
            case "update":
              return (
                <>
                  <Animatable.View {...slideUpProps}>
                    <Sync height="150px" width="150px" />
                  </Animatable.View>
                  <View style={styles.messageConatiner}>
                    <Typography>Update app to continue</Typography>
                    <Button
                      onPress={() => openURL(getPlaystoreURL(config.packageId))}
                    >
                      Update
                    </Button>
                  </View>
                </>
              );
            default:
              return (
                <>
                  <Animatable.View {...slideUpProps}>
                    <Bug height="150px" width="150px" />
                  </Animatable.View>
                  <View style={styles.messageConatiner}>
                    <Typography>
                      Something went wrong! Contact support for help
                    </Typography>
                    <Button
                      onPress={() =>
                        openURL(`mailto:${SystemConfig.supportEmail}`)
                      }
                    >
                      Contact
                    </Button>
                  </View>
                </>
              );
          }
        })()}
      </View>
    </NativeLayout>
  );
}
