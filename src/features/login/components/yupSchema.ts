import { UserEdit } from "./../../../models/User";
import { Country } from "react-native-country-picker-modal";
import * as yup from "yup";
import { parsePhoneNumberFromString as parseMobile } from "libphonenumber-js/mobile";
import moment from "moment";
import { getFullPhone } from "../../../common/helpers/transform";
import SystemConfig from "../../../SystemConfig";

export const loginSchema = yup.object().shape({
  coutry: yup.object(),
  phone: yup
    .string()
    .required("Please enter phone number")
    .test("phone", "Invalid phone number", function (value: string) {
      try {
        const isValid: boolean = parseMobile(value)?.isValid() ?? false;
        return isValid;
      } catch (err) {
        return false;
      }
    }),
});

export const profileSchema = yup.object().shape<UserEdit>({
  name: yup.string().required(),
});
