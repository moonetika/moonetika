import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { authentication, db } from "../src/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Colors } from "../src/constants/Colors";
import { useAuth } from "../src/contexts/AuthContext";
import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { TextInput } from "react-native-paper";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const { loggedInUser, setLoggedInUser } = useAuth();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryRepeat, setSecureTextEntryRepeat] = useState(true);


  const CheckUserProfileCompleted = async () => {
    try {
      const user = authentication.currentUser;
      console.log("[singup] here");
      console.log("[singup] user", user);
      console.log("[singup] loggedInUser", loggedInUser);
      const docRef = doc(db, "cliente", user.uid);
      const docSnap = await getDoc(docRef);
      const exists = docSnap.exists();
      console.log("[singup] exists", exists);
      //agregar logica para ver si el usuario commpleto su perfil correctamente
      if (exists) {
        const userProfile = docSnap.data();
        console.log('[singup] userProfile', userProfile)
        setLoggedInUser({...loggedInUser, userProfile});
      }
      setIsLoading(false);
    } catch (error) {
      console.log("[singup] " + error);
    }
  };
  const handleSignUp = () => {
    setIsLoading(true);
    createUserWithEmailAndPassword(authentication, email, password)
      .then((res) => {

        console.log('[signup]',  res.user);
        setLoggedInUser(res.user);
        CheckUserProfileCompleted();
        router.push("(tabs)");
      })
      .catch((re) => {
        console.log('[signup]' +re);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su correo electronico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        label="Correo electronico"
        placeholderTextColor="gray"
        textColor="white"
        theme={{ colors: { onSurfaceVariant: Colors.palette.secondary } }}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese su clave"
        secureTextEntry={secureTextEntry}
        value={password}
        label="Contraseña"
        placeholderTextColor="gray"
        textColor="white"
        theme={{ colors: { onSurfaceVariant: Colors.palette.secondary } }}
        onChangeText={(text) => setPassword(text)}
        right={
          <TextInput.Icon
            icon="eye"
            color="white"
            onPress={() => {
              setSecureTextEntry(!secureTextEntry);
              return false;
            }}
          />
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        secureTextEntry={secureTextEntryRepeat}
        value={confirmPassword}
        placeholderTextColor="gray"
        label="Confirmar contraseña"
        textColor="white"
        theme={{ colors: { onSurfaceVariant: Colors.palette.secondary } }}
        onChangeText={(text) => setConfirmPassword(text)}
        right={
          <TextInput.Icon
            icon="eye"
            color="white"
            onPress={() => {
              setSecureTextEntryRepeat(!secureTextEntryRepeat);
              return false;
            }}
          />
        }
      />
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Registrarse</Text>
        {isLoading && (
          <ActivityIndicator
            size="small"
            color="white"
            style={{
              alignSelf: "center",
              justifyContent: "center",
              paddingLeft: 10,
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: Colors.palette.primary //verde oscuro
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white"
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    fontSize: 17,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingLeft: 8,
    color: "white",
    placeholderTextColor: "lightgray",
    borderRadius: 10
  },
  button: {
    backgroundColor: Colors.palette.secondary,   //naranja
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SignUpScreen;
