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

export const TabPages = {
  WalletPage: RoutePath.Home,
  SellerPage: RoutePath.Page.replace(":name", "seller"),
  ServicesPage: RoutePath.Page.replace(":name", "services"),
};

export const HomePages = {
  Search: `${TabPages.WalletPage}search`,
  SearchResults: `${TabPages.WalletPage}search/results`,
};

export const ProductPages = {
  Home: "ProductPages",
  ProductDetails: TabPages.WalletPage.concat("product/details"),
  CompleteProductDetails: TabPages.WalletPage.concat(
    "product/details/complete"
  ),
  ProductSearch: TabPages.WalletPage.concat("product/search"),
  ProductClaim: TabPages.WalletPage.concat("product/claim"),
  SellerDetails: TabPages.SellerPage.concat("/details"),
  Profile: RoutePath.Home.concat("/profile"),
  Notifications: RoutePath.Home.concat("/notifications"),
  Offers: RoutePath.Home.concat("/offers"),
};
