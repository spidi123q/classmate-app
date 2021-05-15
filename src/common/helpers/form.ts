import { FormikProps } from "formik";
import { ToastTitle } from "../models/enum";
import { showToast } from "./notification";

/**
 * Display error message if form has errors and submit if validation success
 * @param formikProps Formik props
 */
export const errorHandleAndSubmit = async (formikProps: FormikProps<any>) => {
  const errors = await formikProps.validateForm();
  console.log("errorHandleAndSubmit -> errors", errors);
  for (const [key, value] of Object.entries(errors)) {
    showToast(ToastTitle.FormError, value as string, "error");
    break;
  }
  formikProps.handleSubmit();
};
