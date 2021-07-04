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

interface IProps {}

const ProfileForm = (props: IProps) => {
  const { getUser } = useUserAPI();
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
            <NativeView>
              <Typography>No subscription available.</Typography>
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
