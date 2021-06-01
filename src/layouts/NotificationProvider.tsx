import React, { FunctionComponent, useEffect } from "react";
import AppState from "../store/AppState";
import { connect } from "react-redux";
import ToastMessage from "../common/models/ToastMessage";
import { createPushToken, showToast } from "../common/helpers/notification";
import Toast from "react-native-toast-message";
import { User } from "../models/User";
import { messaging } from "../common/native/firebase";

interface IProps {
  user: User;
  appReady: boolean;
  lastApiError?: ToastMessage;
  updateFCMToken(): Promise<any>;
}

const NotificationProvider: FunctionComponent<IProps> = (props) => {
  const { lastApiError, children, updateFCMToken, user, appReady } = props;

  useEffect(() => {
    const unsubscribeMessaging = messaging().onMessage((payload) => {
      payload.notification &&
        showToast(
          payload.notification.title ?? "New Message",
          payload.notification.body ?? "",
          "info"
        );
    });
    return () => {
      unsubscribeMessaging();
    };
  }, []);

  useEffect(() => {
    appReady && updateFCMToken();
  }, [user, appReady]);

  useEffect(() => {
    if (lastApiError) {
    }
  }, [lastApiError]);

  return (
    <>
      {children}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  lastApiError: state.appInfo.lastApiError,
  appReady: state.appInfo.appReady,
  user: state.login.user,
});
const mapDispatchToProps = (dispatch: any) => ({
  updateFCMToken: () => createPushToken(dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationProvider);
