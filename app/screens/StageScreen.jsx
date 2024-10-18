import { signOut } from "firebase/auth";
import React from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Text,
  Title,
  IconButton,
} from "react-native-paper";
import { authentication, db, storage } from "../../src/firebase/config";
import { useAuth } from "../../src/contexts/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import { Colors } from "../../src/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { doc, setDoc } from "firebase/firestore";
import { router } from "expo-router";

const ProfilePage = () => {
  const [usuario, setUsuario] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { loggedInUser, setLoggedInUser } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const [uploading, setUploading] = useState(false);

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

  // useEffect(() => {
  //   if (loggedInUser) {
  //     setAvatar(
  //       `${FileSystem.documentDirectory}${loggedInUser?.profile?.pictureFileName}`
  //     );
  //   }
  // }, []);

  useEffect(() => {
    if (loggedInUser) {
      let userMerged = { ...loggedInUser.profile, ...usuario };
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
      // setAvatar("file:///data/user/0/host.exp.exponent/files/48fdddfa-0c11-4679-a230-e0974b1d7178.jpeg");
    }
  }, [loggedInUser]);

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileHeader}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatarImage} />
        ) : (
          <Avatar.Image
            size={120}
            source={{ uri: "https://via.placeholder.com/120" }}
          />
        )}
        <Title style={styles.username}>
          {usuario.name} {usuario.lastname}
        </Title>
        <Text style={styles.userEmail}>{usuario.email}</Text>
      </View>
      <Card mode="outlined" style={styles.cardContainer}>
        <Card.Content>
          <Text style={styles.subtitle}>Informacion Personal: </Text>

          <Text style={styles.textLabel}> Numero de identificacion: </Text>
          <Text style={styles.textInfo}> {usuario.personalIdNumber} </Text>

          <Text style={styles.textLabel}> Fecha de nacimiento: </Text>
          <Text style={styles.textInfo}> {usuario.birthDate} </Text>

          <Text style={styles.textLabel}> Nacionalidad: </Text>
          <Text style={styles.textInfo}> {usuario.nacionality} </Text>

          <Text style={styles.subtitle}>Informacion de Contacto: </Text>

          <Text style={styles.textLabel}> Telefono/Movil: </Text>
          <Text style={styles.textInfo}> {usuario.mobileNumber} </Text>

          <Text style={styles.textLabel}> Direccion: </Text>
          <Text style={styles.textInfo}>
            {usuario.streetName} {usuario.streetDoorNumber}, {usuario.streetDoor} {usuario.postalCode}9+
          </Text>
          <Text style={styles.textInfo}>
            {usuario.province} - {usuario.localidad}
          </Text>

          <Button
            mode="contained"
            onPress={handleEditProfile}
            style={styles.button}
            icon="account-edit"
            textColor="white"
          >
            Edit Profile
          </Button>
          <Button
            mode="outlined"
            onPress={handleLogOut}
            style={styles.button}
            icon="logout"
            textColor="white"
          >
            Log Out
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.palette.primary,
    padding: 16,
  },
  profileHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  username: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  userEmail: {
    fontSize: 16,
    color: Colors.palette.tertiary,
  },
  cardContainer: {
    borderColor: "white",
  },
  button: {
    marginVertical: 10,
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
  avatarImage: { width: 120, height: 120, borderRadius: 60 },
});

export default ProfilePage;
