import { chunk, get, head } from "lodash";
import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { FieldType } from "../../models/template/enum";
import IField from "../../models/template/Field";
import { AppTheme } from "../config/custom-theme";
import {
  DefaultBackgroundColor,
  DefaultFontColor,
  DefaultMargin,
  FontSize,
  SecondaryBackgroundColor,
  TrasparentColor,
} from "../config/themeConfig";
import { parseFieldValue } from "../helpers/format";
import { isLastElement } from "../helpers/misc";
import NativeView from "./NativeView";
import Typography from "./Typography";

interface IProps {
  marginBottom?: number;
  fields: IField[];
  value: any;
  borderBottom?: boolean;
  maxItems?: number;
}

export default function TemplateList({
  marginBottom,
  fields: allFields,
  value,
  borderBottom,
  maxItems,
}: IProps) {
  const fields = maxItems ? chunk(allFields, maxItems)[0] : allFields;
  return (
    <NativeView marginBottom={marginBottom}>
      {fields.map((field, index) => (
        <NativeView
          key={index}
          marginBottom={DefaultMargin * 2}
          paddingBottom={
            isLastElement(fields, index) ? undefined : DefaultMargin * 2
          }
          flexDirection="row"
          borderBottomColor={
            borderBottom && !isLastElement(fields, index)
              ? AppTheme["color-grey"]
              : TrasparentColor
          }
          borderBottomWidth={1}
        >
          <NativeView flex={1}>
            <Typography family="medium">{field.name}</Typography>
            {field.fields.map((innterField, index) => (
              <NativeView marginTop={DefaultMargin} key={index}>
                <Typography
                  size={FontSize.xs}
                  family="regular"
                  color={DefaultFontColor}
                >
                  {innterField.name}
                </Typography>
                <Typography marginTop={DefaultMargin / 2} family="semiBold">
                  {parseFieldValue(get(value, innterField.key), innterField)}
                </Typography>
              </NativeView>
            ))}
          </NativeView>
          <NativeView flex={1}>
            <NativeView flexDirection="row">
              <Typography family="medium">: {"  "}</Typography>
              <Typography family="medium">
                {parseFieldValue(get(value, field.key), field)}
              </Typography>
            </NativeView>
            {field.Component && (
              <NativeView justifyContent="center" alignItems="center">
                {field.Component}
              </NativeView>
            )}
          </NativeView>
        </NativeView>
      ))}
    </NativeView>
  );
}
