import { result } from "lodash";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AxiosApi } from "../../../common/helpers/axios";
import useAzureMediaService from "../../../common/hooks/useAzureMediaService";
import useAzureStorage from "../../../common/hooks/useAzureStorage";
import useLoading from "../../../common/hooks/useLoading";
import { IPaginateResponse } from "../../../common/models/PaginateResult";
import IVideo, { IVideoEdit, IVideoQuery } from "../../../models/Video";
import CreateVideo from "../api/CreateVideo";
import GetVideos from "../api/GetVideos";
import UpdateVideo from "../api/UpdateVideo";

export default function useVideoAPI() {
  const dispatch: any = useDispatch();
  const loading = useLoading();
  const azureStorageForVideo = useAzureStorage();
  const azureStorageForCoverImage = useAzureStorage();
  const azureMediaService = useAzureMediaService();

  const onFormSubmit = async (values: IVideoEdit) => {
    const formValues: IVideoEdit = { ...values };

    if (formValues.coverImageAzureBlob instanceof File) {
      const result = await azureStorageForCoverImage.upload(
        formValues.coverImageAzureBlob as any
      );
      formValues.coverImageAzureBlob = result;
    }

    if (formValues.videoAzureBlob instanceof File) {
      const uploadResult = await azureStorageForVideo.upload(
        formValues.videoAzureBlob as any
      );
      formValues.videoAzureBlob = uploadResult;
      const jobResult = await azureMediaService.createEncodeJob(
        uploadResult.url
      );
      formValues.encodingAzureJob = jobResult;
    }

    const result = await createElseUpdate(formValues);
    return result;
  };

  const createElseUpdate = async (videoEdit: IVideoEdit) => {
    try {
      const request = videoEdit._id
        ? UpdateVideo(videoEdit._id, videoEdit)
        : CreateVideo(videoEdit);
      loading.start();
      const result = await dispatch(AxiosApi(request));
      loading.stop();
      return result;
    } catch (error) {
      loading.stop();
    }
  };

  const getVideos = async (query: IVideoQuery): IPaginateResponse<IVideo> => {
    const request = GetVideos(query);
    return dispatch(AxiosApi(request));
  };

  return {
    createElseUpdate,
    getVideos,
    onFormSubmit,
    isLoading:
      loading.isLoading ||
      azureMediaService.isLoading ||
      azureStorageForVideo.isLoading ||
      azureStorageForCoverImage.isLoading,
    uploadForVideoIsLoading: azureStorageForVideo.isLoading,
    uploadForVideoPercentage: azureStorageForVideo.uploadPercentage,
    uploadForCoverImageIsLoading: azureStorageForCoverImage.isLoading,
    uploadForForCoverImagePercentage:
      azureStorageForCoverImage.uploadPercentage,
  };
}
