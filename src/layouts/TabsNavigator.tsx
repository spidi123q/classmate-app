import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DefaultBackgroundColor } from "../common/config/themeConfig";
import Profile from "../features/profile/components/Profile";
import {
  HomePages,
  ProductPages,
  RoutePath,
  TabPages,
} from "../models/RoutePath";
import HeaderNavigation from "./headerNavigation/HeaderNavigation";
import WalletSummary from "../features/product/components/wallet/WalletSummary";
import ServicesSummary from "../features/profile/components/servicesSummary/ServicesSummary";
import SellerSummary from "../features/product/components/seller/SellerSummary";
import useProductAPI from "../features/product/hooks/useProductAPI";
import Login from "../features/login/components/Login";
import ProductDetails from "../features/product/components/wallet/productDetails/ProductDetails";
export default function TabNavigator() {
  const { getProducts } = useProductAPI();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: DefaultBackgroundColor,
      }}
      tabBar={(props) => <HeaderNavigation {...props} />}
      initialRouteName={TabPages.WalletPage}
    >
      <Tab.Screen name={TabPages.WalletPage} component={WalletSummary} />
      <Tab.Screen name={TabPages.SellerPage} component={SellerSummary} />
      <Tab.Screen name={TabPages.ServicesPage} component={ServicesSummary} />
    </Tab.Navigator>
  );
}

// type any is given to fix type bug with options props whcih may be adressing in future release
const hideTabOption: any = {
  tabBarVisible: false,
};

const Tab = createMaterialTopTabNavigator();
