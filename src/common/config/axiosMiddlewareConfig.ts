import { AppInfoActions } from "../state/AppInfoAction";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import HttpStatus from "http-status-codes";
import { showToast } from "../helpers/notification";
import { ToastTitle } from "../models/enum";
import cleanDeep from "clean-deep";
import { auth } from "../../native/firebase";

interface AxiosMiddleWareConfigParams {
  getState: any;
  dispatch: any;
  getSourceAction: any;
}

export const axiosMiddlewareConfig = {
  successSuffix: "OnSuccess",
  errorSuffix: "OnFail",
  interceptors: {
    request: [
      {
        success: async function (
          params: AxiosMiddleWareConfigParams,
          req: AxiosRequestConfig
        ) {
          const token: string | undefined =
            await auth().currentUser?.getIdToken();
          req.headers.Authorization = `Bearer ${token}`;
          params.dispatch(AppInfoActions.InApiProgress());
          console.log("req to : ", req.url, "Method: ", req.method);
          if (req.data) {
            req.data = cleanDeep(req.data);
          }
          return req;
        },
        error: function (
          params: AxiosMiddleWareConfigParams,
          error: AxiosError
        ) {
          console.error(`TCL: error in url ${error.request.url}`, error);
          return error;
        },
      },
    ],
    response: [
      {
        success: async function (
          params: AxiosMiddleWareConfigParams,
          res: AxiosResponse
        ) {
          //console.log("TCL: res", res); //contains information about request object
          params.dispatch(AppInfoActions.OnApiSuccess());
          return Promise.resolve(res.data);
        },
        error: async function (
          params: AxiosMiddleWareConfigParams,
          error: AxiosError
        ) {
          console.error(`TCL: error in url `, JSON.stringify(error.config.url));
          const message: string =
            error.response?.data?.message ?? error.message;
          showToast(ToastTitle.ApiError, message, "error");
          await params.dispatch(AppInfoActions.OnApiFail(message));
          // if (
          //   error.response &&
          //   error.response.status === HttpStatus.UNAUTHORIZED
          // ) {
          //   // logout();
          // }
          return Promise.reject(error);
        },
      },
    ],
  },
};
