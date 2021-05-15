import { UserPermissions, UserRoles } from "./../models/enum";
import { AsyncStorage } from "react-native";
import _, { includes } from "lodash";
import auth, { FirebaseAuthTypes, firebase } from "@react-native-firebase/auth";
import GetUser from "../features/login/api/GetUser";
import { AxiosApi } from "../common/helpers/axios";

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
  await AsyncStorage.setItem("@access_token", token);
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
  await firebase.auth().signOut();
  await onAuthStateChanged();
  const request = GetUser();
  await dispatch(AxiosApi(request));
};
