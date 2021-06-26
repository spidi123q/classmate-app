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
          <NativeView>
            <Animatable.View {...slideUpProps}>
              <Typography
                size={FontSize.h1x}
                family="bold"
                marginTop={DefaultMargin * 4}
              >
                Get Started
              </Typography>
              {/* <VideoPlayer
                  source={{
                    uri: "https://classmate-clasmmatemedia-inso.streaming.media.azure.net/855d809b-1c4f-49c2-84bc-7b0ba296b470/PromisingYoung720.ism/manifest(format=m3u8-aapl)",
                    type: "m3u8",
                  }}
                /> */}
              <NativeField
                autoCompleteType="off"
                placeholder="Mobile number  "
                name="phone"
                formikProps={formikProps}
                type="text"
                keyboardType="number-pad"
                iconName="phone-call-outline"
                vericalSpacer
                onFocus={() => {
                  if (isEmpty(formikProps.values.phone)) {
                    formikProps.setFieldValue("phone", "+91 ");
                  }
                }}
              />
              <VericalSpacer />
              <VericalSpacer height={DefaultMargin * 2} />
              <NativeButton
                size="lg"
                title="Login"
                onPress={() => formikProps.handleSubmit()}
              />
            </Animatable.View>
          </NativeView>
        )}
      </Formik>
    </NativeLayout>
  );
};

export default Login;
