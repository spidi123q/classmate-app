import React from "react";
import { Icon } from "react-native-elements";
import Ripple from "react-native-material-ripple";
import { AppTheme } from "../config/custom-theme";
import {
  DefaultBorderRadius,
  DefaultIconFamily,
  DefaultMargin,
  DefaultOpacity,
  DoubleMargin,
  FontSize,
  SecondaryBackgroundColor,
} from "../config/themeConfig";
import NativeView from "./NativeView";
import Typography from "./Typography";
import { StyleSheet } from "react-native";
import { capitalize, toUpper } from "lodash";

interface IProps {
  title: string;
  onViewMore?: (title: string) => any;
  borderBottom?: boolean;
  marginHorizontal?: number;
}

const SubSection: React.FunctionComponent<IProps> = ({
  children,
  title,
  onViewMore,
  borderBottom,
  marginHorizontal,
}) => {
  return (
    <NativeView
      marginHorizontal={marginHorizontal ?? DoubleMargin}
      marginTop={DefaultMargin}
      borderBottomColor={
        borderBottom ? AppTheme["color-grey"] : SecondaryBackgroundColor
      }
      borderBottomWidth={1}
    >
      <NativeView
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={DefaultMargin}
      >
        <Typography color={AppTheme["color-black"]} opacity={0.5}>
          {toUpper(title)}
        </Typography>
        {onViewMore && (
          <Ripple
            style={styles.viewMoreContainer}
            rippleContainerBorderRadius={DefaultBorderRadius}
            onPress={() => onViewMore(title)}
          >
            <Typography
              family="semiBold"
              color={AppTheme["color-primary-dark"]}
            >
              View More
            </Typography>
            <Icon
              type={DefaultIconFamily}
              name="chevron-forward-outline"
              size={FontSize.regular + 4}
            />
          </Ripple>
        )}
      </NativeView>
      {children}
    </NativeView>
  );
};

const styles = StyleSheet.create({
  viewMoreContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: DefaultMargin,
  },
});

export default SubSection;
