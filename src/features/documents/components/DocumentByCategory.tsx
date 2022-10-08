import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { groupBy } from "lodash";
import React from "react";
import { Icon, ListItem } from "react-native-elements";
import { NativeAccordion } from "../../../common/components/NativeAccordion";
import NativeLayout from "../../../common/components/NativeLayout";
import Typography from "../../../common/components/Typography";
import { IRootStackParamList } from "../../../models/RoutePath";
import { DocumentItem } from "./DocumentItem";

export function DocumentByCategory() {
  const { params } =
    useRoute<
      NativeStackScreenProps<IRootStackParamList, "View Documents">["route"]
    >();
  const booksByCategory = groupBy(params.books, (book) => book.subCategory);

  return (
    <NativeLayout scroll>
      {Object.keys(booksByCategory).map((category) => (
        <NativeAccordion key={category} title={category}>
          {booksByCategory[category].map((book, index) => (
            <DocumentItem book={book} key={index} />
          ))}
        </NativeAccordion>
      ))}
    </NativeLayout>
  );
}
