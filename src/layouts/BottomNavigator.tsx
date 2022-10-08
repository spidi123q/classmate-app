import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../features/profile/components/Profile";
import Videos, { videoQuery } from "../features/videos/components/Videos";
import { ITabParamList } from "../models/RoutePath";
import Icon from "react-native-remix-icon";
import {
  DefaultMargin,
  DefaultPrimaryColor,
  FontFamily,
} from "../common/config/themeConfig";
import { AppTheme } from "../common/config/custom-theme";
import { Home } from "../features/videos/components/home/Home";
import { DocumentSummary } from "../features/documents/components/DocumentSummary";

const Tab = createBottomTabNavigator<ITabParamList>();

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
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="ri-video-line" color={color} size={size} />
          ),
        }}
        name="Videos"
        component={Videos}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="ri-bill-line" color={color} size={size} />
          ),
        }}
        name="Documents"
        component={DocumentSummary}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="ri-user-3-line" color={color} size={size} />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}
