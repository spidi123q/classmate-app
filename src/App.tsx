import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NativeTextInput from "./common/components/NativeTextInput";
import ThemeProvider from "./layouts/ThemeProvider";
import { store, persistor } from "./store/AppStore";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import PrivateRoute from "./layouts/PrivateRoute";
import DashboardRoute from "./layouts/DashboardRoute";
import { RoutePath, UserPages } from "./models/RoutePath";
import NotificationProvider from "./layouts/NotificationProvider";
import ErrorLayout from "./layouts/errorLayout/ErrorLayout";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./layouts/TabsNavigator";
import { JitsiMeetView } from "./common/native/jitsiMeet";
import Profile from "./features/profile/components/Profile";
import Booking from "./features/home/components/Booking";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <NotificationProvider>
            <NavigationContainer>
              <PrivateRoute>
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <Stack.Screen
                    name={RoutePath.Dashboard}
                    component={TabNavigator}
                  />
                  <Stack.Screen
                    name={RoutePath.Error}
                    component={ErrorLayout}
                  />
                  <Stack.Screen
                    name={UserPages.JitsiMeet}
                    component={JitsiMeetView}
                  />
                  <Stack.Screen name={UserPages.Profile} component={Profile} />
                  <Stack.Screen name={UserPages.Booking} component={Booking} />
                </Stack.Navigator>
              </PrivateRoute>
            </NavigationContainer>
          </NotificationProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

const Stack = createStackNavigator();

export default App; //codePush(App);
