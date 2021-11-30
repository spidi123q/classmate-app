import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { IParams as IJitsiParams } from "../common/native/jitsiMeet";
import IOrganization from "./Organization";

export type IIntroStackParamList = {
  Intro: undefined;
};

export type IIntroStackNavigationProp = StackNavigationProp<
  IIntroStackParamList,
  keyof IIntroStackParamList
>;

export type IUserStackParamList = {
  JitsiMeet: IJitsiParams;
  Profile: undefined;
  Booking: {
    organization: IOrganization;
  };
  Feed: { sort: "latest" | "top" } | undefined;
};

export type IUserStackNavigationProp = StackNavigationProp<
  IUserStackParamList,
  keyof IUserStackParamList
>;

export type ILoginStackParamList = {
  Login: undefined;
  "Verify OTP": { phone: string };
  "Complete Profile": {
    phone: string;
  };
};

export type ILoginStackNavigationProp = StackNavigationProp<
  ILoginStackParamList,
  keyof ILoginStackParamList
>;

export type ITabParamList = {
  Explore: undefined;
  "My Bookings": undefined;
};

export type ITabNavigationProp = BottomTabScreenProps<
  ITabParamList,
  keyof ITabParamList
>;

export type IAppStackParamList = {
  Tabs: undefined;
  Dashboard: undefined;
  Error: undefined;
};

export type IAppStackNavigationProp = StackNavigationProp<
  IAppStackParamList,
  keyof IAppStackParamList
>;

export type IDashboardUserNavigationProp = CompositeNavigationProp<
  StackNavigationProp<
    {
      Dashboard: NavigatorScreenParams<IUserStackParamList>;
    },
    "Dashboard"
  >,
  StackNavigationProp<IUserStackParamList>
>;

export type IAppTabrNavigationProp = CompositeNavigationProp<
  StackNavigationProp<
    {
      Tabs: NavigatorScreenParams<ITabParamList>;
    },
    "Tabs"
  >,
  BottomTabNavigationProp<ITabParamList>
>;
