import { UserEdit } from "./../../../models/User";
import * as yup from "yup";
import { parsePhoneNumberFromString as parseMobile } from "libphonenumber-js/mobile";

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
    } as any),
});

export const profileSchema = yup.object().shape({
  name: yup.string().required(),
});
