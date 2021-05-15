import {
  PlaceAutocompleteResponse,
  PlaceDetailsResponse,
  ReverseGeocodingResponse,
} from "@google/maps";
import { useDispatch } from "react-redux";
import GetPlace from "../api/GetPlace";
import GetPlaceFromCoordinates from "../api/GetPlaceFromCoordinates";
import SearchPlace from "../api/SearchPlace";
import { AxiosApi, IResponse } from "../helpers/axios";

interface IPlacesAPI {
  searchPlace(
    search: string,
    token: string
  ): IResponse<PlaceAutocompleteResponse>;
  getPlace(placeId: string): IResponse<PlaceDetailsResponse>;
  getPlaceFromCoordinates(
    lat: number,
    lng: number
  ): IResponse<ReverseGeocodingResponse>;
}

export default function usePlacesAPI() {
  const dispatch: any = useDispatch();

  const searchPlace = async (search: string, token: string) => {
    const request = SearchPlace(search, token);
    return dispatch(AxiosApi(request));
  };
  const getPlace = async (placeId: string) => {
    const request = GetPlace(placeId);
    return dispatch(AxiosApi(request));
  };
  const getPlaceFromCoordinates = async (lat: number, lng: number) => {
    const request = GetPlaceFromCoordinates(lat, lng);
    return dispatch(AxiosApi(request));
  };

  return {
    searchPlace,
    getPlace,
    getPlaceFromCoordinates,
  };
}
