import { FlatListProps, Platform } from "react-native";

/**
 * Starting page used for pagination
 */
export const StartPage: number = 1;

/**
 * Default page size for pagination
 */
export const DefaultPageSize: number = 10;

export const DefaultListConfig: Partial<FlatListProps<any>> = {
  onEndReachedThreshold: 0.1,
  scrollEventThrottle: 1,
  showsVerticalScrollIndicator: false,
};

export const DefaultonEndReachedThreshold = 0.1;

export const DefaultShareMessage =
  "Hey! Checkout WarrantyWallet - One stop for managing all warranty information & claims";

export const IsMobile: boolean =
  Platform.OS === "ios" || Platform.OS === "android";

export const DefaultPlaceholderList = Array.from(Array(10).keys());
