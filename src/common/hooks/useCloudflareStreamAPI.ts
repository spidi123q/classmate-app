import { useDispatch } from "react-redux";
import GetCloudflareStreamVideoDetails from "../api/cloudflare/GetCloudflareStreamVideoDetails";
import { AxiosApi, IResponse } from "../helpers/axios";
import IApiDataResponse from "../models/ApiDataResponse";
import { ICloudflareVideoDetails } from "../models/cloudflare/CloudflareVideoDetails";
import GetCloudflareStreamVideoSignedToken from "../models/cloudflare/GetCloudflareStreamVideoSignedToken";
import useLoading from "./useLoading";

export default function useCloudflareStreamAPI() {
  const dispatch: any = useDispatch();
  const loading = useLoading();

  const getVideoDetails = (
    videoId: string
  ): IResponse<ICloudflareVideoDetails> => {
    const request = GetCloudflareStreamVideoDetails(videoId);
    loading.start();
    const result = dispatch(AxiosApi(request));
    loading.stop();
    return result;
  };

  const getVideoSignedToken = (
    videoId: string
  ): IResponse<IApiDataResponse> => {
    const request = GetCloudflareStreamVideoSignedToken(videoId);
    loading.start();
    const result = dispatch(AxiosApi(request));
    loading.stop();
    return result;
  };

  return {
    getVideoDetails,
    getVideoSignedToken,
    isLoading: loading.isLoading,
  };
}
