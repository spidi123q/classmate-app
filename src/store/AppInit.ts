import { AppInfoActions } from "../common/state/AppInfoAction";
import { AxiosApi } from "../common/helpers/axios";
import { Dispatch } from "redux";
import { enableScreens } from "react-native-screens";
import { initializeApp, onAuthStateChanged } from "../helpers/auth";
import GetConnectionPing from "./api/GetConnectionPing";
import GetUser from "../features/login/api/GetUser";
// import { showToast } from "../common/helpers/notification";
import GetSystemConfig from "./api/GetSystemConfig";
import SystemConfig from "../SystemConfig";
import config from "../config.json";
import GetNotification from "../common/api/GetNotifications";

const getUser = async (dispatch: Dispatch<any>) => {
  const request = GetUser();
  return dispatch(AxiosApi(request));
};

const pingServerConnection = async (dispatch: Dispatch<any>) => {
  const request = GetConnectionPing();
  return dispatch(AxiosApi(request));
};

const getNotifications = async (dispatch: Dispatch<any>) => {
  const request = GetNotification(
    {
      seen: false,
    },
    true
  );
  return dispatch(AxiosApi(request));
};

const getSystemConfig = (dispatch: any): any => {
  const request = GetSystemConfig();
  return dispatch(AxiosApi(request));
};

/**
 * Update system config variables
 * @param dispatch Redux dispatch
 */
const updateSystemConfig = async (dispatch: any) => {
  const result = await getSystemConfig(dispatch);
  if (result?.payload?.maxDistance) {
    SystemConfig.maxDistance = parseInt(result.payload.maxDistance);
  }
  if (result?.payload?.supportEmail) {
    SystemConfig.supportEmail = result.payload.supportEmail;
  }
  if (result?.payload?.minVersionCode) {
    SystemConfig.minVersionCode = parseInt(result.payload.minVersionCode);
    SystemConfig.isValidVersion =
      SystemConfig.minVersionCode <= config.versionCode;
  }
};

const Initialize = async (dispatch: Dispatch<any>) => {
  initializeApp();
  enableScreens();
  try {
    await onAuthStateChanged();
    // await pingServerConnection(dispatch);
    // console.log("Server connection ping success");
    // Blocking tasks should be added to promise array below
    await Promise.all([getUser(dispatch)]);
    // Non blocking tasks should be added to promise array below
    Promise.all([updateSystemConfig(dispatch)]);
    dispatch(AppInfoActions.AppReady());
  } catch (err) {
    console.log("Failed", err);
  }
};

export default Initialize;
