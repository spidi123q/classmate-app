import RazorpayCheckout from "react-native-razorpay";
import { ICheckoutOptions, INativeRazorpayCheckout } from ".";
import { getOptions } from "./helpers";

export const NativeRazorpayCheckout: INativeRazorpayCheckout = {
  open: (options: ICheckoutOptions) =>
    RazorpayCheckout.open(getOptions(options)),
};
