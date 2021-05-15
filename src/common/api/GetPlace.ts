import { IRequest } from "../helpers/axios";

const GetPlace = (placeId: string): IRequest => ({
  url: `/api/v1/Lookup/Place/${placeId}`,
});

export default GetPlace;
