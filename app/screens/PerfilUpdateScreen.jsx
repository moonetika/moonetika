import { useState } from "react";
import { ScrollView } from "react-native";

import {
  View,
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
import { Divider, ProgressBar, TextInput } from "react-native-paper";

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

  const [step, setStep] = useState(1); // Track the current step
  const [progress, setProgress] = useState(0.33); // Track progress bar

  const handleChangeText = (name, value) => {
    setUsuario({ ...usuario, [name]: value });
  };

  const nextStep = () => {
    setStep(step + 1);
    setProgress(progress + 0.33);
  };

  const prevStep = () => {
    setStep(step - 1);
    setProgress(progress - 0.33);
  };

  const handleSubmit = () => {
    // Submit form logic (e.g., saving data)
    console.log("Profile Submitted");
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
      router.replace("(tabs)");
    } catch (error) {
      ////console.log(error);
    }
  };
  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <>
            <Text style={styles.subtitle}>Informacion Personal: </Text>

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
              onChangeText={(text) =>
                handleChangeText("personalIdNumber", text)
              }
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
          </>
        );
      case 2:
        return (
          <>
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
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.subtitle}>Informacion Personal: </Text>
            <View style={styles.addressFirstRow}>
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
            </View>
            <View style={styles.addressSecondRow}>
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
          </>
        );
      default:
        return null;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Completar perfil:</Text>
        <Text style={styles.buttonText}> Paso {step} de 3</Text>
        <ProgressBar
          progress={progress}
          style={styles.progress}
          color={Colors.palette.tertiary}
        />
      </View>

      {/* <View style={styles.progressContainer}>
      </View> */}
      <View style={styles.mainContainer}>{renderStepContent(step)}</View>

      <View style={styles.buttonContainer}>
        {step > 1 && (
          <TouchableOpacity onPress={prevStep} style={styles.button}>
            <Text style={styles.buttonText}>Atras</Text>
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
        )}

        {step < 3 && (
          <TouchableOpacity onPress={nextStep} style={styles.button}>
            <Text style={styles.buttonText}>Siguiente</Text>
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
        )}

        {step === 3 && (
          <TouchableOpacity
            onPress={handleCompleteProfile}
            style={styles.button}
          >
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
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 10,
    backgroundColor: Colors.palette.primary,
    justifyContent: "center",
  },
  profileContainer: {
    flex: 2,
    marginHorizontal: 20,
  },
  mainContainer: {
    marginHorizontal: 20,
    flex: 8,
    justifyContent: "flex-start",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 20,
    gap: 10,
  },
  progressContainer: {
    flex: 2,
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
    alignSelf: "stretch",
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
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: "50%",
    // alignSelf: "stretch"
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  progress: {
    marginBottom: 20,
    height: 8,
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
});

export default PerfilUpdateScreen;
