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
import { RoutePath } from "../../../models/RoutePath";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { auth } from "../../../common/native/firebase";
import NativeView from "../../../common/components/NativeView";
import NativeButton from "../../../common/components/NativeButton";
import NativeField from "../../../common/components/NativeField";
import { Formik, FormikProps } from "formik";
import { slideUpProps } from "../../../common/helpers/animation";
import { otpSchema } from "./yupSchema";

interface IProps {}

const OtpVerifier = (props: IProps) => {
  const route = useRoute<Route<string, IParams | undefined>>();
  const [confirmationResult, setConfirmationResult] =
    useState<FirebaseAuthTypes.ConfirmationResult>();
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const navigation = useNavigation();

  // Launch profile complete form if profile is verified
  if (isVerified) {
    navigation.reset({
      index: 0,
      routes: [{ name: RoutePath.ProfileComplete }],
    });
  }

  const onVerified = async () => {
    setIsVerified(true);
  };

  const loginSuccess = (result: FirebaseAuthTypes.User | undefined | null) => {
    if (result) {
      onVerified();
    } else {
      showToast(ToastTitle.Error, "Login Failed", "error");
    }
  };

  const codeFilled = async (values: IOtpForm) => {
    try {
      await confirmationResult?.confirm(values.otp);
    } catch (err) {
      showToast(ToastTitle.Error, err.message, "error");
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
        route.params.phone
      );
      setConfirmationResult(confirmationResult);
    } catch (err) {
      showToast(ToastTitle.Error, err.message, "error");
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
    <NativeLayout horizontalMargin>
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
              <Typography type="h1x" family="semiBold">
                Enter Verification
              </Typography>
              <Typography type="h1x" family="semiBold">
                code
              </Typography>
            </NativeView>
            <NativeView marginTop={DefaultMargin}>
              <NativeField
                autoCompleteType="off"
                placeholder="Mobile number  "
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
                />
              </NativeView>
            </NativeView>
          </NativeView>
        )}
      </Formik>
    </NativeLayout>
  );
};

interface IParams {
  phone: string;
}

export interface IOtpForm {
  otp: string;
}

export default OtpVerifier;
