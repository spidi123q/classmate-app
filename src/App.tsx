import React from "react";
import ThemeProvider from "./layouts/ThemeProvider";
import { store, persistor } from "./store/AppStore";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import PrivateRoute from "./layouts/PrivateRoute";
import DashboardRoute from "./layouts/DashboardRoute";
import { IAppStackParamList } from "./models/RoutePath";
import NotificationProvider from "./layouts/NotificationProvider";
import ErrorLayout from "./layouts/errorLayout/ErrorLayout";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./layouts/TabsNavigator";
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
                  <Stack.Screen name="Tabs" component={TabNavigator} />
                  <Stack.Screen name="Dashboard" component={DashboardRoute} />
                  <Stack.Screen name="Error" component={ErrorLayout} />
                </Stack.Navigator>
              </PrivateRoute>
            </NavigationContainer>
          </NotificationProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

const Stack = createStackNavigator<IAppStackParamList>();

export default App; //codePush(App);
