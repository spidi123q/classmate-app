import { useState } from "react";
import { useDispatch } from "react-redux";
import { AxiosApi, IResponse } from "../../../common/helpers/axios";
import User, { UserEdit } from "../../../models/User";
import GetUser from "../api/GetUser";
import UpdateUser from "../api/UpdateUser";

export default function useUserAPI() {
  const dispatch: any = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateUser = async (userEdit: UserEdit) => {
    const request = UpdateUser(userEdit);
    setIsLoading(true);
    const response = await dispatch(AxiosApi(request));
    setIsLoading(false);
    return response;
  };

  const getUser = async (isStateUpdate: boolean = true): IResponse<User> => {
    const request = GetUser(isStateUpdate);
    setIsLoading(true);
    const response = await dispatch(AxiosApi(request));
    setIsLoading(false);
    return response;
  };

  const updateAndGetUser = async (userEdit: UserEdit) => {
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
