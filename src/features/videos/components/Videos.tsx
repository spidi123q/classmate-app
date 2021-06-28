import React, { useEffect } from "react";
import NativeLayout from "../../../common/components/NativeLayout";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";
import HeaderCover from "./headerCover/HeaderCover";

export default function () {
  return (
    <NativeLayout scroll noSafeArea>
      <HeaderCover />
      <Typography>Home</Typography>
    </NativeLayout>
  );
}
