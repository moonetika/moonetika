import { Screen } from "expo-router/build/views/Screen";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { router } from "expo-router";
import { Colors } from "../src/constants/Colors";

const WelcomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bienvenido a TucanCard</Text>
      <Image
        source={require("../assets/tucan-group-logo.png")}
        style={styles.logo}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/LoginScreen");
        }}
      >
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/SignUpScreen");
        }}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.palette.primary,
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.palette.secondary,
    width: "90%",
    paddingVertical: 15,
    marginHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default WelcomeScreen;
