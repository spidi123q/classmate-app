import { UserPermissions, UserRoles } from "./../models/enum";
import _, { includes } from "lodash";
import GetUser from "../features/login/api/GetUser";
import { AxiosApi } from "../common/helpers/axios";
import firebase from "@react-native-firebase/app";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import config from "../config.json";
import { Platform } from "react-native";
import { auth } from "../common/native/firebase";
import AsyncLocalStorage from "../common/native/asyncLocalStorage";

const signInAnonymously = async () => {
  try {
    return await auth().signInAnonymously();
  } catch (error) {
    console.error("TCL: signInAnonymously -> error", error);
  }
};

const setAccessToken = async (user?: FirebaseAuthTypes.User | null) => {
  console.log("setAccessToken -> user");
  if (!user) {
    console.error("Firebase auth failed to initialize");
    return;
  }
  const token: string = await user.getIdToken();
  console.log("Firebase token initialized: ", token);
  await AsyncLocalStorage.setItem("@access_token", token);
};

export const onAuthStateChanged = async (): Promise<FirebaseAuthTypes.User> => {
  return new Promise((resolve: any, reject: any) => {
    auth().onAuthStateChanged(async (user) => {
      console.log("TCL: onAuthStateChanged -> user");
      const authUser = user ?? (await signInAnonymously())?.user;
      const token = await authUser?.getIdToken();
      console.log("Firebase token initialized: ", token);
      authUser ? resolve(authUser) : reject();
    });
  });
};

export const initializeApp = () => {
  if (Platform.OS === "web") {
    firebase.initializeApp(config.firebase);
  }
};

/**
 *
 * @param permissions List of current user permissions
 * @param permission Required permission
 */
export const isAuthorized = (
  permissions: UserPermissions[],
  permission: UserPermissions
): boolean => {
  return includes(permissions, permission);
};

export const logout = async (dispatch: any) => {
  await auth().signOut();
  await onAuthStateChanged();
  const request = GetUser();
  await dispatch(AxiosApi(request));
};
