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

export const HomePages = {
  Videos: "Videos",
  VideoDetails: "Video Details",
  Profile: "Profile",
  JitsiMeet: "Live",
};

export enum TabPages {
  Explore = "Explore",
  MyBookings = "My Bookings",
}
