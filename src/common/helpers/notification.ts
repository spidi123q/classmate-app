//import messaging from "@react-native-firebase/messaging";
import firebase from "firebase";
import CreatePushToken from "../api/CreatePushToken";
import { AxiosApi } from "./axios";
import { getDeviceName } from "react-native-device-info";
import Toast from "react-native-toast-message";
import { DefaultMargin } from "../config/themeConfig";
import { TAB_HEIGHT } from "../../layouts/headerNavigation/navigationFooter/NavigationFooter.style";
import { Platform } from "react-native";

export type ToastModes = "success" | "error" | "info";
export type ToastPosition = "top" | "bottom";

export const showToast = (
  title: string,
  message: string,
  type?: ToastModes,
  position?: ToastPosition
) => {
  Toast.show({
    text1: title,
    text2: message,
    type: type ?? "success",
    position: position ?? "bottom",
    bottomOffset: position === "top" ? DefaultMargin : TAB_HEIGHT,
  });
};

export const initFCM = async () => {
  const token: string = await (Platform.OS === "web"
    ? firebase.messaging().getToken()
    : "messaging().getToken()");
  console.log("initFCM -> token", token);
  return token;
};

/**
 * Update fcm token to server
 * @param dispatch Redux disptach object
 */
export const createPushToken = async (dispatch: any) => {
  try {
    const token = await initFCM();
    const deviceName = await getDeviceName();
    const request = CreatePushToken(token, deviceName);
    return dispatch(AxiosApi(request));
  } catch (err) {
    console.error(err);
  }
};
