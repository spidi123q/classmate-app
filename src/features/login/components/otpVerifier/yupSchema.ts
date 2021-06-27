import * as yup from "yup";
import { numberRegex } from "../../../../common/helpers/regex";
import { YupRecord } from "../../../../common/models/types";
import { IOtpForm } from "./OtpVerifier";

const otpLength = 6;
export const otpSchema = yup.object().shape<YupRecord<IOtpForm>>({
  otp: yup
    .string()
    .required()
    .matches(numberRegex, "Must be only digits")
    .length(otpLength)
    .label("OTP"),
});
