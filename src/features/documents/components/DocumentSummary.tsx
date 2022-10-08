import React, { useEffect, useState } from "react";
import NativeLayout from "../../../common/components/NativeLayout";
import { FlatGrid } from "react-native-super-grid";
import Typography from "../../../common/components/Typography";
import NativeView from "../../../common/components/NativeView";
import { ItemDimension, MainCategory } from "./MainCategory";
import NativeHeader from "../../../common/components/NativeHeader";
import { HomePages } from "../../../models/RoutePath";
import { IBook, IBookQuery } from "../../../models/Book";
import useBooksAPI from "../hooks/useBooksAPI";
import { groupBy } from "lodash";

export function DocumentSummary() {
  const { getBooks } = useBooksAPI();
  const [books, setBooks] = useState<IBook[]>([]);

  async function loadBooks() {
    const result = await getBooks(bookQuery);
    setBooks(result.payload.docs);
  }

  useEffect(() => {
    loadBooks();
  }, []);

  const booksByMainCategory = groupBy(books, (book) => book.mainCategory);

  return (
    <NativeLayout>
      <FlatGrid
        itemDimension={ItemDimension}
        data={Object.keys(booksByMainCategory)}
        renderItem={({ item }) => (
          <MainCategory mainCategory={item} books={booksByMainCategory[item]} />
        )}
      />
    </NativeLayout>
  );
}

const bookQuery: IBookQuery = {
  active: true,
  pagination: false,
};
