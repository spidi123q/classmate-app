import AsyncLocalStorage from "../native/asyncLocalStorage";

const Namespace: string = "@DocumentCache/";

export default function documentCache() {
  const get = async (key: string): Promise<string | undefined | null> => {
    try {
      const data: any = await AsyncLocalStorage.getItem(Namespace + key);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const set = async (key: string, value: string) => {
    try {
      await AsyncLocalStorage.setItem(Namespace + key, value);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    set,
    get,
  };
}
