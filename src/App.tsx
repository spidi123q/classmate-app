import React from "react";
import ThemeProvider from "./layouts/ThemeProvider";
import { store, persistor } from "./store/AppStore";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import PrivateRoute from "./layouts/PrivateRoute";
import DashboardRoute from "./layouts/DashboardRoute";
import { HomePages, IRootStackParamList, RoutePath } from "./models/RoutePath";
import NotificationProvider from "./layouts/NotificationProvider";
import ErrorLayout from "./layouts/errorLayout/ErrorLayout";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { JitsiMeetView } from "./common/native/jitsiMeet";
import PdfViewer from "./common/components/pdfViewer";
import { VideoDetails } from "./features/videos/components/VideoDetails";
import { DocumentByCategory } from "./features/documents/components/DocumentByCategory";
import { DefaultFontColor, FontFamily } from "./common/config/themeConfig";

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
                  initialRouteName="Dashboard"
                >
                  <Stack.Screen name="Dashboard" component={DashboardRoute} />
                  <Stack.Screen name="Error" component={ErrorLayout as any} />
                  <Stack.Screen name="Video Details" component={VideoDetails} />
                  <Stack.Screen name="Live" component={JitsiMeetView} />
                  <Stack.Screen name="Pdf Viewer" component={PdfViewer} />
                  <Stack.Screen
                    name="View Documents"
                    component={DocumentByCategory}
                    options={{
                      headerShown: true,
                      headerShadowVisible: false,
                      headerTitleStyle: {
                        fontFamily: FontFamily.regular,
                        fontWeight: "700",
                        color: DefaultFontColor,
                      },
                      headerBackTitleVisible: false,
                      headerTintColor: DefaultFontColor,
                    }}
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

const Stack = createNativeStackNavigator<IRootStackParamList>();

export default App; //codePush(App);
