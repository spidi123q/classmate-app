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
  UserPages = "UserPages",
}

import type {
  BottomTabScreenProps,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import type { CompositeNavigationProp } from "@react-navigation/native";
import { IPdfViewerParam } from "../common/components/pdfViewer";
import IVideo from "./Video";

export const HomePages = {
  Home: "Home",
  Videos: "Videos",
  Documents: "Documents",
  VideoDetails: "Video Details",
  Profile: "Profile",
  JitsiMeet: "Live",
  PdfViewer: "Pdf Viewer",
  ViewDocuments: "View Documents",
};

export type ITabParamList = {
  Home: undefined;
  Videos: undefined;
  Documents: undefined;
  Profile: undefined;
};

export type IRootStackNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<IRootStackParamList, "Dashboard">,
  BottomTabNavigationProp<ITabParamList>
>;

export type IRootStackParamList = {
  Live: undefined;
  "Pdf Viewer": IPdfViewerParam;
  "View Documents": undefined;
  Error: undefined;
  "Video Details": {
    video: IVideo;
  };
  Dashboard: CompositeScreenProps<
    NativeStackScreenProps<IRootStackParamList, "Dashboard">,
    BottomTabScreenProps<ITabParamList>
  >;
};
