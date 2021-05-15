import { IRequest } from "../../../common/helpers/axios";
import { RequestTypes } from "../../../common/models/enum";
import { IClaimEdit } from "../../../models/Claim";

export default function CreateClaim(claimEdit: IClaimEdit): IRequest {
  return {
    url: "/api/v1/Claim",
    method: RequestTypes.Post,
    data: claimEdit,
  };
}
