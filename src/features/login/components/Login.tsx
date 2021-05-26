import React, { useState, useRef } from "react";
import Ripple from "react-native-material-ripple";
import {
  View,
  Text,
  NativeModules,
  requireNativeComponent,
} from "react-native";
import User, { UserEdit } from "../../../models/User";
import { RoutePath, TabPages } from "../../../models/RoutePath";
import { UserRoles } from "../../../models/enum";
import { isAuthorized } from "../../../helpers/auth";
import OtpVerifier from "./otpVerifier/OtpVerifier";
import RBSheet from "react-native-raw-bottom-sheet";
import { Formik, FormikProps } from "formik";
import NativeField from "../../../common/components/NativeField";
import LoginForm, { InitialLoginForm } from "../../../models/LoginForm";
import { loginSchema, profileSchema } from "./yupSchema";
import { errorHandleAndSubmit } from "../../../common/helpers/form";
import NativeLayout from "../../../common/components/NativeLayout";
import { IResponse } from "../../../common/helpers/axios";
import ProfileForm from "./profileForm/ProfileForm";
import SignIn from "../assets/SignIn.svg";
import styles from "./Login.style";
import { Button } from "react-native-elements";
import Loader from "../../../common/components/Loader";
import { getFullPhone } from "../../../common/helpers/transform";
import { AppTheme } from "../../../common/config/custom-theme";
import NativeButton from "../../../common/components/NativeButton";
import NavigationFooter from "../../../layouts/headerNavigation/navigationFooter/NavigationFooter";
import useUserAPI from "../hooks/useUserAPI";
import useUser from "../hooks/useUser";
import useAppInfo from "../../../common/hooks/useAppInfo";
import * as Animatable from "react-native-animatable";
import { slideUpProps } from "../../../common/helpers/animation";
import useKeyBoard from "../../../common/helpers/useKeyboard";
import { useNavigation } from "@react-navigation/native";
import { isEmpty } from "lodash";
import Logo from "../../../common/assets/Logo.svg";
import {
  AppFonts,
  DefaultLogoHeight,
  DefaultLogoWidth,
  DefaultMargin,
  DefaultOpacity,
  FontSize,
  SecondaryBackgroundColor,
} from "../../../common/config/themeConfig";
import Typography from "../../../common/components/Typography";
import { VericalSpacer } from "../../../common/components/VericalSpacer";
import VideoPlayer from "../../../common/components/videoPlayer/VideoPlayer";
import { JitsiMeetView, RNJitsiMeet } from "../../../native/jitsiMeet/index";

const Login = () => {
  const isKeyBoardActive = useKeyBoard();
  const navigation = useNavigation();

  const signIn = ({ phone }: LoginForm) => {
    navigation.navigate(RoutePath.OtpVerifier, {
      phone,
    });
  };

  function onConferenceTerminated(nativeEvent) {
    console.log(
      "🚀 ~ file: Login.tsx ~ line 67 ~ onConferenceTerminated ~ onConferenceTerminated"
    );
    /* Conference terminated event */
  }

  function onConferenceJoined(nativeEvent) {
    /* Conference joined event */
  }

  function onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
  }

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
                <Logo height={DefaultLogoHeight} width={DefaultLogoWidth} />
                <Typography
                  size={FontSize.h1x}
                  family="bold"
                  marginTop={DefaultMargin * 4}
                >
                  Get Started
                </Typography>
                {/* <VideoPlayer
                  source={{ uri: "https://vjs.zencdn.net/v/oceans.mp4" }}
                /> */}
              </Animatable.View>
            )}
            <View style={styles.formContainer}>
              <View style={styles.container}>
                <JitsiMeetView
                  onConferenceTerminated={onConferenceTerminated}
                  onConferenceJoined={onConferenceJoined}
                  onConferenceWillJoin={onConferenceWillJoin}
                  style={{ flex: 1, height: "100%", width: "100%" }}
                />
                <NativeButton
                  size="lg"
                  title="Login"
                  onPress={() => {
                    const userInfo = {
                      displayName: "User",
                      email: "user@example.com",
                      avatar: "https:/gravatar.com/avatar/abc123",
                    };

                    RNJitsiMeet.join(
                      "https://meet.jit.si/test1233231231231",
                      userInfo
                    );
                  }}
                />
                                <NativeButton
                  size="lg"
                  title="Test"
                  onPress={() => {


                    RNJitsiMeet.showJoinMeetingNotification()
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </Formik>
    </NativeLayout>
  );
};

export default Login;
