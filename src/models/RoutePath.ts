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
import { IBook } from "./Book";
import { IParams as IJitsiMeetParams } from "../common/native/jitsiMeet";

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
  Live: IJitsiMeetParams;
  "Pdf Viewer": IPdfViewerParam;
  "View Documents": {
    books: IBook[];
  };
  Error: undefined;
  "Video Details": {
    video: IVideo;
  };
  Dashboard: CompositeScreenProps<
    NativeStackScreenProps<IRootStackParamList, "Dashboard">,
    BottomTabScreenProps<ITabParamList>
  >;
};

export type ILoginStackNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<IRootStackParamList, "Dashboard">,
  NativeStackNavigationProp<ILoginStackParamList>
>;

export type ILoginStackParamList = {
  Intro: undefined;
  Login: undefined;
  "Login OTP": {
    phone: string;
  };
  "Login Complete Profile": undefined;
};
