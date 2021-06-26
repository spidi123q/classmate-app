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

const Login = () => {
  const isKeyBoardActive = useKeyBoard();
  const navigation = useNavigation();

  const signIn = ({ phone }: LoginForm) => {
    navigation.navigate(RoutePath.OtpVerifier, {
      phone,
    });
  };

  return (
    <NativeLayout backgroundColor={SecondaryBackgroundColor}>
      <Formik
        validationSchema={loginSchema}
        initialValues={InitialLoginForm}
        onSubmit={signIn}
        validateOnChange={false}
      >
        {(formikProps: FormikProps<LoginForm>) => (
          <View style={styles.mainContainer}>
            {!isKeyBoardActive && (
              <Animatable.View {...slideUpProps} style={styles.logoContainer}>
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
              </Animatable.View>
            )}
            <View style={styles.formContainer}>
              <View style={styles.container}></View>
            </View>
          </View>
        )}
      </Formik>
    </NativeLayout>
  );
};

export default Login;
