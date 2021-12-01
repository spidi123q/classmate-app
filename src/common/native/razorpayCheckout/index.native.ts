import RazorpayCheckout from "react-native-razorpay";
import { ICheckoutOptions, INativeRazorpayCheckout } from ".";
import { getOptions } from "./constants";

export const NativeRazorpayCheckout: INativeRazorpayCheckout = {
  open: (options: ICheckoutOptions) =>
    RazorpayCheckout.open(getOptions(options)),
};
