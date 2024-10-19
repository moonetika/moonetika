import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import GuestStack from "./src/navigation/GuestStack";
import AppStack from "./src/navigation/AppStack";
import { View } from "react-native-web";

// const AppContent = () => {
//   const { loggedInUser } = useAuth();
//   return (
//     <NavigationContainer>
//       {loggedInUser ? <AppStack /> : <GuestStack />}
//       <StatusBar style="auto" />
//     </NavigationContainer>
//   );
// };

// export default function App() {
//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   );
// }
