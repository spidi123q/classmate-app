import React from "react";
import ThemeProvider from "./layouts/ThemeProvider";
import { store, persistor } from "./store/AppStore";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import PrivateRoute from "./layouts/PrivateRoute";
import DashboardRoute from "./layouts/DashboardRoute";
import { RoutePath } from "./models/RoutePath";
import NotificationProvider from "./layouts/NotificationProvider";
import ErrorLayout from "./layouts/errorLayout/ErrorLayout";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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

const Stack = createNativeStackNavigator();

export default App; //codePush(App);
