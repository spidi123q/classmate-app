import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Button } from "react-native-elements";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import NativeHeader from "../NativeHeader";
import NativeLayout from "../NativeLayout";
import NativeView from "../NativeView";

export default function () {
  const { params } = useRoute();
  const { document } = params as any;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  return (
    <NativeLayout>
      <NativeHeader title="Document" />
      <Document file={document.objectUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <NativeView flexDirection="row">
        <Button
          title={"Previous"}
          onPress={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber == 1}
        />
        <Button
          title={"Next"}
          onPress={() => setPageNumber((page) => page + 1)}
          disabled={numPages == pageNumber}
        />
      </NativeView>
    </NativeLayout>
  );
}
