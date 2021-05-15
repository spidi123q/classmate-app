import { useState } from "react";
import storage, { FirebaseStorageTypes } from "@react-native-firebase/storage";
import { getThumbRef } from "../helpers/firebaseStorage";
import { getBase64 } from "../helpers/files";
import documentCache from "../helpers/documentCache";

export default function useFirebaseStorage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cache = documentCache();

  const getDownloadURL = async (
    refPath: string,
    thumbnail: boolean = false
  ): Promise<string> => {
    setIsLoading(true);

    let uri = await cache.get(refPath);
    if (uri) {
      setIsLoading(false);
      return uri;
    }
    const url = await storage()
      .ref(thumbnail ? getThumbRef(refPath) : refPath)
      .getDownloadURL();
    const data = await getBase64(url);
    cache.set(refPath, data);
    setIsLoading(false);
    return data;
  };

  return {
    isLoading,
    getDownloadURL,
  };
}
