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
import { TextInput, Card, Button, Divider } from "react-native-paper";
import { View, TouchableOpacity } from "react-native";
import { useAuth } from "../../src/contexts/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../src/firebase/config";
import { router } from "expo-router";

const ProfileScreen = () => {
  const [usuario, setUsuario] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeText = (name, value) => {
    setUsuario({ ...usuario, [name]: value });
  };
  const { loggedInUser } = useAuth();

  const handleCompleteProfile = () => {
    setIsLoading(true);
    const uid = loggedInUser.uid;
    ////console.log("uid", uid);
    if (uid === null) return;

    SetUser(usuario, uid);
  };
  const SetUser = async (data, uid) => {
    try {
      await setDoc(doc(db, "cliente", uid), data);
      // await addDoc(collection(db, "cliente"), data);
      setIsLoading(false);
      router.replace("(tabs)");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      console.log("profile: loggedInUser", loggedInUser);
      let userMerged = { ...loggedInUser.profile, ...usuario };
      console.log("[profile:]", userMerged);
      setUsuario(userMerged);
    }
  }, [loggedInUser]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.subtitle}>Informacion Personal: </Text>
      <Card mode="outlined" style={styles.cardContainer}>
        <Card.Content>
          <Text style={styles.textLabel}> Numero de identificacion: </Text>
          <Text style={styles.textInfo}> {usuario.personalIdNumber} </Text>

          <Text style={styles.textLabel}> Fecha de nacimiento: </Text>
          <Text style={styles.textInfo}> {usuario.birthDate} </Text>

          <Text style={styles.textLabel}> Nacionalidad: </Text>
          <Text style={styles.textInfo}> {usuario.nacionality} </Text>
        </Card.Content>
      </Card>
      <Text style={styles.subtitle}>Informacion de Contacto: </Text>

      <Card mode="outlined" style={styles.cardContainer}>
        <Card.Content>
          <ScrollView>
            <TextInput
              style={styles.input}
              label="Correo electronico:"
              textColor="white"
              value={usuario.email}
              onChangeText={(text) => handleChangeText("email", text)}
              theme={{ colors: { onSurfaceVariant: Colors.palette.secondary } }}
              underlineColor="white"
            />
            <TextInput
              style={styles.input}
              label="Telefono movil:"
              textColor="white"
              value={usuario.mobileNumber}
              onChangeText={(text) => handleChangeText("mobileNumber", text)}
              theme={{ colors: { onSurfaceVariant: Colors.palette.secondary } }}
              underlineColor="white"
            />
            <View style={styles.addressContainer}>
              <View style={styles.addressContainerBasica}>
                <TextInput
                  style={styles.input}
                  label="Calle"
                  textColor="white"
                  value={usuario.streetName}
                  onChangeText={(text) => handleChangeText("streetName", text)}
                  theme={{
                    colors: { onSurfaceVariant: Colors.palette.secondary },
                  }}
                  underlineColor="white"
                />
                <TextInput
                  style={styles.inputAdress}
                  label="Piso"
                  textColor="white"
                  value={usuario.streetFloor}
                  onChangeText={(text) => handleChangeText("streetFloor", text)}
                  theme={{
                    colors: { onSurfaceVariant: Colors.palette.secondary },
                  }}
                  underlineColor="white"
                />

                <TextInput
                  style={styles.inputAdress}
                  label="Puerta"
                  textColor="white"
                  value={usuario.streetDoor}
                  onChangeText={(text) => handleChangeText("streetDoor", text)}
                  theme={{
                    colors: { onSurfaceVariant: Colors.palette.secondary },
                  }}
                  underlineColor="white"
                />
              </View>
              <View style={styles.addressContainerBasica}>
                <TextInput
                  style={styles.inputAdress}
                  label="Provincia"
                  textColor="white"
                  value={usuario.province}
                  onChangeText={(text) => handleChangeText("province", text)}
                  theme={{
                    colors: { onSurfaceVariant: Colors.palette.secondary },
                  }}
                  underlineColor="white"
                />
                <TextInput
                  style={styles.inputAdress}
                  label="Codigo Postal"
                  textColor="white"
                  value={usuario.postalCode}
                  onChangeText={(text) => handleChangeText("postalCode", text)}
                  theme={{
                    colors: { onSurfaceVariant: Colors.palette.secondary },
                  }}
                  underlineColor="white"
                />
              </View>
            </View>
          </ScrollView>
        </Card.Content>
      </Card>

      <TouchableOpacity onPress={handleCompleteProfile} style={styles.button}>
        <Text style={styles.buttonText}>Guardar</Text>
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
  addressFirstRow: {
    flex: 2,
    justifyContent: "space-between",
  },
  addressSecondRow: {
    flex: 8,
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inputAdress: {
    width: "45%",
    height: 55,
    fontSize: 16,
    borderColor: "gray",
    borderWidth: 0.5,
    marginBottom: 16,
    borderRadius: 5,
  },
  cardContainer: {
    borderColor: "white",
  },
  textLabel: {
    fontWeight: "bold",
    color: "white",
  },
  textInfo: {
    color: Colors.palette.tertiary,
  },
  subtitle: {
    color: "lightgray",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
});

export default ProfileScreen;
