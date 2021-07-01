import React from "react";
import AppState from "../store/AppState";
import { connect } from "react-redux";
import NativeLayout from "../common/components/NativeLayout";
import Loader from "../common/components/Loader";
import NativeView from "../common/components/NativeView";
import { DefaultBackgroundColor } from "../common/config/themeConfig";

interface IProps {
  appReady: boolean;
}

const PrivateRoute: React.FunctionComponent<IProps> = (props) => {
  const { children, appReady } = props;
  if (!appReady) {
    return (
      <NativeView backgroundColor={DefaultBackgroundColor}>
        <Loader size={100} />
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
