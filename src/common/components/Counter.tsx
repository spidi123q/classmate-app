import { capitalize } from "lodash";
import React from "react";
import { Platform, View, StyleSheet } from "react-native";
import { AppTheme } from "../config/custom-theme";
import { DefaultMargin, DoubleMargin, FontSize } from "../config/themeConfig";
import { getDifference } from "../helpers/formatDate";
import Typography from "./Typography";

interface ICounterProps {
  date: Date;
  horizontal?: boolean;
}
function Counter(props: ICounterProps) {
  const { date, horizontal } = props;
  const { years, months, days } = getDifference(date, new Date());

  const getUnit = (
    value: number,
    type: "year" | "month" | "day",
    marginLeft?: number
  ) =>
    value > 0 && (
      <View style={[styles.counterDateContainer, { marginLeft }]}>
        <Typography
          family="bold"
          size={FontSize.h1}
          color={AppTheme["color-secondary"]}
        >
          {value}
        </Typography>
        <Typography
          size={FontSize.regular}
          marginLeft={TextMargin}
          marginBottom={Platform.OS === "android" ? -7 : undefined}
        >
          {capitalize(type)}
        </Typography>
      </View>
    );
  return (
    <View
      style={[
        styles.counterContainer,
        {
          flexDirection: horizontal ? "row" : "column",
          alignItems: horizontal ? "center" : undefined,
        },
      ]}
    >
      <View style={styles.counterDateContainer}>
        {getUnit(years, "year")}
        {getUnit(months, "month", years > 0 ? DefaultMargin / 2 : undefined)}
        {getUnit(days, "day", months > 0 ? DefaultMargin / 2 : undefined)}
      </View>
      <Typography
        color={AppTheme["color-black"]}
        opacity={0.5}
        size={FontSize.xs}
        marginTop={TextMargin}
        marginLeft={horizontal ? DoubleMargin : undefined}
      >
        Remaining
      </Typography>
    </View>
  );
}

const TextMargin: number = DefaultMargin / 3;

const styles = StyleSheet.create({
  counterDateContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: Platform.OS === "ios" ? "baseline" : "center",
  },
  counterContainer: {
    justifyContent: "center",
  },
});

export default Counter;
