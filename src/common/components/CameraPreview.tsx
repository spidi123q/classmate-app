import React from "react";
import { StyleSheet, Image, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Icon } from "react-native-elements";
import Ripple from "react-native-material-ripple";
import { AppTheme } from "../config/custom-theme";
import { DefaultMargin } from "../config/themeConfig";
import { slideUpProps } from "../helpers/animation";
import NativeLayout from "./NativeLayout";

interface IProps {
  uri: string;
  onSelected: (uri: string) => any;
}

export default function CameraPreview(props: IProps) {
  const { uri, onSelected } = props;
  // const uri: string = location.search.replace("?uri=", "");
  // console.log("CameraPreview -> uri", uri);

  return (
    <NativeLayout backgroundColor="black" barStyle="light-content">
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri,
          }}
        />
        <Ripple style={styles.iconContainer} onPress={() => onSelected(uri)}>
          <Icon reverse name="check" color={AppTheme["color-primary-500"]} />
        </Ripple>
      </View>
    </NativeLayout>
  );
}

interface IParams {
  uri: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  image: {
    flex: 1,
  },
  iconContainer: {
    position: "absolute",
    bottom: DefaultMargin,
    right: DefaultMargin,
  },
});
