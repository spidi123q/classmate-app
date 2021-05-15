import { IRequest } from "../../../common/helpers/axios";
import { IClaimQuery } from "../../../models/Claim";

export default function GetClaims(params?: IClaimQuery): IRequest {
  const url = "/api/v1/Claim";
  return {
    url,
    params,
  };
}
