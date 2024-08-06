import {
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  View,
  StyleSheet,
  Platform,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../src/contexts/AuthContext";
import { authentication, db } from "../../src/firebase/config";
import { getAuth, signOut } from "firebase/auth";
import { router, useLocalSearchParams } from "expo-router";
import { Colors } from "../../src/constants/Colors";
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen(props) {
  const user = getAuth().currentUser;
  const { loggedInUser, setLoggedInUser } = useAuth();
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useFocusEffect( () => {
  //   console.log('[index 25] usefocus loggedInUser', loggedInUser);
  // });

  useEffect(() => {
    return () => {
      console.log('[index 30] loggedInUser', loggedInUser?.profile)
      if (!loggedInUser) {
        setIsLoading(true);
      } else {

      }
    };
  }, []);
  
  useEffect(() => {
    console.log("[index] 41", loggedInUser);
    if (loggedInUser?.profile) {
      setIsProfileCompleted(loggedInUser);
      setIsLoading(false);
    }
    return () => {
      console.log('exiting');
    };
  }, [loggedInUser]);

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

  const ProfiledCompletedContent = () => {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Bienvenido! {loggedInUser?.profile?.name}
        </Text>
        <Text style={styles.welcome}>
          Estas listo para empezar a usar la app!
        </Text>

        <TouchableOpacity onPress={signOutUser} style={styles.button}>
          <Text style={styles.signOutText}>Salir de Session</Text>
        </TouchableOpacity>
        {/* <Portal>
          <FAB.Group
            open={open}
            visible
            icon={open ? "plus" : "calendar-today"}
            actions={[
              { icon: "plus", onPress: () => ////console.log("Pressed add") },
              {
                icon: "star",
                label: "Star",
                onPress: () => ////console.log("Pressed star"),
              },
              {
                icon: "email",
                label: "Email",
                onPress: () => ////console.log("Pressed email"),
              },
              {
                icon: "bell",
                label: "Remind",
                onPress: () => ////console.log("Pressed notifications"),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal> */}
      </SafeAreaView>
    );
  };

  const IncompleteProfileContent = () => {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Bienvenido! {user?.email} </Text>
        <Text style={styles.welcome}>
          Tu cuenta ha sido creada exitosamente!
        </Text>
        <Text style={styles.welcome}>Porfavor completa tu perfil!</Text>
        <TouchableOpacity
          onPress={() => router.push("screens/PerfilUpdateScreen")}
          style={styles.button}
        >
          <Text style={styles.signOutText}>Completar mi perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={signOutUser} style={styles.button}>
          <Text style={styles.signOutText}>Salir de Session</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

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
      {!isLoading &&
        (isProfileCompleted ? (
          <ProfiledCompletedContent />
        ) : (
          <IncompleteProfileContent />
        ))}
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    color: "white",
  },
  welcome: {
    color: "white",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  button: {
    backgroundColor: Colors.palette.secondary,
    borderRadius: 20,
    padding: 10,
    margin: 14,
    width: "78%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  signOutText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    alignSelf: "center",
  },
  input: {
    width: "70%",
    height: 50,
    fontSize: 17,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    color: "white",
    placeholderTextColor: "white",
    borderRadius: 10,
  },
  bottom: {
    backgroundColor: "aquamarine",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  fab: {
    position: "absolute",
    right: 16,
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
