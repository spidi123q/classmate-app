import { IResponse } from "../helpers/axios";

export interface IPaginateResult<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page?: number;
  totalPages: number;
  nextPage?: number | null;
  prevPage?: number | null;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  meta?: any;
}

export type IPaginateResponse<T> = IResponse<IPaginateResult<T>>;
export const IPaginateResponse = Promise;

export const InitialPaginateResult: IPaginateResult<any> = {
  docs: [],
  totalDocs: 0,
  limit: 10,
  totalPages: 1,
  pagingCounter: 1,
  hasPrevPage: false,
  hasNextPage: true,
  page: 0,
  nextPage: 1,
};

export const InitialPaginateResponse: IPaginateResponse<any> = Promise.resolve({
  payload: InitialPaginateResult,
});
