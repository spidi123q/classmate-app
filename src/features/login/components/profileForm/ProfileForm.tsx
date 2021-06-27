import React, { useEffect, useState } from "react";
import NativeLayout from "../../../../common/components/NativeLayout";
import { IUserEdit } from "../../../../models/User";
import { profileSchema } from "../yupSchema";
import { UserRoles } from "../../../../models/enum";
import styles from "./ProfileForm.style";
import Loader from "../../../../common/components/Loader";
import cleanDeep from "clean-deep";
import useUserAPI from "../../hooks/useUserAPI";
import { showToast } from "../../../../common/helpers/notification";
import { ToastTitle } from "../../../../common/models/enum";
import { Formik, FormikProps } from "formik";
import { LogBox, View } from "react-native";
import NativeButton from "../../../../common/components/NativeButton";
import NativeField from "../../../../common/components/NativeField";
import Typography from "../../../../common/components/Typography";
import { VericalSpacer } from "../../../../common/components/VericalSpacer";
import {
  FontSize,
  DefaultMargin,
  SecondaryBackgroundColor,
} from "../../../../common/config/themeConfig";
import { slideUpProps } from "../../../../common/helpers/animation";
import * as Animatable from "react-native-animatable";
import useKeyBoard from "../../../../common/helpers/useKeyboard";
import UserPic from "../../assets/UserPic.svg";
import { auth } from "../../../../common/native/firebase";

interface IProps {}

const ProfileForm = (props: IProps) => {
  const { getUser, updateUser } = useUserAPI();
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false);
  const isKeyBoardActive = useKeyBoard();

  const updateCurrentUser = async (values: IUserEdit) => {
    setIsProfileComplete(true);
  };

  const validateUser = async () => {
    const user = await getUser(false);
    try {
      const isValid = profileSchema.isValidSync(user.payload);
      setIsProfileComplete(isValid);
    } catch (e) {
      showToast(ToastTitle.FormError, "Validation Failed", "error");
    }
  };

  useEffect(() => {
    validateUser();
  }, []);

  if (isProfileComplete) {
    return (
      <NativeLayout backgroundColor="white">
        <Loader
          type="success"
          onAnimationFinish={() => getUser()}
          loop={false}
        />
      </NativeLayout>
    );
  }

  return (
    <>
      <NativeLayout backgroundColor={SecondaryBackgroundColor}>
        <Formik
          validationSchema={profileSchema}
          initialValues={{ name: "" }}
          onSubmit={updateCurrentUser}
          validateOnChange={false}
        >
          {(formikProps: FormikProps<IUserEdit>) => (
            <View>
              {!isKeyBoardActive && (
                <Animatable.View {...slideUpProps}>
                  <Typography
                    size={FontSize.h1x}
                    family="bold"
                    marginTop={DefaultMargin * 4}
                  >
                    Welcome
                  </Typography>
                  <Typography
                    marginTop={DefaultMargin}
                    marginBottom={DefaultMargin * 4}
                  >
                    Complete your profile
                  </Typography>
                  <UserPic />
                </Animatable.View>
              )}
              <View>
                <View>
                  <NativeField
                    placeholder="Name"
                    name="name"
                    formikProps={formikProps}
                    type="text"
                    vericalSpacer
                  />
                  <VericalSpacer height={DefaultMargin * 3} />
                  <NativeButton
                    size="lg"
                    title="Save"
                    onPress={() => formikProps.handleSubmit()}
                  />
                </View>
              </View>
            </View>
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
