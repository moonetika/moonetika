import { useEffect, useState } from "react";
import { Colors } from "../../src/constants/Colors";
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { Divider, TextInput } from "react-native-paper";
import { View, TouchableOpacity } from "react-native";
import { useAuth } from "../../src/contexts/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { authentication, db } from "../../src/firebase/config";
import { router } from "expo-router";
import { signOut } from "firebase/auth";

const StageScreen = () => {
  const [usuario, setUsuario] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { loggedInUser, setLoggedInUser } = useAuth();

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

  const handleLogOut = () => {
    signOutUser();
  };
  const handleEditProfile = () => {
    router.push("screens/Profile");
  };

  useEffect(() => {
    if (loggedInUser) {
      // console.log("stage: loggedInUser", loggedInUser);
      let userMerged = { ...loggedInUser.profile, ...usuario };
      // console.log("[stage:]", userMerged);
      setUsuario(userMerged);
    }
  }, [loggedInUser]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* <Text style={styles.title}>Perfil de usuario </Text> */}
        <Divider />
        <Text style={styles.subtitle}>Informacion Personal: </Text>
        <Text> Nombre y Apellido: </Text>
        <Text>
          {" "}
          {usuario.name} {usuario.lastname}{" "}
        </Text>

        <Text> Fecha de nacimiento: </Text>
        <Text> {usuario.birthDate} </Text>

        <Text> Numero de identificacion: </Text>
        <Text> {usuario.personalIdNumber} </Text>

        <Text> Nacionalidad: </Text>
        <Text> {usuario.nacionality} </Text>

        <Text style={styles.subtitle}>Informacion de Contacto: </Text>

        <Text> Correo Electronico: </Text>
        <Text> {usuario.email} </Text>

        <Text> Telefono/Movil: </Text>
        <Text> {usuario.mobileNumber} </Text>

        <Text> Direccion: </Text>
        <Text>
          {" "}
          {usuario.streetName} {usuario.streetFloor} - {usuario.streetDoor},{" "}
          {usuario.postalCode} {usuario.province}
        </Text>

        <TouchableOpacity onPress={handleEditProfile} style={styles.button}>
          <Text style={styles.buttonText}>Editar Perfil</Text>
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

        <TouchableOpacity onPress={handleLogOut} style={styles.button}>
          <Text style={styles.buttonText}>Salir de session</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: Colors.palette.primary,
    paddingLeft: 30,
    paddingRight: 30,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  scrollViewContainer: {
    justifyContent: "center",
  },
  addressContainerBasica: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  addressContainerExtension: {
    flex: 1,
    justifyContent: "space-between",
  },
  input: {
    width: "100%",
    height: 55,
    fontSize: 18,
    borderColor: "gray",
    borderWidth: 0.5,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
  },

  inputAdress: {
    width: "45%",
    height: 55,
    fontSize: 16,
    borderColor: "gray",
    borderWidth: 0.5,
    marginBottom: 16,
    marginLeft: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  subtitle: {
    color: "white",
    fontWeight: "condensedBold",
    fontSize: 15,
    marginBottom: 8,
    alignSelf: "flex-start",
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
  webview: {
    flex: 1,
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
});

export default StageScreen;
