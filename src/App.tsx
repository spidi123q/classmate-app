import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NativeTextInput from "./common/components/NativeTextInput";
import ThemeProvider from "./layouts/ThemeProvider";
import { store, persistor } from "./store/AppStore";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import PrivateRoute from "./layouts/PrivateRoute";
import DashboardRoute from "./layouts/DashboardRoute";
import { HomePages, RoutePath, TabPages } from "./models/RoutePath";
import NotificationProvider from "./layouts/NotificationProvider";
import ErrorLayout from "./layouts/errorLayout/ErrorLayout";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <NotificationProvider>
            <NavigationContainer>
              <PrivateRoute>
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false,
                  }}
                  initialRouteName={RoutePath.Dashboard}
                >
                  <Stack.Screen
                    name={RoutePath.Dashboard}
                    component={DashboardRoute}
                  />
                  <Stack.Screen
                    name={RoutePath.Error}
                    component={ErrorLayout}
                  />
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
