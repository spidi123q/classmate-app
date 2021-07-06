import { showToast } from "./notification";
import {
  PermissionsAndroid,
  Rationale,
  Platform,
  Linking,
  Alert,
  Permission as AndroidPermission,
  Share,
} from "react-native";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import { delay } from "./misc";
import Geolocation, { GeoPosition } from "react-native-geolocation-service";
import { ToastTitle } from "../models/enum";

/**
 *
 * @param type name of the permission need
 * @param rationale Description regarding why permission needed
 */
export const requestPermission = async (
  type: Permission,
  rationale?: Rationale | undefined
): Promise<boolean> => {
  if (Platform.OS !== "android") {
    return true;
  }
  try {
    const granted = await PermissionsAndroid.request(
      permissionMap[type],
      rationale
    );
    const result: boolean = granted === PermissionsAndroid.RESULTS.GRANTED;
    !result ??
      showToast(
        ToastTitle.PermissionError,
        `${type} permission denied`,
        "error"
      );
    return result;
  } catch (err) {
    console.log("err", err);
    showToast(ToastTitle.Error, "Unknown error", "error");
    return false;
  }
};

const permissionMap: Record<Permission, AndroidPermission> = {
  location: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  read_external_storage: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
};
type Permission = "location" | "read_external_storage";

/**
 * Get geo location of the user
 */
export const getCurrentPosition = async (): Promise<GeoPosition> => {
  const hasPermission: boolean = await requestPermission("location");
  return new Promise(async (resolve, reject) => {
    !hasPermission && reject("No permission");
    const isLocEnabled: boolean = await promptForEnableLocationIfNeeded();
    !isLocEnabled && reject("No location enabled");
    if (hasPermission && isLocEnabled) {
      Geolocation.getCurrentPosition(
        (success) => resolve(success),
        (error) => {
          console.error(error);
          reject(error);
        },
        {
          timeout: 70000,
        }
      );
    }
  });
};

/**
 * Enable location prompt for android only
 */
const promptForEnableLocationIfNeeded = async (): Promise<boolean> => {
  if (Platform.OS === "ios") {
    const result = await Geolocation.requestAuthorization("whenInUse");
    console.log(
      "🚀 ~ file: platform.ts ~ line 83 ~ promptForEnableLocationIfNeeded ~ result",
      result
    );
    return true;
  }
  try {
    await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    });
    // for better accuracy
    await delay();
    return true;
  } catch (err) {
    console.log("Prompt error", err);
    return false;
  }
};

export const openURL = async (
  url?: string,
  type: "url" | "mail" | "tel" = "url"
) => {
  if (!url) {
    return;
  }
  let supported;
  let newUrl: string = url;

  if (type === "mail") {
    newUrl = `mailto:${url}`;
    supported = await Linking.canOpenURL(`mailto:${url}`);
  } else if (type === "url") {
    supported = await Linking.canOpenURL(url);
  } else if (type === "tel") {
    newUrl = `tel:${url}`;
    supported = await Linking.canOpenURL(`tel:${url}`);
  }

  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    try {
      await Linking.openURL(newUrl);
    } catch (err) {
      showToast(ToastTitle.Error, err.message, "error");
    }
  } else {
    showToast(
      ToastTitle.Error,
      `Don't know how to open this URL: ${url}`,
      "error"
    );
  }
};

export const onShare = async (message: string) => {
  try {
    const result = await Share.share({
      message,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

export const getPlaystoreURL = (packageId: string) =>
  `http://play.google.com/store/apps/details?id=${packageId}`;

export const openStore = (packageId: string) => {
  if (Platform.OS === "android") {
    openURL(getPlaystoreURL(packageId));
  }
};
