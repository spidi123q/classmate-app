import { IRequest } from "../../../common/helpers/axios";
import { RequestTypes } from "../../../common/models/enum";
import { IVideoEdit } from "../../../models/Video";

export default function (id: string, videoEdit: IVideoEdit): IRequest {
  return {
    url: `/api/v1/Video/${id}`,
    method: RequestTypes.Put,
    data: videoEdit,
  };
}
