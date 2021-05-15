import { isEmpty } from "lodash";
import React from "react";
import { DoubleMargin } from "../config/themeConfig";
import Loader from "./Loader";
import NativeView from "./NativeView";

interface IProps {
  isLoading: boolean;
  items: any[];
}

export default function EmpyListPlaceholder({ isLoading, items }: IProps) {
  return !isLoading && isEmpty(items) ? (
    <NativeView height={200} marginTop={DoubleMargin}>
      <Loader type="empty" loop={false} />
    </NativeView>
  ) : null;
}
