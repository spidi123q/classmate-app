import { ListRenderItem, SectionListRenderItem } from "react-native";

export type FlatListRenderItem<T> = {
  item: T;
  index: number;
};

export type NativeSectionListRenderItem<T, U> = {
  item: T;
  section: U;
};
