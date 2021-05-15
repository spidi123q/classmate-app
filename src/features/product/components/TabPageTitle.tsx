import React from "react";
import Typography from "../../../common/components/Typography";
import { DefaultMargin, FontSize } from "../../../common/config/themeConfig";

interface IProps {
  title: string;
}

export default function TabPageTitle({ title }: IProps) {
  return (
    <Typography
      family="bold"
      size={FontSize.h1}
      marginLeft={DefaultMargin}
      marginVertical={DefaultMargin}
    >
      {title}
    </Typography>
  );
}
