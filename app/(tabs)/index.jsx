import {
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../src/contexts/AuthContext";
import { authentication, db } from "../../src/firebase/config";
import { getAuth, signOut } from "firebase/auth";
import { router, useLocalSearchParams } from "expo-router";
import { Colors } from "../../src/constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { Divider, List, TextInput } from "react-native-paper";
import FabExample from "../../src/components/FloatingButton";
``;
export default function HomeScreen(props) {
  const user = getAuth().currentUser;
  const { loggedInUser, setLoggedInUser } = useAuth();
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (!loggedInUser) {
        setIsLoading(true);
      }
    };
  }, []);

  useEffect(() => {
    if (loggedInUser?.profile) {
      setIsLoading(false);
      if (loggedInUser?.profile?.personalIdNumber) {
        setIsProfileCompleted(loggedInUser);
      }
    }
    return () => {
      console.log("[tabs index]exiting useEffect loggedInUser");
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
      <>
        <View style={styles.titleContainer}>
          <Image
            source={require("../../assets/tucan-group-logo.png")}
            style={styles.logo}
          />
          <View>
            <Text style={styles.title}>
              Bienvenido! {loggedInUser?.profile?.name}
            </Text>
            <Text style={styles.welcome}>
              Estas listo para empezar a usar la app!
            </Text>
          </View>
        </View>
        <View style={styles.profileCompletedContainer}>
          <View style={styles.blockInstruccion}>
            <Text style={styles.title}>Pasos para usar Tucan QR Card</Text>
            <Text style={styles.subtitle}> 1. Completar Perfil</Text>
            <Text style={styles.subtitle}>
              2. Rellenar correctamente y verificar numero de identificacion
            </Text>
            <Text style={styles.subtitle}> 3. Usar TucanQR Card</Text>
          </View>
        </View>
      </>
    );
  };

  const IncompleteProfileContent = () => {
    return (
      <View style={styles.withoutProfileCompletedContainer}>
        <View style={styles.titleContainer}>
          <Image
            source={require("../../assets/tucan-group-logo.png")}
            style={styles.logo}
          />
          <View>
            <Text style={styles.title}>Bienvenido! {user?.email} </Text>
            <Text style={styles.welcome}>
              Tu cuenta ha sido creada exitosamente!
            </Text>
          </View>
        </View>
        <View style={styles.withoutProfileCompletedContainer}>
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
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View style={[styles.loadingContainer, styles.horizontal]}>
          <ActivityIndicator
            size="large"
            color="white"
            style={styles.container4}
          />
        </View>
      )}
      {!isLoading &&
        (isProfileCompleted ? (
          <ProfiledCompletedContent />
        ) : (
          <IncompleteProfileContent />
        ))}

      <Divider />
      <FabExample />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: Colors.palette.primary,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  profileCompletedContainer: {
    flex: 8,
  },
  withoutProfileCompletedContainer: {
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  blockInstruccion: {
    padding: 20,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    color: "white",
    fontSize: 20,
    marginBottom: 20,
  },
  welcome: {
    color: "white",
  },
  packageListTitle: {
    fontSize: 25,
    fontWeight: "600",
  },
  logo: {
    width: 80,
    height: 80,
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

  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  accordion: {
    backgroundColor: Colors.palette.primary,
  },
  accordionItem: {
    backgroundColor: Colors.palette.tertiary,
  },
});
