import { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DefaultBackgroundColor } from "../common/config/themeConfig";
import { TabPages } from "../models/RoutePath";
import HeaderNavigation from "./headerNavigation/HeaderNavigation";
export default function TabNavigator() {
  useEffect(() => {}, []);

  return (
    <Tab.Navigator
      tabBar={(props) => <HeaderNavigation {...props} />}
      initialRouteName={TabPages.WalletPage}
    >
      {null}
    </Tab.Navigator>
  );
}

// type any is given to fix type bug with options props whcih may be adressing in future release
const hideTabOption: any = {
  tabBarVisible: false,
};

const Tab = createMaterialTopTabNavigator();
