import { useState } from "react";
import { useDispatch } from "react-redux";
import { AxiosApi, IResponse } from "../../../common/helpers/axios";
import IUser, { IUserEdit } from "../../../models/User";
import GetUser from "../api/GetUser";
import UpdateUser from "../api/UpdateUser";

export default function useUserAPI() {
  const dispatch: any = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateUser = async (userEdit: IUserEdit) => {
    const request = UpdateUser(userEdit);
    setIsLoading(true);
    const response = await dispatch(AxiosApi(request));
    setIsLoading(false);
    return response;
  };

  /**
   * Get currently signedin user
   * Note: By default this will update user state
   * @param isStateUpdate If true will update app state with new user
   * @returns
   */
  const getUser = async (isStateUpdate: boolean = true): IResponse<IUser> => {
    const request = GetUser(isStateUpdate);
    setIsLoading(true);
    const response = await dispatch(AxiosApi(request));
    setIsLoading(false);
    return response;
  };

  const updateAndGetUser = async (userEdit: IUserEdit) => {
    await updateUser(userEdit);
    await getUser(true);
  };

  return {
    updateUser,
    getUser,
    updateAndGetUser,
    isLoading,
  };
}
