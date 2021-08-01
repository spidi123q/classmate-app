import { ReactNativeFirebase } from "@react-native-firebase/app";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firebase from "firebase";

export const messaging = firebase.messaging;
export const auth: ReactNativeFirebase.FirebaseModuleWithStaticsAndApp<
  FirebaseAuthTypes.Module,
  FirebaseAuthTypes.Statics
> = firebase.auth as any;
export const analytics = firebase.analytics;
export const remoteConfig = firebase.remoteConfig;
export const isSupported = firebase.messaging.isSupported;
