import React, { useState, useEffect } from "react";
import { showToast } from "../../../common/helpers/notification";
import { ToastTitle } from "../../../common/models/enum";
import NativeLayout from "../../../common/components/NativeLayout";
import { Route, useNavigation, useRoute } from "@react-navigation/native";
import Typography from "../../../common/components/Typography";
import {
  FontSize,
  DefaultMargin,
  SecondaryBackgroundColor,
  DoubleMargin,
  DefaultOpacity,
} from "../../../common/config/themeConfig";
import NativeHeader from "../../../common/components/NativeHeader";
import {
  ILoginStackNavigationProps,
  ILoginStackParamList,
} from "../../../models/RoutePath";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { auth } from "../../../common/native/firebase";
import NativeView from "../../../common/components/NativeView";
import NativeButton from "../../../common/components/NativeButton";
import NativeField from "../../../common/components/NativeField";
import { Formik, FormikProps } from "formik";
import { slideUpProps } from "../../../common/helpers/animation";
import { otpSchema } from "./yupSchema";
import { Platform } from "react-native";
import RecaptchaVerifier from "../../../common/components/recaptchaVerifier";
import useLoading from "../../../common/hooks/useLoading";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

interface IProps {}

const OtpVerifier = (props: IProps) => {
  const route =
    useRoute<
      NativeStackScreenProps<ILoginStackParamList, "Login OTP">["route"]
    >();
  const loading = useLoading();
  const [confirmationResult, setConfirmationResult] =
    useState<FirebaseAuthTypes.ConfirmationResult>();
  const navigation =
    useNavigation<NativeStackNavigationProp<ILoginStackParamList>>();

  const onVerified = async () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login Complete Profile" }],
    });
  };

  const loginSuccess = (result: FirebaseAuthTypes.User | undefined | null) => {
    if (result) {
      onVerified();
    } else {
      showToast(ToastTitle.Error, "Login Failed", "error");
    }
    loading.stop();
  };

  const codeFilled = async (values: IOtpForm) => {
    loading.start();
    try {
      await confirmationResult?.confirm(values.otp);
    } catch (err) {
      showToast(ToastTitle.Error, (err as Error).message, "error");
    }
  };

  const onAuthStateChanged = () => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user && !user.isAnonymous) {
        console.log("User verified: ", user.phoneNumber);
        loginSuccess(user as any);
      }
    });
    return unsubscribe;
  };

  const sendOTP = async () => {
    if (!route.params) {
      showToast(ToastTitle.Error, "No phone number given", "error");
      return;
    }
    try {
      const confirmationResult = await auth().signInWithPhoneNumber(
        route.params.phone,
        Platform.OS === "web" ? (window as any).recaptchaVerifier : undefined
      );
      setConfirmationResult(confirmationResult);
    } catch (err) {
      showToast(ToastTitle.Error, (err as Error).message, "error");
    }
  };

  useEffect(() => {
    sendOTP();
    const unsubscribeAuth = onAuthStateChanged();
    //cleanup
    return () => {
      unsubscribeAuth();
    };
  }, []);

  return (
    <NativeLayout horizontalMargin lockToPortrait>
      <Formik
        validationSchema={otpSchema}
        initialValues={{
          otp: "",
        }}
        onSubmit={codeFilled}
        validateOnChange={false}
      >
        {(formikProps: FormikProps<IOtpForm>) => (
          <NativeView type="animatable" {...slideUpProps}>
            <NativeView marginTop={DoubleMargin}>
              <Typography type="h1x" family="bold">
                Enter Verification
              </Typography>
              <Typography type="h1x" family="bold">
                code
              </Typography>
            </NativeView>
            <NativeView marginTop={DefaultMargin}>
              <NativeField
                autoCompleteType="off"
                placeholder="Enter OTP  "
                name="otp"
                formikProps={formikProps}
                type="text"
                keyboardType="number-pad"
              />
              <NativeView marginTop={DefaultMargin}>
                <NativeButton
                  size="lg"
                  title="Submit"
                  onPress={() => formikProps.handleSubmit()}
                  isLoading={loading.isLoading}
                />
              </NativeView>
            </NativeView>
            <RecaptchaVerifier />
          </NativeView>
        )}
      </Formik>
    </NativeLayout>
  );
};

export interface IOtpForm {
  otp: string;
}

export default OtpVerifier;
