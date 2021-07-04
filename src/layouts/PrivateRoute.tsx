import React from "react";
import AppState from "../store/AppState";
import { connect } from "react-redux";
import NativeLayout from "../common/components/NativeLayout";
import Loader from "../common/components/Loader";
import NativeView from "../common/components/NativeView";
import { DefaultBackgroundColor } from "../common/config/themeConfig";
import { StatusBar } from "react-native";

interface IProps {
  appReady: boolean;
}

const PrivateRoute: React.FunctionComponent<IProps> = (props) => {
  const { children, appReady } = props;
  if (!appReady) {
    return (
      <NativeView backgroundColor={DefaultBackgroundColor} flex={1}>
        <Loader />
        <StatusBar
          backgroundColor={DefaultBackgroundColor}
          barStyle={"light-content"}
        />
      </NativeView>
    );
  }

  return <>{children}</>;
};

const mapStateToProps = (state: AppState) => ({
  appReady: state.appInfo.appReady,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
