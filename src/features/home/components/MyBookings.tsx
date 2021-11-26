import React from "react";
import NativeView from "../../../common/components/NativeView";
import Typography from "../../../common/components/Typography";

export interface IProps {
  prop?: string;
}

export function MyBookings(props: IProps) {
  return (
    <NativeView
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor="red"
    >
      <Typography>Hello Booking</Typography>
      <Typography>Hello Booking</Typography>
    </NativeView>
  );
}
