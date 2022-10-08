import React, { useEffect, useRef, useState } from "react";
import NativeLayout from "../../../../common/components/NativeLayout";
import { IUserEdit } from "../../../../models/User";
import { profileSchema } from "../yupSchema";
import Loader from "../../../../common/components/Loader";
import useUserAPI from "../../hooks/useUserAPI";
import { showToast } from "../../../../common/helpers/notification";
import { ToastTitle } from "../../../../common/models/enum";
import Typography from "../../../../common/components/Typography";
import NativeView from "../../../../common/components/NativeView";
import useLoading from "../../../../common/hooks/useLoading";
import useLoginActions from "../../hooks/useLoginActions";
import NativeHeader from "../../../../common/components/NativeHeader";
import { ILoginStackParamList } from "../../../../models/RoutePath";
import { useNavigation } from "@react-navigation/native";
import { DefaultPrimaryColor } from "../../../../common/config/themeConfig";
import Pie from "../../../../common/components/pie";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface IProps {}

const ProfileForm = (props: IProps) => {
  const { getUser } = useUserAPI();
  const { logout } = useLoginActions();
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false);
  const loading = useLoading();
  const navigation =
    useNavigation<NativeStackNavigationProp<ILoginStackParamList>>();
  const { setUser } = useLoginActions();

  const validateUser = async () => {
    loading.start();
    const user = await getUser(false);
    try {
      const isValid = profileSchema.isValidSync(user.payload);
      if (!isValid) {
        // Firebase is still logged in so need to logout first if user want to login again
        logout();
      }
      setIsProfileComplete(isValid);
      await getUser(true);
    } catch (e) {
      showToast(ToastTitle.FormError, "Validation Failed", "error");
    }
    loading.stop();
  };

  const onBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  useEffect(() => {
    validateUser();
  }, []);

  return (
    <NativeLayout>
      {!loading.isLoading && <NativeHeader onBack={onBack} />}
      <NativeView flex={1} alignItems="center" justifyContent="center">
        {loading.isLoading ? (
          <Pie
            progress={0.4}
            size={50}
            color={DefaultPrimaryColor}
            indeterminate
          />
        ) : (
          <Typography type="h1x" textAlign="center">
            You have no active subscription.
          </Typography>
        )}
      </NativeView>
    </NativeLayout>
  );
};

export default ProfileForm;
