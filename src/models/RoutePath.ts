export enum RoutePath {
  Root = "root",
  Home = "/",
  Auth = "auth",
  Login = "/login",
  OtpVerifier = "/login/otp",
  ProfileComplete = "/login/profileComplete",
  Page = "/page/:name",
  Error = "/error/:type",
  Dashboard = "dashboard",
  Intro = "/intro",
}

export const HomePages = {
  Videos: "/videos",
  Profile: "/profile",
};
