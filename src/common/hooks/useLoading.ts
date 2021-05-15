import { useState } from "react";

export default function useLoading() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const start = () => setIsLoading(true);
  const stop = () => setIsLoading(false);

  return {
    start,
    stop,
    isLoading,
  };
}
