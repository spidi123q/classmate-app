import React from "react";
import IDocumetResponse from "../../models/DocumetResponse";

export interface IPdfViewerParam {
  document: IDocumetResponse;
}

declare const PdfViewer = () => JSX.Element;
export default PdfViewer;
