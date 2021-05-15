import React, { createRef } from "react";

export default function useRefList(arrLength: number) {
  const [refList, setRefList] = React.useState([]);

  React.useEffect(() => {
    // add or remove refs
    setRefList((ref) =>
      Array(arrLength)
        .fill({ current: null })
        .map((_, i) => ref[i] || createRef())
    );
  }, [arrLength]);

  return { refList, setRefList };
}
