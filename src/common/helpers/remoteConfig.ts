import { isBoolean, isNumber, isString } from "lodash";
import SystemConfig from "../../SystemConfig";
import { IsMobile } from "../config/constants";
import { remoteConfig } from "../native/firebase";

export const initRemoteConfig = async (intialSystemConfig: SystemConfig) => {
  if (IsMobile) {
    await (remoteConfig() as any).setDefaults({ ...initRemoteConfig } as any);
  }
  const fetchedRemotely = await remoteConfig().fetchAndActivate();

  if (fetchedRemotely) {
    console.log("Configs were retrieved from the backend and activated.");
  } else {
    console.log(
      "No configs were fetched from the backend, and the local configs were already activated"
    );
  }
};

export function getSystemConfigValue(key: keyof SystemConfig) {
  const value = remoteConfig().getValue(key);
  if (isString(SystemConfig[key])) {
    return value.asString();
  } else if (isNumber(SystemConfig[key])) {
    return value.asNumber();
  } else if (isBoolean(SystemConfig[key])) {
    return value.asBoolean();
  } else {
    return value.getSource();
  }
}
