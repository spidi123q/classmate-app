import React, { useEffect, useRef, useState } from "react";
import NativeLayout from "../../../../common/components/NativeLayout";
import { IUserEdit } from "../../../../models/User";
import { profileSchema } from "../yupSchema";
import Loader from "../../../../common/components/Loader";
import useUserAPI from "../../hooks/useUserAPI";
import { showToast } from "../../../../common/helpers/notification";
import { ToastTitle } from "../../../../common/models/enum";
import { Formik, FormikProps } from "formik";
import { LogBox, View } from "react-native";
import Typography from "../../../../common/components/Typography";
import NativeView from "../../../../common/components/NativeView";
import useLoading from "../../../../common/hooks/useLoading";
import LottieView from "lottie-react-native";
import useLoginActions from "../../hooks/useLoginActions";

interface IProps {}

const ProfileForm = (props: IProps) => {
  const { getUser } = useUserAPI();
  const { logout } = useLoginActions();
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false);
  const loading = useLoading();
  const successLottieRef = useRef<LottieView | null>(null);

  const updateCurrentUser = async (values: IUserEdit) => {
    setIsProfileComplete(true);
  };

  const validateUser = async () => {
    loading.start();
    const user = await getUser(false);
    try {
      const isValid = await profileSchema.isValid(user.payload);
      if (!isValid) {
        // Firebase is still logged in so need to logout first if user want to login again
        logout();
      }
      setIsProfileComplete(isValid);
    } catch (e) {
      showToast(ToastTitle.FormError, "Validation Failed", "error");
    }
    loading.stop();
    successLottieRef.current?.play();
  };

  useEffect(() => {
    validateUser();
  }, []);

  if (loading.isLoading) {
    return (
      <NativeLayout>
        <Loader />
      </NativeLayout>
    );
  }

  if (isProfileComplete) {
    return (
      <NativeLayout>
        <Loader
          type="success"
          onAnimationFinish={() => getUser()}
          loop={false}
          autoPlay={false}
          onInit={(lottie) => {
            successLottieRef.current = lottie;
          }}
        />
      </NativeLayout>
    );
  }

  return (
    <>
      <NativeLayout>
        <Formik
          validationSchema={profileSchema}
          initialValues={{ name: "" }}
          onSubmit={updateCurrentUser}
          validateOnChange={false}
        >
          {(formikProps: FormikProps<IUserEdit>) => (
            <NativeView flex={1} alignItems="center" justifyContent="center">
              <Typography family="semiBold" type="h1x" textAlign="center">
                You have no active subscription.
              </Typography>
            </NativeView>
          )}
        </Formik>
      </NativeLayout>
    </>
  );
};

export default ProfileForm;

LogBox.ignoreLogs([
  "Can't perform a React state update on an unmounted component",
]);
