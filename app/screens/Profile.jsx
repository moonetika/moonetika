import { useEffect, useState } from "react";
import { Colors } from "../../src/constants/Colors";
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Image,
} from "react-native";
import {
  TextInput,
  Card,
  Divider,
  Avatar,
  IconButton,
  Title,
} from "react-native-paper";
import { View, TouchableOpacity } from "react-native";
import { useAuth } from "../../src/contexts/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { authentication, db, storage } from "../../src/firebase/config";
import { router } from "expo-router";
import { Pressable } from "react-native";
import ButtonComponent from "../../src/components/ButtonComponent";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const ProfileScreen = () => {
  const [usuario, setUsuario] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const { loggedInUser, setLoggedInUser } = useAuth();
  const [isAvatarImageLoaded, setIsAvatarImageLoaded] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleChangeText = (name, value) => {
    setUsuario({ ...usuario, [name]: value });
  };

  const handleCompleteProfile = () => {
    setIsLoading(true);
    const uid = loggedInUser.uid;
    ////console.log("uid", uid);
    if (uid === null) return;

    UpdateUserInfo(usuario, uid);
    let userMerged = { ...loggedInUser.profile, ...usuario };
    loggedInUser.profile = userMerged;
    setLoggedInUser(loggedInUser);

    router.replace("(tabs)");
  };

  const UpdateUserInfo = async (data, uid) => {
    try {
      console.log("datatosaved", data);
      await setDoc(doc(db, "cliente", uid), data);
      // await addDoc(collection(db, "cliente"), data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      console.log("profile: loggedInUser", loggedInUser);
      let userMerged = { ...loggedInUser.profile, ...usuario };
      console.log("[profile:]", userMerged);
      setUsuario(userMerged);

      if (userMerged?.pictureFileName) {
        console.log(
          "filename",
          `${FileSystem.documentDirectory}${userMerged?.pictureFileName}`
        );
        setAvatar(
          `${FileSystem.documentDirectory}${userMerged?.pictureFileName}`
        );
      }
    }
  }, [loggedInUser]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      console.log("Keyboard Shown");
      // setKeyboardStatus("Keyboard Shown");
      setIsKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      // setKeyboardStatus("Keyboard Hidden");
      console.log("Keyboard Hidden");
      setIsKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const pickImage = async () => {
    // Ask for permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permissions to make this work!"
      );
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0]; // Get image URI
      const savedUri = await saveImageToFileSystem(uri); // Save the image locally
      console.log(savedUri, "savedUri");
      setAvatar(savedUri); // Set the new av6atar
    }
    // if (!result.canceled) {
    //   const { uri } = result.assets[0]; // Get image URI
    //   await uploadImageToFirebase(uri); // Upload image to Firebase
    // }
  };

  const saveImageToFileSystem = async (uri) => {
    try {
      setUploading(true);
      const fileName = uri.split("/").pop(); // Extract the file name
      const localUri = `${FileSystem.documentDirectory}${fileName}`; // Define local path
      await FileSystem.copyAsync({
        from: uri,
        to: localUri,
      });
      handleChangeText("pictureFileName", fileName);
      return localUri; // Return the local path to the image
    } catch (error) {
      console.error("Error saving image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "height" : "padding"}
      behavior="padding"
      style={styles.container}
      // keyboardVerticalOffset={10}
      keyboardVerticalOffset={Platform.OS === "ios" ? 150 : 0}
      enabled
    >
      <SafeAreaView style={styles.innerContainer}>
        <ScrollView
          keyboardShouldPersistTaps="never"
          // keyboardDismissMode="interactive"
        >
          <Card mode="outlined" style={styles.cardContainer}>
            <View style={{ ...styles.profileHeader, flexDirection: "row" }}>
              <View
                style={{
                  flex: 4,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {avatar ? (
                  <Image source={{ uri: avatar }} style={styles.avatarImage} />
                ) : (
                  <Avatar.Image
                    size={120}
                    source={{ uri: "https://via.placeholder.com/120" }}
                  />
                )}
                <IconButton
                  icon="camera"
                  size={30}
                  onPress={pickImage}
                  disabled={uploading}
                />
              </View>
              <View style={{ flex: 6, justifyContent: "flex-start" }}>
                <Title style={styles.username}>
                  {usuario.name} {usuario.lastname}
                </Title>
                <Text style={styles.textLabel}>Numero de identificacion:</Text>
                <Text style={styles.textInfo}>{usuario.personalIdNumber}</Text>

                <Text style={styles.textLabel}>Fecha de nacimiento:</Text>
                <Text style={styles.textInfo}>{usuario.birthDate}</Text>

                <Text style={styles.textLabel}>Nacionalidad:</Text>
                <Text style={styles.textInfo}>{usuario.nacionality}</Text>
              </View>
            </View>
          </Card>
          {/* <Card mode="outlined" style={styles.cardContainer}>
            <Card.Content>
              <Text style={styles.textLabel}> Nombre y Apellidos: </Text>
              <Text style={styles.textInfo}>
                {" "}
                {usuario.name} {usuario.lastname}{" "}
              </Text>

              <Text style={styles.textLabel}> Correo electronico: </Text>
              <Text style={styles.textInfo}> {usuario.email} </Text>

              <Text style={styles.textLabel}> Numero de identificacion: </Text>
              <Text style={styles.textInfo}> {usuario.personalIdNumber} </Text>

              <Text style={styles.textLabel}> Fecha de nacimiento: </Text>
              <Text style={styles.textInfo}> {usuario.birthDate} </Text>

              <Text style={styles.textLabel}> Nacionalidad: </Text>
              <Text style={styles.textInfo}> {usuario.nacionality} </Text>
            </Card.Content>
          </Card> */}

          <Text style={styles.textLabel}>Contacto: </Text>

          <TextInput
            style={styles.input}
            label="Correo electronico:"
            textColor="white"
            value={usuario.email}
            onChangeText={(text) => handleChangeText("email", text)}
            theme={{
              colors: { onSurfaceVariant: Colors.palette.secondary },
            }}
            underlineColor="white"
          />
          <TextInput
            style={styles.input}
            label="Telefono movil:"
            textColor="white"
            value={usuario.mobileNumber}
            onChangeText={(text) => handleChangeText("mobileNumber", text)}
            theme={{
              colors: { onSurfaceVariant: Colors.palette.secondary },
            }}
            underlineColor="white"
          />

          <Text style={styles.textLabel}>Direccion: </Text>
          <View style={styles.addressSecondRow}>
            <TextInput
              style={{ ...styles.inputAdress, flex: 6 }}
              label="Calle/Avenida/Pasaje"
              textColor="white"
              value={usuario.streetName}
              placeholder="Calle, Avenida, Pasaje, #Numero"
              onChangeText={(text) => handleChangeText("streetName", text)}
              theme={{
                colors: { onSurfaceVariant: "gray" },
              }}
              underlineColor="white"
            />
            <TextInput
              style={{ ...styles.inputAdress, flex: 2 }}
              label="Nro"
              textColor="white"
              value={usuario.streetDoorNumber}
              placeholder="#puerta numero"
              onChangeText={(text) => handleChangeText("streetDoorNumber", text)}
              theme={{
                colors: { onSurfaceVariant: "gray" },
              }}
              underlineColor="white"
            />
          </View>

          <View style={styles.addressSecondRow}>
            <TextInput
              style={{ ...styles.inputAdress, flex: 2 }}
              label="Piso / Puerta"
              textColor="white"
              value={usuario.streetDoor}
              onChangeText={(text) => handleChangeText("streetDoor", text)}
              theme={{
                colors: { onSurfaceVariant: Colors.palette.secondary },
              }}
              underlineColor="white"
            />

            <TextInput
              style={{ ...styles.inputAdress, flex: 5 }}
              label="Ciudad/Localidad"
              textColor="white"
              value={usuario.localidad}
              placeholder="Cornella"
              onChangeText={(text) => handleChangeText("localidad", text)}
              theme={{
                colors: { onSurfaceVariant: Colors.palette.secondary },
              }}
              underlineColor="white"
            />
          </View>

          <View style={styles.addressSecondRow}>
            <TextInput
              style={{ ...styles.inputAdress, flex: 2 }}
              label="Codigo Postal"
              textColor="white"
              value={usuario.postalCode}
              onChangeText={(text) => handleChangeText("postalCode", text)}
              theme={{
                colors: { onSurfaceVariant: Colors.palette.secondary },
              }}
              underlineColor="white"
            />
            <TextInput
              style={{ ...styles.inputAdress, flex: 5 }}
              label="Provincia"
              textColor="white"
              placeholder="Barcelona"
              value={usuario.province}
              onChangeText={(text) => handleChangeText("province", text)}
              theme={{
                colors: { onSurfaceVariant: Colors.palette.secondary },
              }}
              underlineColor="white"
            />
          </View>
        </ScrollView>
        <ButtonComponent
          onPressHandler={handleCompleteProfile}
          name="Guardar"
          isLoading={isLoading}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.palette.primary,
    flexDirection: "column",
    justifyContent: "center",
  },
  innerContainer: {
    padding: 10,
    flex: 1,
    justifyContent: "space-around",
  },
  textInputStyle: {
    textAlign: "center",
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "midnightblue",
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: "midnightblue",
    padding: 10,
  },
  username: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  // container: {
  //   flex: 1,
  //   paddingTop: 10,
  //   backgroundColor: Colors.palette.primary,
  //   paddingLeft: 30,
  //   paddingRight: 30,
  // },
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
    marginTop: 15,
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
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 10,
    // flexWrap: "wrap",
  },
  // inputAdress: {
  //   // width: "45%",
  //   height: 55,
  //   fontSize: 16,
  //   borderColor: "gray",
  //   // borderWidth: 0.5,
  //   // marginBottom: 16,
  //   // borderRadius: 5,
  // },
  inputAdress: {
    // width: "45%",
    height: 55,
    fontSize: 16,
    borderColor: "gray",
    borderWidth: 0.5,
    marginBottom: 12,
    borderRadius: 5,
  },
  cardContainer: {
    borderColor: "white",
    // maxHeightheight: 300, // Set a fixed height for the card
    // elevation: 4,
    marginVertical: 15,
  },
  profileHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  textLabel: {
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  textInfo: {
    color: Colors.palette.tertiary,
  },
  subtitle: {
    color: "lightgray",
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 8,
    alignSelf: "flex-start",
  },
  buttonContainer: {
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
});

export default ProfileScreen;
