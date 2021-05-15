import { useState } from "react";
import { useDispatch } from "react-redux";
import { AxiosApi, IResponse } from "../../../common/helpers/axios";
import { handleApiError } from "../../../common/helpers/request";
import useLoading from "../../../common/hooks/useLoading";
import PaginateResult from "../../../common/models/PaginateResult";
import IClaim, { IClaimEdit, IClaimQuery } from "../../../models/Claim";
import CreateClaim from "../api/CreateClaim";
import GetClaims from "../api/GetClaims";

export default function useClaimAPI() {
  const dispatch: any = useDispatch();
  const loading = useLoading();

  const createClaim = async (claimEdit: IClaimEdit) => {
    loading.start();
    const request = CreateClaim(claimEdit);
    const response = await dispatch(AxiosApi(request));
    handleApiError(response, loading.stop);
    loading.stop();
    return response;
  };

  const getClaims = async (
    params: IClaimQuery
  ): IResponse<PaginateResult<IClaim>> => {
    const request = GetClaims(params);
    return dispatch(AxiosApi(request));
  };

  return {
    createClaim,
    getClaims,
    isLoading: loading.isLoading,
  };
}
