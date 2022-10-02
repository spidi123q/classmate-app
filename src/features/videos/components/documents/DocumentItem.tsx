import React from "react";
import { useNavigation } from "@react-navigation/native";
import NativeView from "../../../../common/components/NativeView";
import {
  DefaultBorderRadius,
  DefaultMargin,
} from "../../../../common/config/themeConfig";
import IDocumetResponse from "../../../../common/models/DocumetResponse";
import { AppTheme } from "../../../../common/config/custom-theme";
import Typography from "../../../../common/components/Typography";
import { first, split } from "lodash";
import { ONE_MEGABYTE } from "../../../../common/config/constants";
import Pdf from "../../../../common/assets/Pdf.svg";
import {
  HomePages,
  IRootStackNavigationProps,
} from "../../../../models/RoutePath";

interface IProps {
  document: IDocumetResponse;
}
export function DocumentItem(props: IProps) {
  const { document } = props;
  const navigation = useNavigation<IRootStackNavigationProps>();

  const openDocument = (document: IDocumetResponse) => {
    navigation.navigate("Pdf Viewer", {
      document,
    });
  };
  return (
    <NativeView
      type="ripple"
      marginTop={DefaultMargin / 2}
      marginRight={DefaultMargin}
      onPress={() => openDocument(document)}
    >
      <NativeView
        width={288}
        height={68}
        borderRadius={DefaultBorderRadius}
        backgroundColor={AppTheme["color-grey2"]}
        alignItems="center"
        flexDirection="row"
        padding={DefaultMargin / 2}
      >
        <Pdf />
        <NativeView justifyContent="center" flex={1} marginLeft={DefaultMargin}>
          <Typography>{first(split(document.originalname, "."))}</Typography>
          <Typography type="xs">
            {(document.size / ONE_MEGABYTE).toFixed(1)} MB
          </Typography>
        </NativeView>
      </NativeView>
    </NativeView>
  );
}
