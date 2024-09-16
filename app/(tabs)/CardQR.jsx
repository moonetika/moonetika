import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
  const [userData, setUserData] = useState({ name: "", personaIdNumber: "" });

  useEffect(() => {
    setIsLoading(true);
    if (loggedInUser) {
      setIsLoading(false);
    }
    console.log(
      "[card] enter here 29",
      loggedInUser?.profile?.personalIdNumber
    );
    const personalId = loggedInUser?.profile?.personalIdNumber;
    if (personalId && personalId.length >= 0) {
      setIsProfileCompleted(true);
      setUserData({
        name: loggedInUser?.profile?.name,
        personaIdNumber: loggedInUser?.profile?.personalIdNumber,
      });
    }
    return () => {};
  }, []);

  useEffect(() => {
    console.log("[card] 40", loggedInUser);
    if (loggedInUser) {
      setIsLoading(false);
    }
    const personalId = loggedInUser?.profile?.personalIdNumber;
    console.log("enter here 45 personalId", personalId);

    if (personalId && personalId.length >= 0) {
      setIsProfileCompleted(true);
      setUserData({
        name: loggedInUser?.profile?.name,
        personaIdNumber: loggedInUser?.profile?.personalIdNumber,
      });
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
            <Text style={styles.buttonText}>Completar mi perfil</Text>
          </TouchableOpacity>
        </>
      )}
      {isProfileCompleted && (
        <>
          <Text style={styles.title}>Tucan QR {userData.name}</Text>
          <View style={styles.cardContainer}>
            <QRCode
              value={userData.personalIdNumber}
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
  cardContainer: {
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
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    alignSelf: "center",
  },
});

export default CardScreen;
