import { FieldType } from "../../models/template/enum";
import {
  InitialPaginateResult,
  IPaginateResponse,
} from "../models/PaginateResult";
import { IResponse } from "./axios";
import { formatDate } from "./formatDate";
import parsePhoneNumber from "libphonenumber-js";
import { capitalize } from "lodash";
import IField from "../../models/template/Field";

export const parseFieldValue = (value: string, field: IField) => {
  switch (field.type) {
    case FieldType.Date:
      return formatDate(value);
    case FieldType.Unit:
      return `${value} ${formatUnit(field.unit, parseInt(value))}`;
    default:
      return value;
  }
};

export const formatPhoneNumber = (phone?: string | null) => {
  if (!phone) return "";
  const phoneNumber = parsePhoneNumber(phone);
  return phoneNumber?.formatInternational();
};

export const formatUnit = (unit: string = "", length: number = 0) => {
  return length > 1 ? capitalize(unit + "s") : capitalize(unit);
};
