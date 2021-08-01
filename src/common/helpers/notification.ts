import CreatePushToken from "../api/CreatePushToken";
import { AxiosApi } from "./axios";
import { getDeviceName } from "react-native-device-info";
import Toast from "react-native-toast-message";
import { DefaultMargin } from "../config/themeConfig";
import { Platform } from "react-native";
import { messaging } from "../native/firebase";

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
  });
};

export const initFCM = async () => {
  const token: string = await messaging().getToken();
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
