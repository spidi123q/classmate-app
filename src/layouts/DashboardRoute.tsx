import React, { useEffect } from "react";
import LoginNavigator from "./LoginNavigator";
import UserNavigator from "./UserNavigator";
import useLoginActions from "../features/login/hooks/useLoginActions";

const DashboardRoute: React.FunctionComponent = () => {
  const { isLoggedIn } = useLoginActions();

  if (isLoggedIn) {
    return <UserNavigator />;
  } else {
    return <LoginNavigator />;
  }
};

export default DashboardRoute;
