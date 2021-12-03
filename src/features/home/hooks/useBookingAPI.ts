import { useState } from "react";
import { useDispatch } from "react-redux";
import { AxiosApi, IResponse } from "../../../common/helpers/axios";
import useLoading from "../../../common/hooks/useLoading";
import { IPaginateResponse } from "../../../common/models/PaginateResult";
import Booking, { IBookingEdit, IBookingQuery } from "../../../models/Booking";
import CreateBooking from "../api/CreateBooking";
import GetBookings from "../api/GetBookings";
import UpdateBooking from "../api/UpdateBooking";

export default function useBookingsAPI() {
  const dispatch: any = useDispatch();
  const loading = useLoading();

  const createElseUpdate = async (
    organizationEdit: IBookingEdit
  ): IResponse<Booking> => {
    const request = organizationEdit._id
      ? UpdateBooking(organizationEdit._id, organizationEdit)
      : CreateBooking(organizationEdit);
    loading.start();
    const result = await dispatch(AxiosApi(request));
    loading.stop();
    return result;
  };

  const getBookings = async (
    query: IBookingQuery
  ): IPaginateResponse<Booking> => {
    const request = GetBookings(query);
    return dispatch(AxiosApi(request));
  };

  return {
    createElseUpdate,
    getBookings,
    isLoading: loading.isLoading,
  };
}
