import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../features/profile/components/Profile";
import Videos from "../features/videos/components/Videos";
import { HomePages } from "../models/RoutePath";
import Icon from "react-native-remix-icon";
import {
  DefaultMargin,
  DefaultPrimaryColor,
  FontFamily,
} from "../common/config/themeConfig";
import { AppTheme } from "../common/config/custom-theme";
import { Home } from "../features/videos/components/Home";
import { DocumentSummary } from "../features/documents/components/DocumentSummary";
import NativeHeader from "../common/components/NativeHeader";
import { getHeaderTitle } from "@react-navigation/elements";

const Tab = createBottomTabNavigator();

export function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: DefaultPrimaryColor,
        tabBarInactiveTintColor: AppTheme["color-grey2"],
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: FontFamily.regular,
          fontWeight: "700",
        },
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="ri-home-5-line" color={color} size={size} />
          ),
        }}
        name={HomePages.Home}
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="ri-video-line" color={color} size={size} />
          ),
        }}
        name={HomePages.Videos}
        component={Videos}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="ri-bill-line" color={color} size={size} />
          ),
        }}
        name={HomePages.Documents}
        component={DocumentSummary}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="ri-user-3-line" color={color} size={size} />
          ),
        }}
        name={HomePages.Profile}
        component={Profile}
      />
    </Tab.Navigator>
  );
}
