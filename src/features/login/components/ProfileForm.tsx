import React, { useEffect, useRef, useState } from "react";
import NativeLayout from "../../../common/components/NativeLayout";
import { IUserEdit } from "../../../models/User";
import { profileSchema } from "./yupSchema";
import Loader from "../../../common/components/Loader";
import useUserAPI from "../hooks/useUserAPI";
import { showToast } from "../../../common/helpers/notification";
import { ToastTitle } from "../../../common/models/enum";
import { Formik, FormikProps } from "formik";
import { LogBox, View } from "react-native";
import Typography from "../../../common/components/Typography";
import NativeView from "../../../common/components/NativeView";
import useLoading from "../../../common/hooks/useLoading";
import LottieView from "lottie-react-native";
import useLoginActions from "../hooks/useLoginActions";
import NativeHeader from "../../../common/components/NativeHeader";
import { IAppStackNavigationProp } from "../../../models/RoutePath";
import { useNavigation } from "@react-navigation/native";
import { isAuthorized } from "../../../helpers/auth";
import { UserPermissions, UserRoles } from "../../../models/enum";

interface IProps {}

const ProfileForm = (props: IProps) => {
  const { getUser, updateUser } = useUserAPI();
  const { logout } = useLoginActions();
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false);
  const loading = useLoading();
  const successLottieRef = useRef<LottieView | null>(null);
  const navigation = useNavigation<IAppStackNavigationProp>();

  const updateCurrentUser = async (values: IUserEdit) => {
    setIsProfileComplete(true);
  };

  const validateUser = async () => {
    loading.start();
    const user = await getUser(false);
    try {
      const isValid = isAuthorized(
        user.payload?.permissions,
        UserPermissions.WriteUserSelf
      );
      if (!isValid) {
        await updateUser({
          role: UserRoles.User,
          active: true,
        });
      }
      loading.stop();
      setIsProfileComplete(true);
    } catch (e) {
      loading.stop();
      showToast(
        ToastTitle.FormError,
        (e as Error).message ?? "Validation Failed",
        "error"
      );
    }
    successLottieRef.current?.play();
  };

  const onBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Tabs", params: {} }],
    });
  };

  const onSuccess = async () => {
    // Show tabs page after login
    onBack();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      getUser();
    });

    return unsubscribe;
  }, [navigation]);

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
      <NativeLayout lockToPortrait>
        <Loader
          type="success"
          onAnimationFinish={onSuccess}
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
        <NativeHeader onBack={onBack} />
        <Formik
          validationSchema={profileSchema}
          initialValues={{ name: "" }}
          onSubmit={updateCurrentUser}
          validateOnChange={false}
        >
          {(formikProps: FormikProps<IUserEdit>) => (
            <NativeView flex={1} alignItems="center" justifyContent="center">
              <Typography type="h1x" textAlign="center">
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
