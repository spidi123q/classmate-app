import { createStackNavigator } from "@react-navigation/stack";
import ProfileForm from "../features/login/components/profileForm/ProfileForm";
import { RoutePath } from "../models/RoutePath";

export default function LoginNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* {isFirstLaunch && (
        <Stack.Screen name={RoutePath.Intro} component={Intro} />
      )} */}
      {/* <Stack.Screen name={RoutePath.Login} component={Login} />
      <Stack.Screen name={RoutePath.OtpVerifier} component={OtpVerifier} /> */}
      <Stack.Screen name={RoutePath.ProfileComplete} component={ProfileForm} />
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator();
