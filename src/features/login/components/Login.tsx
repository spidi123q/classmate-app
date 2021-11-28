import React from "react";
import { View } from "react-native";
import { ILoginStackNavigationProp } from "../../../models/RoutePath";
import { Formik, FormikProps } from "formik";
import LoginForm, { InitialLoginForm } from "../../../models/LoginForm";
import { loginSchema } from "./yupSchema";
import NativeLayout from "../../../common/components/NativeLayout";
import { slideUpProps } from "../../../common/helpers/animation";
import { useNavigation } from "@react-navigation/native";
import {
  DefaultIconFamily,
  DefaultMargin,
  DefaultOpacity,
  DoubleMargin,
} from "../../../common/config/themeConfig";
import Typography from "../../../common/components/Typography";
import NativeButton from "../../../common/components/NativeButton";
import NativeField from "../../../common/components/NativeField";
import { isEmpty } from "lodash";
import NativeView from "../../../common/components/NativeView";

const Login = () => {
  const navigation = useNavigation<ILoginStackNavigationProp>();

  const signIn = ({ phone }: LoginForm) => {
    navigation.navigate("Verify OTP", {
      phone,
    });
  };

  return (
    <NativeLayout lockToPortrait flexDirection="column">
      <Formik
        validationSchema={loginSchema}
        initialValues={InitialLoginForm}
        onSubmit={signIn}
        validateOnChange={false}
      >
        {(formikProps: FormikProps<LoginForm>) => (
          <NativeView
            type="animatable"
            {...slideUpProps}
            paddingHorizontal={DefaultMargin}
          >
            <NativeView marginTop={DoubleMargin}>
              <Typography type="h1x" family="bold">
                Login to your
              </Typography>
              <Typography type="h1x" family="bold">
                account
              </Typography>
              <Typography opacity={DefaultOpacity} marginTop={DefaultMargin}>
                Login to unlock the complete learning experience
              </Typography>
            </NativeView>
            <NativeView marginTop={DefaultMargin}>
              <NativeField
                autoCompleteType="off"
                placeholder="Mobile number  "
                name="phone"
                formikProps={formikProps}
                type="text"
                keyboardType="number-pad"
                onFocus={() => {
                  if (isEmpty(formikProps.values.phone)) {
                    formikProps.setFieldValue("phone", "+91 ");
                  }
                }}
              />
              <NativeView marginTop={DefaultMargin}>
                <NativeButton
                  size="lg"
                  title="Login"
                  onPress={() => formikProps.handleSubmit()}
                />
                <Typography marginTop={DefaultMargin} textAlign="center">
                  Partner With Us?
                </Typography>
              </NativeView>
            </NativeView>
          </NativeView>
        )}
      </Formik>
    </NativeLayout>
  );
};

export default Login;
