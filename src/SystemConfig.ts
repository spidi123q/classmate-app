import { Platform } from "react-native";
import KeyValuePair from "./common/models/KeyValuePair";
import appJson from "./app.json";
import { StreamingPolicyStreamingProtocol } from "./common/models/azure/mediaServices";

interface SystemConfig {
  currency: string;
  supportEmail: string;
  minVersionCode: number;
  swipeCancelSpeed: number;
  appName: string;
  // Maximum allowed video track height
  maxVideoResolution: number;
  streamingProtocol: StreamingPolicyStreamingProtocol;
  jitsiDomain: string;
}

const SystemConfig: SystemConfig = {
  currency: "₹",
  supportEmail: "contact@inspirit-solutions.com",
  minVersionCode: 0,
  swipeCancelSpeed: 50,
  appName: appJson.displayName,
  maxVideoResolution: 550,
  streamingProtocol: "Hls",
  jitsiDomain: "meet.jit.si",
};

export default SystemConfig;
