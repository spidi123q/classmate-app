import { IRequest } from "../../helpers/axios";

export default function GetCloudflareStreamVideoSignedToken(
  videoId: string
): IRequest {
  return {
    url: `/api/v1/CloudflareStream/Video/${videoId}/Signed`,
  };
}
