import { Platform, LogBox } from "react-native";
import axios from "axios";
const Buffer = require("buffer/").Buffer;

export async function getBase64(url: string): Promise<string> {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });
  const data = Buffer.from(response.data, "binary").toString("base64");
  return data;
}
