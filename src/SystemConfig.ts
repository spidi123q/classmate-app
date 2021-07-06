import { Platform } from "react-native";
import KeyValuePair from "./common/models/KeyValuePair";
import appJson from "./app.json";

interface SystemConfig {
  currency: string;
  supportEmail: string;
  minVersionCode: number;
  swipeCancelSpeed: number;
  appName: string;
  // Maximum allowed video track height
  maxVideoResolution: number;
}

const SystemConfig: SystemConfig = {
  currency: "₹",
  supportEmail: "contact@inspirit-solutions.com",
  minVersionCode: 0,
  swipeCancelSpeed: 50,
  appName: appJson.displayName,
  maxVideoResolution: 550,
};

export default SystemConfig;
