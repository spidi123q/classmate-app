import React, { PureComponent, useState } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RNCamera } from "react-native-camera";
import { Icon } from "react-native-elements";
import Ripple from "react-native-material-ripple";
import {
  DefaultIconFamily,
  DefaultMargin,
  FontSize,
} from "../config/themeConfig";
import ImagePicker from "react-native-image-picker";
import NativeLayout from "./NativeLayout";

interface IProps {
  onCapture: (uri: string) => any;
}

export default function NativeCamera(props: IProps) {
  const { onCapture } = props;
  const [flashMode, setFlashMode] = useState<boolean>(false);
  const [isBackCamera, setIsBackCamera] = useState<boolean>(true);

  const takePicture = async function (camera: RNCamera) {
    const options = { quality: 0.5, base64: true };
    const { uri, base64 } = await camera.takePictureAsync(options);
    console.log("Capture image:  ", uri);
    onCapture(uri);
    // history.push(`${RoutePath.CameraPreview}?uri=${data.uri}`);
  };

  const openGallery = () => {
    ImagePicker.launchImageLibrary({}, ({ uri }) => {
      uri && onCapture(uri);
    });
  };

  return (
    <NativeLayout backgroundColor="black" barStyle="light-content">
      <RNCamera
        style={styles.preview}
        type={
          isBackCamera
            ? RNCamera.Constants.Type.back
            : RNCamera.Constants.Type.front
        }
        flashMode={
          flashMode
            ? RNCamera.Constants.FlashMode.on
            : RNCamera.Constants.FlashMode.off
        }
        useNativeZoom
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
      >
        {({ camera, status, recordAudioPermissionStatus }) => {
          if (status !== "READY") return <PendingView />;
          return (
            <View style={styles.controlerContainer}>
              <View style={styles.controlerSectionContainer}>
                <Ripple onPress={openGallery}>
                  <Icon
                    size={FontSize.h1}
                    name="image-outline"
                    type={DefaultIconFamily}
                    color="white"
                  />
                </Ripple>
              </View>
              <TouchableOpacity>
                <Ripple
                  style={styles.captureButton}
                  onPress={() => takePicture(camera)}
                >
                  <View style={styles.captureButtonCircle}></View>
                </Ripple>
              </TouchableOpacity>
              <View style={styles.controlerSectionContainer}>
                <Ripple onPress={() => setFlashMode(!flashMode)}>
                  <Icon
                    size={FontSize.h1}
                    name={flashMode ? "flash-off-outline" : "flash-outline"}
                    type={DefaultIconFamily}
                    color="white"
                  />
                </Ripple>
                <Ripple onPress={() => setIsBackCamera(!isBackCamera)}>
                  <Icon
                    size={FontSize.h1}
                    name="camera-reverse-outline"
                    type={DefaultIconFamily}
                    color="white"
                  />
                </Ripple>
              </View>
            </View>
          );
        }}
      </RNCamera>
    </NativeLayout>
  );
}

const PendingView = () => (
  <View style={styles.pendingContainer}>
    <Text style={{ color: "white" }}>Waiting</Text>
  </View>
);

const CaptureButtonHeight = 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  pendingContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  controlerContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: DefaultMargin,
    width: "100%",
  },
  captureButton: {
    height: CaptureButtonHeight,
    width: CaptureButtonHeight,
    borderRadius: CaptureButtonHeight / 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonCircle: {
    borderColor: "black",
    borderWidth: 2,
    height: CaptureButtonHeight - DefaultMargin,
    width: CaptureButtonHeight - DefaultMargin,
    borderRadius: (CaptureButtonHeight - DefaultMargin) / 2,
  },
  controlerSectionContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
