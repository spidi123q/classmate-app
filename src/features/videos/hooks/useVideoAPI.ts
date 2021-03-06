import { result } from "lodash";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AxiosApi } from "../../../common/helpers/axios";
import useLoading from "../../../common/hooks/useLoading";
import { IPaginateResponse } from "../../../common/models/PaginateResult";
import IVideo, { IVideoEdit, IVideoQuery } from "../../../models/Video";
import useUserAPI from "../../login/hooks/useUserAPI";
import GetVideos from "../api/GetVideos";
import { VideoActions } from "../state/action";

export default function useVideoAPI() {
  const dispatch: any = useDispatch();
  const loading = useLoading();
  const { getUser } = useUserAPI();

  const getVideos = async (query: IVideoQuery): IPaginateResponse<IVideo> => {
    const request = GetVideos(query);
    loading.start();
    const result = await dispatch(AxiosApi(request));
    loading.stop();
    return result;
  };

  const reloadVideos = async (
    query: IVideoQuery
  ): IPaginateResponse<IVideo> => {
    loading.start();
    await dispatch(VideoActions.GetVideoOnSuccess([]));
    loading.stop();
    // used to update classroom live status
    await getUser();
    return getVideos(query);
  };

  return {
    getVideos,
    reloadVideos,
    isLoading: loading.isLoading,
  };
}
