import React from "react";
import AppState from "../store/AppState";
import { connect } from "react-redux";
import FullscreenLoader from "../common/components/FullscreenLoader";

interface IProps {
  appReady: boolean;
}

const PrivateRoute: React.FunctionComponent<IProps> = (props) => {
  const { children, appReady } = props;
  if (!appReady) {
    return <FullscreenLoader />;
  }

  return <>{children}</>;
};

const mapStateToProps = (state: AppState) => ({
  appReady: state.appInfo.appReady,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
