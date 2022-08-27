import React from "react";
import IDocumetResponse from "../../models/DocumetResponse";

export interface IParam {
  document: IDocumetResponse;
}

declare const PdfViewer = () => JSX.Element;
export default PdfViewer;
