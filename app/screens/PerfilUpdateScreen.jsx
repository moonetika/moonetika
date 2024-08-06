import { useState } from "react";
import { ScrollView } from "react-native";

import {
  View,
  // TextInput,
  Button,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Text,
} from "react-native";
import { Colors } from "../../src/constants/Colors";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db, authentication } from "../../src/firebase/config";
import { TextInput } from "react-native-paper";

const PerfilUpdateScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [usuario, setUsuario] = useState({
    name: "",
    lastname: "",
    email: "",
    birthDate: "",
    personalIdNumber: "",
    nacionality: "",
    email: "",
    mobileNumber: "",
    address: "",
    codigopostal: "",
  });

  const handleChangeText = (name, value) => {
    setUsuario({ ...usuario, [name]: value });
  };

  const handleCompleteProfile = () => {
    setIsLoading(true);
    ////console.log("here");
    ////console.log(usuario);
    const uid = authentication.currentUser.uid;
    ////console.log("uid", uid);
    if (uid === null) return;

    AddUser(usuario, uid);
  };

  const AddUser = async (data, uid) => {
    try {
      await setDoc(doc(db, "cliente", uid), data);
      // await addDoc(collection(db, "cliente"), data);
      setIsLoading(false);
      router.replace('(tabs)');
    } catch (error) {
      ////console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <Text style={styles.title}>Completar perfil: </Text>
        <View>
          <Text style={styles.subtitle}> Informacion personal:</Text>
          {/* <TextInput
            style={styles.input}
            mode="flat"
            label="Nombres"
            placeholder="Ingrese sus nombres"
            placeholderTextColor="gray"
            textColor="white" // basic color of text
            // selectionColor="white"
            // cursorColor="white"
            // underlineColor="white" // label color on active
            activeUnderlineColor={Colors.palette.secondary} // label color on active
            // outlineColor="white"
            // activeOutlineColor="white"
            value={usuario.name}
            onChangeText={(text) => handleChangeText("name", text)}
            theme={{
              colors: { onSurfaceVariant: "white", inverseOnSurface: "black" },
            }}
          /> */}
          <TextInput
            style={styles.input}
            label="Nombres"
            textColor="white"
            value={usuario.name}
            onChangeText={(text) => handleChangeText("name", text)}
            theme={{
              colors: {
                onSurfaceVariant: Colors.palette.secondary,
                onSurfaceDisabled: Colors.palette.tertiary,
              },
            }}
            underlineColor="black"
          />

          <TextInput
            style={styles.input}
            label="Apellidos"
            textColor="white"
            value={usuario.lastname}
            onChangeText={(text) => handleChangeText("lastname", text)}
            theme={{
              colors: {
                onSurfaceVariant: Colors.palette.secondary,
                onSurfaceDisabled: Colors.palette.tertiary,
              },
            }}
            underlineColor="black"
          />

          <TextInput
            style={styles.input}
            label="Fecha de nacimiento"
            textColor="white"
            value={usuario.birthDate}
            onChangeText={(text) => handleChangeText("birthDate", text)}
            theme={{
              colors: {
                onSurfaceVariant: Colors.palette.secondary,
                onSurfaceDisabled: Colors.palette.tertiary,
              },
            }}
            underlineColor="black"
          />

          <TextInput
            style={styles.input}
            label="DNI/NIE/Pasaporte"
            textColor="white"
            value={usuario.personalIdNumber}
            onChangeText={(text) => handleChangeText("personalIdNumber", text)}
            theme={{
              colors: {
                onSurfaceVariant: Colors.palette.secondary,
                onSurfaceDisabled: Colors.palette.tertiary,
              },
            }}
            underlineColor="black"
          />

          <TextInput
            style={styles.input}
            label="Nacionalidad"
            textColor="white"
            value={usuario.nacionality}
            onChangeText={(text) => handleChangeText("nacionality", text)}
            theme={{
              colors: {
                onSurfaceVariant: Colors.palette.secondary,
                onSurfaceDisabled: Colors.palette.tertiary,
              },
            }}
            underlineColor="black"
          />

          <Text style={styles.subtitle}>Informacion de Contacto: </Text>

          <TextInput
            style={styles.input}
            label="Correo electronico:"
            textColor="white"
            value={usuario.email}
            onChangeText={(text) => handleChangeText("email", text)}
            theme={{ colors: { onSurfaceVariant: Colors.palette.secondary } }}
            underlineColor="black"
          />
          <TextInput
            style={styles.input}
            label="Telefono movil:"
            textColor="white"
            value={usuario.mobileNumber}
            onChangeText={(text) => handleChangeText("mobileNumber", text)}
            theme={{ colors: { onSurfaceVariant: Colors.palette.secondary } }}
            underlineColor="black"
          />
          <Text style={styles.subtitle}>Direccion: </Text>
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
                underlineColor="black"
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
                underlineColor="black"
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
                underlineColor="black"
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
                underlineColor="black"
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
                underlineColor="black"
              />
            </View>
          </View>
        </View>

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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 10,
    backgroundColor: Colors.palette.primary,
    // backgroundColor: 'white',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  scrollViewContainer: {
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
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
    // backgroundColor: 'gray'
    // color: "white",
    // placeholderTextColor: "white",
    borderRadius: 5,
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
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "left",
    color: Colors.palette.secondary,
    fontWeight: "bold",
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

export default PerfilUpdateScreen;
