import { PushTokenEdit } from "../models/PushToken";
import { RequestTypes } from "../models/enum";
import { Platform } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { IRequest } from "../helpers/axios";

export default function CreatePushToken(
  token: string,
  deviceName: string
): IRequest {
  const data: PushTokenEdit = {
    deviceId: getUniqueId(),
    platform: Platform.OS,
    token,
    deviceName,
  };
  return {
    url: "/api/v1/PushToken",
    method: RequestTypes.Post,
    data,
  };
}
