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
import { Button, Divider, Menu, Provider } from "react-native-paper";
import { signOut } from "firebase/auth";



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

  const ThreeDotsButton = () => {
    return (
      <SafeAreaView>
        <TouchableOpacity
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.push("(tabs)");
            }
          }}
        >
          <TabBarIcon name="ellipsis-vertical" color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  const OptionsMenu = () => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
    return (
      <Provider>
        <SafeAreaView>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchorPosition="bottom"
            anchor={
              <TouchableOpacity
                onPress={openMenu}
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <TabBarIcon name="ellipsis-vertical" color="white" />
              </TouchableOpacity>
            }
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              top: 40,
              left: -110,
              position: "absolute",
              zIndex: 100,
            }}
          >
            <Menu.Item
              onPress={() => {
                router.push("screens/Profile");
              }}
              title="Mi Perfil"
            >
              <TabBarIcon name="person" color="black" />
            </Menu.Item>
            <Menu.Item onPress={() => {}} title="Ayuda" />
            <Divider />
            <Menu.Item
              onPress={signOutUser}
              title="Salir sesion"
            />
          </Menu>
        </SafeAreaView>
      </Provider>
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
            headerRight: () => <OptionsMenu />,
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
              title: "Seguimiento",
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
