import { IRequest } from "../helpers/axios";

const GetPlaceFromCoordinates = (lat: number, lng: number): IRequest => ({
  url: `/api/v1/Lookup/Place/${lat}/${lng}`,
});

export default GetPlaceFromCoordinates;
