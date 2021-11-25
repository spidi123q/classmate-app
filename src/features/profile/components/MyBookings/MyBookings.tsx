import React from "react";
import NativeLayout from "../../../../common/components/NativeLayout";
import Typography from "../../../../common/components/Typography";

export interface IProps {
  prop?: string;
}

export function MyBookings(props: IProps) {
  return (
    <NativeLayout>
      <Typography>Hello Booking</Typography>
    </NativeLayout>
  );
}
