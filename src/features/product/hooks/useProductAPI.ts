import { isEmpty } from "lodash";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AxiosApi } from "../../../common/helpers/axios";
import useFilesUploader from "../../../common/hooks/useFilesUploader";
import { IProductQuery } from "../../../models/Product";
import SystemConfig from "../../../SystemConfig";
import GetProducts from "../api/GetProducts";

export default function useProductAPI() {
  const dispatch: any = useDispatch();

  /**
   * Get paginated list all products
   * @param query filters for request
   */
  const getProducts = async (query?: IProductQuery) => {
    const request = GetProducts(query);
    return dispatch(AxiosApi(request));
  };

  return {
    getProducts,
  };
}
