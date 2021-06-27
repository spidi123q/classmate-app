import { IUserEdit } from "./../../../models/User";
import * as yup from "yup";
import { parsePhoneNumberFromString as parseMobile } from "libphonenumber-js/mobile";
import { numberRegex } from "../../../common/helpers/regex";
import { YupRecord } from "../../../common/models/types";
import { IOtpForm } from "./OtpVerifier";

const otpLength = 6;

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

export const profileSchema = yup.object().shape<YupRecord<IUserEdit>>({
  classroomId: yup.string().required(),
});

export const otpSchema = yup.object().shape<YupRecord<IOtpForm>>({
  otp: yup
    .string()
    .required()
    .matches(numberRegex, "Must be only digits")
    .length(otpLength)
    .label("OTP"),
});
