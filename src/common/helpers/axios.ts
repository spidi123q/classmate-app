import axios, { AxiosRequestConfig } from "axios";
import config from "../../config.json";
import { AppInfoActionTypes } from "../state/AppInfoAction";

export interface IRequest extends AxiosRequestConfig {
  actionType?: string;
}
export type IResponse<T> = Promise<{payload: T}>
export const IResponse = Promise;

export const client = axios.create({
  //all axios can be used, shown in axios documentation
  baseURL: config.endpoint,
  responseType: "json",
});

export const AxiosApi = (request: IRequest) => ({
  type: request.actionType ?? AppInfoActionTypes.DefaultApiCall,
  payload: { request: request },
});
