import React from "react";
import { useNavigation } from "@react-navigation/native";
import NativeView from "../../../common/components/NativeView";
import {
  DefaultBorderRadius,
  DefaultMargin,
} from "../../../common/config/themeConfig";
import IDocumetResponse from "../../../common/models/DocumetResponse";
import { AppTheme } from "../../../common/config/custom-theme";
import Typography from "../../../common/components/Typography";
import { first, split, truncate } from "lodash";
import { ONE_MEGABYTE } from "../../../common/config/constants";
import Pdf from "../../../common/assets/Pdf.svg";
import { IBook } from "../../../models/Book";
import { Linking } from "react-native";

interface IProps {
  book: IBook;
}
export function DocumentItem(props: IProps) {
  const { book } = props;

  const openDocument = async (document: IDocumetResponse) => {
    const supported = await Linking.canOpenURL(document.objectUrl);
    supported && Linking.openURL(document.objectUrl);
  };
  return (
    <NativeView
      type="ripple"
      marginTop={DefaultMargin / 2}
      marginRight={DefaultMargin}
      onPress={() => openDocument(book.document)}
    >
      <NativeView
        width={288}
        height={68}
        borderRadius={DefaultBorderRadius}
        backgroundColor={AppTheme["color-dark-light"]}
        alignItems="center"
        flexDirection="row"
        padding={DefaultMargin / 2}
      >
        <Pdf />
        <NativeView justifyContent="center" flex={1} marginLeft={DefaultMargin}>
          <Typography>
            {truncate(book.name, {
              length: 30,
            })}
          </Typography>
          <Typography type="xs">
            {(book.document.size / ONE_MEGABYTE).toFixed(1)} MB
          </Typography>
        </NativeView>
      </NativeView>
    </NativeView>
  );
}
