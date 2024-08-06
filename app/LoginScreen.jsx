import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { authentication, db } from "../src/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
import { Colors } from "../src/constants/Colors";

import { useAuth } from "../src/contexts/AuthContext";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";



const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  const inputRef = React.useRef();
  const passwordRef = React.useRef();

  const [isLoading, setIsLoading] = useState(false);


  const { loggedInUser, setLoggedInUser } = useAuth();

  const CheckUserProfileCompleted = async () => {
    try {
      const user = authentication.currentUser;
      ////console.log("[login] here");
      ////console.log("[login] user", user);
      ////console.log("[login] loggedInUser", loggedInUser);
      const docRef = doc(db, "cliente", user.uid);
      const docSnap = await getDoc(docRef);
      const exists = docSnap.exists();
      ////console.log("[login] exists", exists);
      //agregar logica para ver si el usuario commpleto su perfil correctamente
      if (exists) {
        const userProfile = docSnap.data();
        ////console.log('[login] userProfile', userProfile)
        setLoggedInUser({...loggedInUser, userProfile});
      }
      setIsLoading(false);
    } catch (error) {
      ////console.log("[login] " + error);
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);

    signInWithEmailAndPassword(authentication, email, password)
      .then((res) => {
        ////console.log("[login] successful");
        // setLoggedInUser(res.user);
        // CheckUserProfileCompleted();
        router.push("(tabs)");
      })

      .catch((err) => {
        ////console.log("[login] " + err);
        setError("Incorrect Email/Password");
      })

      .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido!</Text>
      <Image
        source={require("../assets/tucan-group-logo.png")}
        style={styles.logo}
      />

      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Ingrese su correo electronico"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#003f5c"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />

      <TextInput
        ref={passwordRef}
        style={styles.input}
        placeholder="Ingrese su clave"
        placeholderTextColor="#003f5c"
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.loginText}>Iniciar</Text>
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
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text style={styles.downText}>Aun no tienes cuenta?</Text>
        <TouchableOpacity onPress={() => router.push("/SignUpScreen")}>
          <Text style={styles.signup}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
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
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    fontSize: 17,
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    color: "white",
    placeholderTextColor: "lightgray",
    borderRadius: 20,
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
  loginText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    alignSelf: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "white",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  downText: {
    color: Colors.palette.tertiary,
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
  },
  signup: {
    alignSelf: "flex-start",
    textDecorationLine: "underline",
    color: Colors.palette.tertiary,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 5,
    marginTop: 10,
  },
});

export default LoginScreen;
