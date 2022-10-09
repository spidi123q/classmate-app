import { union } from "lodash";
import { useDispatch } from "react-redux";
import { AxiosApi } from "../../../common/helpers/axios";
import useLoading from "../../../common/hooks/useLoading";
import { IPaginateResponse } from "../../../common/models/PaginateResult";
import { IBook, IBookEdit, IBookQuery } from "../../../models/Book";
import GetBooks from "../api/GetBook";

export default function useBooksAPI() {
  const dispatch: any = useDispatch();
  const loading = useLoading();

  const getBooks = async (query: IBookQuery): IPaginateResponse<IBook> => {
    const request = GetBooks(query);
    loading.start();
    const result = await dispatch(AxiosApi(request));
    loading.stop();
    return result;
  };

  return {
    getBooks,
    isLoading: loading.isLoading,
  };
}
