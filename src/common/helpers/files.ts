import RNFetchBlob from "rn-fetch-blob";
import { Platform, LogBox } from "react-native";
import axios from "axios";
const Buffer = require("buffer/").Buffer;

// Temporary fix for warning
LogBox.ignoreLogs(["Require cycle: node_modules/rn-fetch-blob/index.js"]);

export type FileTypes = "image";

const FileNameMap: Record<FileTypes, () => string> = {
  image: () =>
    `${RNFetchBlob.fs.dirs.DocumentDir}/${new Date().toISOString()}.jpg`,
};

export const createFileFromBase64 = async (
  fileType: FileTypes,
  base64: any
) => {
  const path = FileNameMap[fileType]();
  console.log("path", path);
  await RNFetchBlob.fs.createFile(path, base64, "base64");
};

export async function getStoragePath(uri: string): Promise<string> {
  if (Platform.OS === "android") {
    const stat = await RNFetchBlob.fs.stat(uri);
    return stat.path;
  } else {
    return uri;
  }
}

export async function getBase64(url: string): Promise<string> {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });
  const data = Buffer.from(response.data, "binary").toString("base64");
  return data;
}
