import { IError, IOptions, ISuccess, IPrefill } from "react-native-razorpay";

interface ICheckoutOptions
  extends IPrefill,
    Partial<Omit<IOptions, "prefill" | "theme">> {
  amount: number;
  order_id: string;
  description: string;
  companyName?: string;
}

interface INativeRazorpayCheckout {
  open: (options: ICheckoutOptions) => Promise<ISuccess>;
}

declare const NativeRazorpayCheckout: INativeRazorpayCheckout;
