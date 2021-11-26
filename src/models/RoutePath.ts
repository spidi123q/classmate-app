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

export const UserPages = {
  Profile: "Profile",
  JitsiMeet: "Live",
};

export enum TabPages {
  Explore = "Explore",
  MyBookings = "My Bookings",
}

type RootStackParamList = {
  JitsiMeet: IJitsiParams;
  Profile: undefined;
  Feed: { sort: "latest" | "top" } | undefined;
};

export type IUserStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  keyof typeof UserPages
>;
