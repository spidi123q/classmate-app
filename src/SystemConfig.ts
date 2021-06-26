import { Platform } from "react-native";
import KeyValuePair from "./common/models/KeyValuePair";

interface SystemConfig {
  currency: string;
  maxDistance: number;
  isValidVersion: boolean;
  supportEmail: string;
  minVersionCode: number;
  swipeCancelSpeed: number;
}

const SystemConfig: SystemConfig = {
  currency: "₹",
  maxDistance: 1000000,
  isValidVersion: true,
  supportEmail: "contact@inspirit-solutions.com",
  minVersionCode: 0,
  swipeCancelSpeed: 50,
};

export default SystemConfig;
