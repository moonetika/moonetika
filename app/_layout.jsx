import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
// import { DefaultTheme, PaperProvider } from 'react-native-paper';

import { Stack } from "expo-router";
// import { TabBarIcon } from '../../components/TabBarIcon';
// import { Colors } from '../../constants/Colors';
import { useColorScheme } from "../src/hooks/useColorScheme";
import { AuthProvider, useAuth } from "./../src/contexts/AuthContext";
import { Colors } from "../src/constants/Colors";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  ////console.log("[root] component", colorScheme);
  const { loggedInUser } = useAuth();
  ////console.log("[root] component loggedInUser", loggedInUser);
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.palette.secondary,
      secondary: Colors.palette.tertiary,
    },
  };

  useEffect(() => {
    ////console.log("[root 32] loggedInUser", loggedInUser);
  }, [loggedInUser]);

  const AppContent = () => {
    return (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          // initialRouteName="WelcomeScreen"
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.palette.secondary,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
          <Stack.Screen
            name="WelcomeScreen"
            options={{ headerShown: true, title: "TucanCard" }}
          />
          <Stack.Screen
            name="SignUpScreen"
            options={{ presentation: "modal" }}
          />
          <Stack.Screen
            name="screens/PerfilUpdateScreen"
            options={{ presentation: "modal", headerShown: false }}
          />
        </Stack>
      </ThemeProvider>
    );
  };

  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <AppContent />
      </PaperProvider>
    </AuthProvider>
  );
}
