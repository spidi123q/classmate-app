import React from "react";
import { Overlay } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import Typography from "./Typography";

interface IProps {
  isVisible: boolean;
  packageId: string;
}

export default function UpdatePopup(props: IProps) {
  const { isVisible, packageId } = props;
  return (
    <Overlay isVisible={isVisible}>
      <View style={styles.container}>
        <Typography>Update from app to continue</Typography>
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  container: {},
});
