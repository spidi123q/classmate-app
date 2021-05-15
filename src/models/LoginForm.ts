import { Country } from "react-native-country-picker-modal";

interface LoginForm {
  country: Country;
  phone: string;
}

export const InitialLoginForm: LoginForm = {
  phone: "",
  country: {
    callingCode: ["91"],
    cca2: "IN",
    currency: ["INR"],
    flag: "flag-in",
    name: "India",
    region: "Asia",
    subregion: "Southern Asia",
  },
};

export default LoginForm;
