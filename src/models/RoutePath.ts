import { StackNavigationProp } from "@react-navigation/stack";
import { IParams as IJitsiParams } from "../common/native/jitsiMeet";

export enum RoutePath {
  Root = "root",
  Home = "/",
  Auth = "auth",
  Login = "Login",
  OtpVerifier = "Login OTP",
  ProfileComplete = "Login Complete Profile",
  Page = "/page/:name",
  Error = "/error/:type",
  Dashboard = "dashboard",
  Intro = "/intro",
}

export enum UserPages {
  Profile = "Profile",
  JitsiMeet = "Live",
  Booking = "Booking",
}

export enum TabPages {
  Explore = "Explore",
  MyBookings = "My Bookings",
}

type IUserStackParamList = {
  JitsiMeet: IJitsiParams;
  Profile: undefined;
  Booking: undefined;
  Feed: { sort: "latest" | "top" } | undefined;
};

export type IUserStackNavigationProp = StackNavigationProp<
  IUserStackParamList,
  keyof typeof UserPages
>;

type ITabParamList = {
  Explore: undefined;
  MyBookings: undefined;
};

export type ITabNavigationProp = StackNavigationProp<
  ITabParamList,
  keyof typeof TabPages
>;
