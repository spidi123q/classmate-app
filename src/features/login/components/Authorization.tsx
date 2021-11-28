import React from "react";
import { isAuthorized } from "../../../helpers/auth";
import useUser from "../hooks/useUser";
import { UserPermissions } from "../../../models/enum";

interface IProps {
  requiredPermission?: UserPermissions;
}

const Authorization: React.FunctionComponent<IProps> = ({
  requiredPermission,
  children,
}) => {
  const { permissions } = useUser();
  const childNode = <>{children}</>;
  if (!requiredPermission) {
    return childNode;
  }
  if (isAuthorized(permissions, requiredPermission)) {
    return childNode;
  }
  return null;
};

export default Authorization;
