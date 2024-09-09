import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../src/constants/Colors";
import { useAuth } from "../../src/contexts/AuthContext";
import { useEffect, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import { router, useFocusEffect } from "expo-router";

const CardScreen = () => {
  const { loggedInUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (loggedInUser) {
      setIsLoading(false);
    }
    console.log("[card] enter here 29", loggedInUser?.profile?.personalIdNumber);
    if (loggedInUser?.profile?.personalIdNumber.length >= 0) {
      setIsProfileCompleted(true);
    }
    return () => {};
  }, []);

  useEffect(() => {
    console.log("[card]", loggedInUser);
    if (loggedInUser) {
      setIsLoading(false);
    }
    console.log("enter here 39", loggedInUser?.profile?.personalIdNumber);

    if (loggedInUser?.profile?.personalIdNumber.length >= 0) {
      setIsProfileCompleted(true);
    }
    return () => {};
  }, [loggedInUser]);

  return (
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="white"
          style={styles.container}
        />
      )}

      {!isLoading && !isProfileCompleted && (
        <>
          <View style={styles.blockInstruccion}>
            <Text style={styles.title}>Pasos para usar Tucan QR Card</Text>
            <Text style={styles.subtitle}> 1. Completar Perfil</Text>
            <Text style={styles.subtitle}>
              2. Rellenar correctamente y verificar numero de identificacion
            </Text>
            <Text style={styles.subtitle}> 3. Usar TucanQR Card</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("screens/PerfilUpdateScreen")}
            style={styles.button}
          >
            <Text style={styles.signOutText}>Completar mi perfil</Text>
          </TouchableOpacity>
        </>
      )}
      {isProfileCompleted && (
        <>
          <Text style={styles.title}>
            Tucan QR {loggedInUser?.profile?.name}
          </Text>
          <View style={styles.qrcontainer}>
            <QRCode
              value={loggedInUser?.profile?.personalIdNumber}
              size={200}
              logo={require("../../assets/tucan-group-logo.png")}
              logoBackgroundColor={Colors.palette.primary}
              quietZone={20}
              backgroundColor="white"
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.palette.primary,
  },
  qrcontainer: {
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 35,
    marginBottom: 20,
  },
  subtitle: {
    color: "white",
    fontSize: 20,
    marginBottom: 20,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
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
});

export default CardScreen;
