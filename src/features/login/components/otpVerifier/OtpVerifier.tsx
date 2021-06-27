import React, { useState, useEffect } from "react";
import { View } from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { showToast } from "../../../../common/helpers/notification";
import styles from "./OtpVerifier.style";
import { ToastTitle } from "../../../../common/models/enum";
import NativeLayout from "../../../../common/components/NativeLayout";
import { Route, useNavigation, useRoute } from "@react-navigation/native";
import Typography from "../../../../common/components/Typography";
import {
  FontSize,
  DefaultMargin,
  SecondaryBackgroundColor,
} from "../../../../common/config/themeConfig";
import NativeHeader from "../../../../common/components/NativeHeader";
import { RoutePath } from "../../../../models/RoutePath";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { auth } from "../../../../common/native/firebase";

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

  const codeFilled = async (code: string) => {
    try {
      await confirmationResult?.confirm(code);
    } catch (err) {
      showToast(
        ToastTitle.Error,
        "Incorrect OTP! Please check again.",
        "error"
      );
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
    <NativeLayout backgroundColor={SecondaryBackgroundColor}>
      <NativeHeader noBorder />
      <View style={styles.container}>
        <Typography
          size={FontSize.h1x}
          family="bold"
          marginVertical={DefaultMargin * 4}
        >
          Verification Code
        </Typography>
        <Typography size={FontSize.h3} marginVertical={DefaultMargin * 4}>
          Please type the verification code sent to registered mobile number.
        </Typography>
        <OTPInputView
          autoFocusOnLoad={false}
          style={styles.otp}
          pinCount={6}
          onCodeFilled={codeFilled}
          codeInputFieldStyle={styles.codeInputField}
        />
      </View>
    </NativeLayout>
  );
};

interface IParams {
  phone: string;
}

export default OtpVerifier;
