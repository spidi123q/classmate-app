import React, { useEffect, useState } from "react";
import NativeLayout from "../../../common/components/NativeLayout";
import { FlatGrid } from "react-native-super-grid";
import { ItemDimension, MainCategory } from "./MainCategory";
import { IBook, IBookQuery } from "../../../models/Book";
import useBooksAPI from "../hooks/useBooksAPI";
import { groupBy } from "lodash";
import { NativeSkeletonPlaceholder } from "../../../common/components/nativeSkeleton";
import {
  DefaultBorderRadius,
  DefaultMargin,
} from "../../../common/config/themeConfig";
import { RefreshControl } from "react-native";
import useUserAPI from "../../login/hooks/useUserAPI";
import useUser from "../../login/hooks/useUser";

export function DocumentSummary() {
  const { getBooks, isLoading } = useBooksAPI();
  const { getUser } = useUserAPI();
  const { classroomId } = useUser();
  const [books, setBooks] = useState<IBook[]>([]);

  const bookQuery: IBookQuery = {
    active: true,
    pagination: false,
    classroomId,
  };

  async function loadBooks() {
    await getUser();
    const result = await getBooks(bookQuery);
    setBooks(result.payload.docs);
  }

  useEffect(() => {
    loadBooks();
  }, []);

  const booksByMainCategory = groupBy(books, (book) => book.mainCategory);

  return (
    <NativeLayout>
      {isLoading ? (
        <Placeholder />
      ) : (
        <FlatGrid
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={loadBooks} />
          }
          itemDimension={ItemDimension}
          data={Object.keys(booksByMainCategory)}
          renderItem={({ item }) => (
            <MainCategory
              mainCategory={item}
              books={booksByMainCategory[item]}
            />
          )}
        />
      )}
    </NativeLayout>
  );
}

const Placeholder = () => (
  <FlatGrid
    itemDimension={ItemDimension}
    data={[1, 2, 3, 4]}
    renderItem={({ item }) => (
      <NativeSkeletonPlaceholder
        items={[
          {
            width: ItemDimension,
            height: ItemDimension,
            borderRadius: DefaultBorderRadius,
          },
        ]}
      />
    )}
    keyExtractor={(item) => item.toString()}
  />
);
