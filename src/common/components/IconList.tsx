import { isEmpty } from "lodash";
import React from "react";
import { Button, Icon } from "react-native-elements";
import { AppTheme } from "../config/custom-theme";
import {
  DefaultFont,
  DefaultIconFamily,
  DefaultMargin,
  DoubleMargin,
  FontSize,
} from "../config/themeConfig";
import Typography from "./Typography";

interface IProps {
  list: ISimpleList[];
  iconColor?: string;
  textColor?: string;
}
export default function IconList({ iconColor, textColor, list }: IProps) {
  return (
    <>
      {list.map((item, index) => (
        <Button
          key={index}
          onPress={item.onPress}
          icon={
            <Icon
              type={DefaultIconFamily}
              name={item.iconName}
              size={FontSize.h2}
              color={iconColor ?? AppTheme["color-secondary"]}
            />
          }
          title={item.label}
          type="clear"
          titleStyle={{
            color: textColor,
            fontSize: FontSize.regular,
            marginLeft: DefaultMargin,
            fontFamily: DefaultFont,
          }}
          containerStyle={{
            alignItems: "flex-start",
            marginLeft: -DefaultMargin,
          }}
        />
      ))}
      {isEmpty(list) && (
        <Typography
          color={AppTheme["color-grey3"]}
          size={FontSize.xs}
          marginVertical={DoubleMargin}
        >
          Nothing found
        </Typography>
      )}
    </>
  );
}

interface ISimpleList {
  iconName: string;
  label?: string;
  onPress?: () => any;
}
