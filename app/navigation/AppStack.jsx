import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Link, Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "../../src/hooks/useColorScheme";
import { View } from "react-native";

// const Stack = createNativeStackNavigator();

const AppStack = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
      </Stack>
    </ThemeProvider>
  );
};

export default AppStack;
