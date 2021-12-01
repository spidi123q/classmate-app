import { IOptions } from "react-native-razorpay";
import { ICheckoutOptions } from ".";
import config from "../../../config.json";
import { AppTheme } from "../../config/custom-theme";

export const getOptions = ({
  description,
  image,
  currency,
  key,
  amount,
  name,
  order_id,
  email,
  contact,
  companyName,
}: ICheckoutOptions): IOptions => ({
  description,
  image: image,
  currency: currency ?? "INR",
  key: key ?? config.razorpayKeyId,
  amount: amount.toString(),
  name: companyName ?? config.companyName,
  order_id, //Replace this with an order_id created using Orders API.
  prefill: {
    email,
    contact,
    name,
  },
  theme: { color: AppTheme["color-primary"] },
});
