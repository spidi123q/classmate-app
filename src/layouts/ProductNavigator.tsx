import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Offers from "../features/product/components/Offers";
import SearchProducts from "../features/product/components/searchProducts/SearchProducts";
import { SellerDetails } from "../features/product/components/seller/SellerDetails";
import ClaimForm from "../features/product/components/wallet/ClaimForm";
import CompleteProductDetails from "../features/product/components/wallet/productDetails/CompleteProductDetails";
import ProductDetails from "../features/product/components/wallet/productDetails/ProductDetails";
import NotificationList from "../features/profile/components/NotificationList";
import Profile from "../features/profile/components/Profile";
import { ProductPages, RoutePath } from "../models/RoutePath";
import TabsNavigator from "./TabsNavigator";

export default function ProductNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RoutePath.Root}
    >
      <Stack.Screen name={RoutePath.Root} component={TabsNavigator} />
      <Stack.Screen
        name={ProductPages.ProductDetails}
        component={ProductDetails}
      />
      <Stack.Screen
        name={ProductPages.ProductSearch}
        component={SearchProducts}
      />
      <Stack.Screen
        name={ProductPages.SellerDetails}
        component={SellerDetails}
      />
      <Stack.Screen name={ProductPages.Profile} component={Profile} />
      <Stack.Screen
        name={ProductPages.CompleteProductDetails}
        component={CompleteProductDetails}
      />
      <Stack.Screen
        name={ProductPages.Notifications}
        component={NotificationList}
      />
      <Stack.Screen name={ProductPages.ProductClaim} component={ClaimForm} />
      <Stack.Screen name={ProductPages.Offers} component={Offers} />
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator();
