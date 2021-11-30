import { useState } from "react";
import { useDispatch } from "react-redux";
import { AxiosApi } from "../../../common/helpers/axios";
import useLoading from "../../../common/hooks/useLoading";
import { IPaginateResponse } from "../../../common/models/PaginateResult";
import IOrganization, {
  IOrganizationEdit,
  IOrganizationQuery,
} from "../../../models/Organization";
import GetOrganizations from "../api/GetOrganizations";

export default function useOrganizationsAPI() {
  const dispatch: any = useDispatch();
  const loading = useLoading();

  const getOrganizations = async (
    query: IOrganizationQuery
  ): IPaginateResponse<IOrganization> => {
    const request = GetOrganizations(query);
    return dispatch(AxiosApi(request));
  };

  return {
    getOrganizations,
    isLoading: loading.isLoading,
  };
}
