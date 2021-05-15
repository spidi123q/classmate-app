import { Route, useRoute } from "@react-navigation/native";
import { capitalize } from "lodash";
import React, { useState } from "react";
import { LogBox } from "react-native";
import Counter from "../../../../../common/components/Counter";
import NativeHeader from "../../../../../common/components/NativeHeader";
import NativeLayout from "../../../../../common/components/NativeLayout";
import NativeView from "../../../../../common/components/NativeView";
import TemplateList from "../../../../../common/components/TemplateList";
import Typography from "../../../../../common/components/Typography";
import { DoubleMargin } from "../../../../../common/config/themeConfig";
import Product from "../../../../../models/Product";
import IProduct from "../../../../../models/Product";
import FieldsDTO from "../../../dto/FieldsDTO";
import TemplateDTO from "../../../dto/TemplateDTO";

export default function CompleteProductDetails() {
  const route = useRoute<Route<string, IParams | undefined>>();
  const { title, product } = route.params!;
  const templateDTO = new TemplateDTO(product.template);
  let fieldsDTO = new FieldsDTO(templateDTO.getFields(title));

  /** custom field mapping*/
  // Direct manupulation will damage state (seems to be weird bug with react navigation)
  const expiresAtField = { ...fieldsDTO.find(CustomFields.ExpiresAt)! };
  const warrantyPeriodInMonthsField = {
    ...fieldsDTO.find(CustomFields.WarrentyPeriodInMonths)!,
  };
  if (expiresAtField && warrantyPeriodInMonthsField) {
    fieldsDTO = fieldsDTO.remove(CustomFields.ExpiresAt);
    warrantyPeriodInMonthsField.Component = (
      <NativeView marginTop={DoubleMargin}>
        <Counter date={product.expiresAt} horizontal />
      </NativeView>
    );
    warrantyPeriodInMonthsField.fields = [expiresAtField];
    fieldsDTO = fieldsDTO.replace(warrantyPeriodInMonthsField);
  }

  return (
    <NativeLayout>
      <NativeHeader title={capitalize(title)} />
      <NativeView justifyContent="center" margin={DoubleMargin}>
        <TemplateList
          fields={fieldsDTO.getFields()}
          value={product}
          borderBottom
        />
      </NativeView>
    </NativeLayout>
  );
}

interface IParams {
  product: IProduct;
  title: string;
}

enum CustomFields {
  WarrentyPeriodInMonths = "warrentyPeriodInMonths",
  ExpiresAt = "expiresAt",
}
