import { isNil } from "lodash";
import { Dimensions } from "react-native";
import { getSystemConfigValue } from "./remoteConfig";

export const delay = (time: number = 1000) => {
  return new Promise(function (resolve: any) {
    setTimeout(() => resolve(), time);
  });
};

export const isWholeNumber = (number?: number): boolean =>
  isNil(number) ? false : number % 1 === 0;

export const isLastElement = (items: any[], currentIndex: number) =>
  items.length === currentIndex + 1;

export const defaultKeyExtractor = (item: any, index: number) =>
  index.toString();

export const defaultDocKeyExtractor = (item: any, index: number) => item._id;

export const WindowWidth = Dimensions.get("window").width;
export const WindowHeight = Dimensions.get("window").height;

export const getJitsiUrl = (roomName: string) =>
  `https://${getSystemConfigValue("jitsiDomain")}/${roomName}`;
