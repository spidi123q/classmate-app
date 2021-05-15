import { Image } from "react-native";
import ImageResizer from "react-native-image-resizer";
import { getBase64 } from "./files";

export const resizeImages = async (
  uriList: string[],
  quality: number = 50,
  size?: number
): Promise<string[]> => {
  const promiseList: Promise<string>[] = uriList.map((uri) =>
    resizeImage(uri, quality, size)
  );
  const result = await Promise.all(promiseList);
  return result;
};

export const resizeImage = async (
  uri: string,
  quality: number = 50,
  size?: number
): Promise<string> => {
  const imageSize: ImageSize = await getSize(uri);
  console.log("imageSize", imageSize);
  const result = await ImageResizer.createResizedImage(
    uri,
    size ?? imageSize.width,
    size ?? imageSize.width,
    "JPEG",
    quality
  );
  console.log("result", result);
  return result.uri;
};

interface ImageSize {
  height: number;
  width: number;
}
export const getSize = async (uri: string): Promise<ImageSize> => {
  console.log("uri - getsize", uri);
  return new Promise<ImageSize>((resolve, reject) => {
    Image.getSize(
      uri,
      async (width: number, height: number) => {
        resolve({ height, width });
      },
      (err) => reject(err)
    );
  });
};

export const getBase64Image = (data: string): string => {
  return `data:image/jpeg;base64,${data}`;
};
