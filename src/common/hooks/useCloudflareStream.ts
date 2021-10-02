import { useDispatch } from "react-redux";
import GetCloudflareStreamVideoDetails from "../api/cloudflare/GetCloudflareStreamVideoDetails";
import { AxiosApi, IResponse } from "../helpers/axios";
import { ICloudflareVideoDetails } from "../models/cloudflare/CloudflareVideoDetails";
import useLoading from "./useLoading";

export default function useCloudflareStream() {
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

  return {
    getVideoDetails,
    isLoading: loading.isLoading,
  };
}
