import {
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  View,
  StyleSheet,
  Platform,
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
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button } from "react-native";
import { Divider, List, TextInput } from "react-native-paper";
import FabExample from "../../src/components/FloatingButton";
``;
export default function HomeScreen(props) {
  const user = getAuth().currentUser;
  const { loggedInUser, setLoggedInUser } = useAuth();
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusPermission, setStatusPermission] = useState(
    "initializing camera"
  );
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Estado: Sin escanear");
  const [enableAddOrder, setEnableAddOrder] = useState(false);

  const [expanded, setExpanded] = useState(true);

  const _handlePress = () => {
    setExpanded(!expanded);
  };

  // useFocusEffect( () => {
  //   console.log('[index 25] usefocus loggedInUser', loggedInUser);
  // });

  useEffect(() => {
    askForCameraPermission();
    return () => {
      if (!loggedInUser) {
        setIsLoading(true);
      } else {
        console.log("[index 30] loggedInUser", loggedInUser?.profile);
      }
    };
  }, []);

  useEffect(() => {
    if (loggedInUser?.profile) {
      setIsProfileCompleted(loggedInUser);
      setIsLoading(false);
    }
    return () => {
      console.log("exiting usseeffect loggedInUser");
    };
  }, [loggedInUser]);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log(status);
      setHasPermission(status === "granted");
    })();
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

  const ProfiledCompletedContent = () => {
    // Request Camera Permission
    useEffect(() => {
      askForCameraPermission();
    }, []);

    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      setText(data);
      console.log("Type: " + type + "\nData: " + data);
    };

    if (hasPermission === null) {
      return (
        <View style={styles.profileCompletedContainer}>
          {isLoading && (
            <View style={[styles.loadingContainer, styles.horizontal]}>
              <ActivityIndicator
                size="large"
                color="white"
                style={styles.container4}
              />
            </View>
          )}
          <Text style={{ color: "white" }}>
            Requesting for camera permission
          </Text>
        </View>
      );
    }
    if (hasPermission === false) {
      return (
        <View style={styles.profileCompletedContainer}>
          <Text style={{ margin: 10, color: "white" }}>
            No access to camera
          </Text>
          <Button
            title={"Allow Camera"}
            onPress={() => askForCameraPermission()}
          />
        </View>
      );
    }

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
