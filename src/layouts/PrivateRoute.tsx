import React from "react";
import AppState from "../store/AppState";
import { connect } from "react-redux";
import NativeLayout from "../common/components/NativeLayout";
import Loader from "../common/components/Loader";

interface IProps {
  appReady: boolean;
}

const PrivateRoute: React.FunctionComponent<IProps> = (props) => {
  const { children, appReady } = props;
  if (!appReady) {
    return (
      <NativeLayout>
        <Loader size={100} />
      </NativeLayout>
    );
  }

  return <>{children}</>;
};

const mapStateToProps = (state: AppState) => ({
  appReady: state.appInfo.appReady,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
