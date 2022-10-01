import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../features/profile/components/Profile";
import Videos from "../features/videos/components/Videos";
import { HomePages } from "../models/RoutePath";
import Icon from "react-native-remix-icon";
import { DefaultPrimaryColor } from "../common/config/themeConfig";
import { AppTheme } from "../common/config/custom-theme";

const Tab = createBottomTabNavigator();


export function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: DefaultPrimaryColor,
        tabBarInactiveTintColor: AppTheme["color-grey2"],
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="ri-home-5-line" color={color} size={size} />
          ),
        }}
        name={HomePages.Home}
        component={Videos}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="ri-video-line" color={color} size={size} />
          ),
        }}
        name={HomePages.Videos}
        component={Profile}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="ri-bill-line" color={color} size={size} />
          ),
        }}
        name={HomePages.Documents}
        component={Profile}
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
