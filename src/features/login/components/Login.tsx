import React from "react";
import { View } from "react-native";
import { RoutePath } from "../../../models/RoutePath";
import { Formik, FormikProps } from "formik";
import LoginForm, { InitialLoginForm } from "../../../models/LoginForm";
import { loginSchema } from "./yupSchema";
import NativeLayout from "../../../common/components/NativeLayout";
import styles from "./Login.style";
import * as Animatable from "react-native-animatable";
import { slideUpProps } from "../../../common/helpers/animation";
import useKeyBoard from "../../../common/helpers/useKeyboard";
import { useNavigation } from "@react-navigation/native";
import {
  DefaultIconFamily,
  DefaultMargin,
  DefaultOpacity,
  DoubleMargin,
  FontSize,
  SecondaryBackgroundColor,
} from "../../../common/config/themeConfig";
import Typography from "../../../common/components/Typography";
import { Icon } from "react-native-elements";
import VideoPlayer from "../../../common/components/videoPlayer/VideoPlayer";
import { VericalSpacer } from "../../../common/components/VericalSpacer";
import NativeButton from "../../../common/components/NativeButton";
import NativeField from "../../../common/components/NativeField";
import { isEmpty } from "lodash";
import NativeView from "../../../common/components/NativeView";

const Login = () => {
  const isKeyBoardActive = useKeyBoard();
  const navigation = useNavigation();

  const signIn = ({ phone }: LoginForm) => {
    navigation.navigate(RoutePath.OtpVerifier, {
      phone,
    });
  };

  return (
    <NativeLayout horizontalMargin>
      <Formik
        validationSchema={loginSchema}
        initialValues={InitialLoginForm}
        onSubmit={signIn}
        validateOnChange={false}
      >
        {(formikProps: FormikProps<LoginForm>) => (
          <NativeView type="animatable" {...slideUpProps}>
            <NativeView marginTop={DoubleMargin}>
              <Typography type="h1x" family="semiBold">
                Login to your
              </Typography>
              <Typography type="h1x" family="semiBold">
                account
              </Typography>
              <Typography opacity={DefaultOpacity} marginTop={DefaultMargin}>
                Login to unlock the complete learning experience
              </Typography>
            </NativeView>

            {/* <VideoPlayer
                  source={{
                    uri: "https://classmate-clasmmatemedia-inso.streaming.media.azure.net/855d809b-1c4f-49c2-84bc-7b0ba296b470/PromisingYoung720.ism/manifest(format=m3u8-aapl)",
                    type: "m3u8",
                  }}
                /> */}
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
