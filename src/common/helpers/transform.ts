import _ from "lodash";
import { Country } from "react-native-country-picker-modal";
import GeoJSON from "../models/GeoJSON";
import { GeoJSONType } from "../models/enum";
import KeyValuePair from "../models/KeyValuePair";

export const deleteEmptyKeys = (obj: any) => {
  let newObj = { ...obj };
  for (const [key, value] of Object.entries(newObj)) {
    _.isString(value) && _.isEmpty(value) && delete newObj[key];
  }
  return newObj;
};

export const removeWhiteSpace = (text: string): string =>
  text.replace(/\s/g, "");

/**
 * Get full phonenumber includng country code
 * @param country Country object
 * @param phone Phone number without country code
 */
export const getFullPhone = (
  country: Country,
  phone: string | number
): string => {
  const mobile: string = `+${country.callingCode}${phone}`;
  //console.log("mobile", mobile);
  return mobile;
};

export const getGeoJSON = (lat: number, lng: number): GeoJSON => ({
  type: GeoJSONType.Point,
  coordinates: [lng, lat],
});

export const toKeyValuePair = (list: string[]): KeyValuePair[] =>
  list.map((item) => ({ Key: item, Value: item }));
