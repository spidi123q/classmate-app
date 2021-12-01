import { IError, ISuccess } from "react-native-razorpay";
import { ICheckoutOptions, INativeRazorpayCheckout } from ".";
import { getOptions } from "./helpers";

export const NativeRazorpayCheckout: INativeRazorpayCheckout = {
  open: (options: ICheckoutOptions) => {
    return new Promise<ISuccess>((resolve, reject) => {
      var rzp1 = new (window as any).Razorpay({
        ...options,
        handler: resolve,
      });
      rzp1.open();
      rzp1.on("payment.failed", function (response: IError) {
        reject(response);
      });
    });
  },
};
