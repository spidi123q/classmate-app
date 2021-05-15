import React, { useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import NativeView from "../components/NativeView";
import { DoubleMargin } from "../config/themeConfig";

export default function useBottomSheet() {
  const refRBSheet = useRef<any>();

  const open = () => refRBSheet.current && refRBSheet.current.open();
  const close = () => refRBSheet.current && refRBSheet.current.close();

  const Sheet: React.FunctionComponent = ({ children }) => (
    <RBSheet ref={refRBSheet}>
      <NativeView margin={DoubleMargin}>{children}</NativeView>
    </RBSheet>
  );

  return {
    open,
    close,
    Sheet,
  };
}
