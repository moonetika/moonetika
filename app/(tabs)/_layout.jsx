import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "../../src/components/TabBarIcon";
import { Colors } from "../../src/constants/Colors";
import { useColorScheme } from "../../src/hooks/useColorScheme";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { router } from "expo-router";
import { useAuth } from "../../src/contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { authentication, db } from "../../src/firebase/config";
import { useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import {
  Button,
  Divider,
  IconButton,
  Menu,
  Provider,
} from "react-native-paper";
import { signOut } from "firebase/auth";
import FloatingWhatsAppButton from "../../src/components/WhatsappButton";
import WhatsAppButton from "../../src/components/WhatsappButton";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);
  const { loggedInUser, setLoggedInUser } = useAuth();

  //onInit
  useEffect(() => {
    setIsLoading(true);
  }, []);

  //watcher: loggedInUser
  useEffect(() => {
    if (loggedInUser) {
      setIsLoading(false);
    }
  }, [loggedInUser]);

  const GetUserProfile = async (user) => {
    try {
      const docRef = doc(db, "cliente", user.uid);
      const docSnap = await getDoc(docRef);
      const exists = docSnap.exists();
      let userData = null;
      if (exists) {
        setIsProfileCompleted(true);
        userData = docSnap.data();
      }
      setLoggedInUser({ ...user, profile: userData });
    } catch (error) {
      console.log("[tabs] " + error);
    }
  };

  const signOutUser = () => {
    signOut(authentication)
      .then((res) => {
        console.log("[index] logout" + res);
        setLoggedInUser(null);
      })
      .catch((err) => {
        console.log("[index] logout" + err);
      });
  };

  const BackButton = () => {
    return (
      <SafeAreaView>
        <TouchableOpacity
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            paddingLeft: 10,
          }}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.push("(tabs)");
            }
          }}
        >
          <TabBarIcon name="chevron-back" color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  const ProfileButton = () => {
    return (
      <SafeAreaView style={{flexDirection: 'row-reverse', justifyContent:  "flex-end"}}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            paddingHorizontal: 10,
          }}
          onPress={() => {
            router.push("screens/ProfileDuplicated");
          }}
        >
          <TabBarIcon name="person-circle" color="white" />
        </TouchableOpacity>
        {/* <WhatsAppButton /> */}
      </SafeAreaView>
    );
  };

  getAuth().onAuthStateChanged((user) => {
    if (!loggedInUser) {
      GetUserProfile(user);
    }
    if (!user) {
      router.replace("/WelcomeScreen");
    }
  });

  return (
    <>
      {isLoading && (
        <View style={[styles.container2, styles.horizontal]}>
          <ActivityIndicator
            size="large"
            color="white"
            style={styles.container}
          />
        </View>
      )}
      {!isLoading && (
        <>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
              headerShown: true,
              headerStyle: {
                backgroundColor: Colors.palette.primary,
                borderBottomColor: Colors.palette.tertiary,
              },
              headerTintColor: "white",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerLeft: () => <BackButton />,
              headerRight: () => <ProfileButton />,
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Inicio",
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon
                    name={focused ? "home" : "home-outline"}
                    color={color}
                  />
                ),
              }}
            />

            <Tabs.Screen
              name="CardQR"
              options={{
                title: "Card",
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon
                    name={focused ? "qr-code" : "qr-code-outline"}
                    color={color}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="Tracking"
              options={{
                title: "Envios",
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon
                    name={focused ? "reader" : "reader-outline"}
                    color={color}
                  />
                ),
              }}
            />

            <Tabs.Screen
              name="Appointment"
              options={{
                title: "Citas",
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon
                    name={focused ? "calendar" : "calendar-outline"}
                    color={color}
                  />
                ),
                // href: isProfileCompleted ? "Profile" : null,
              }}
            />
          </Tabs>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.palette.primary,
  },
  container2: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
