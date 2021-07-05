import { Formik } from "formik";
import React from "react";
import NativeButton from "../../../common/components/NativeButton";
import NativeField from "../../../common/components/NativeField";
import NativeView from "../../../common/components/NativeView";
import { DoubleMargin } from "../../../common/config/themeConfig";
import { IUserEdit } from "../../../models/User";
import useUser from "../../login/hooks/useUser";
import useUserAPI from "../../login/hooks/useUserAPI";

interface IProps {
  close: () => any;
}

export default function ProfileEdit({ close }: IProps) {
  const { updateAndGetUser, isLoading } = useUserAPI();
  const user = useUser();

  const handleSubmit = async (value: IUserEdit) => {
    await updateAndGetUser(value);
    !isLoading && close();
  };

  return (
    <Formik initialValues={user} onSubmit={handleSubmit}>
      {(formikProps) => (
        <NativeView justifyContent="center">
          <NativeField
            formikProps={formikProps}
            name="name"
            type="text"
            placeholder="What's your name?      "
            size="lg"
            vericalSpacer
          />
          <NativeView marginTop={DoubleMargin}>
            <NativeButton
              title="Update"
              isLoading={isLoading}
              onPress={() => formikProps.handleSubmit()}
            />
          </NativeView>
        </NativeView>
      )}
    </Formik>
  );
}
