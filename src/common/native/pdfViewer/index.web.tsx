import React, { useState } from "react";
import { Button } from "react-native-elements";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import NativeLayout from "../../components/NativeLayout";
import NativeView from "../../components/NativeView";

export default function () {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  return (
    <NativeLayout>
      <Document
        file="https://classmate-public-files.s3.ap-south-1.amazonaws.com/90377ee2-3b10-4f68-be79-68004cc8b707-cv_2022_05.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
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
