import { canOpenURL } from "expo-linking";
import React, { useState } from "react";
import { View, StyleSheet, Alert, Button, Linking } from "react-native";
import { AnimatedFAB, FAB, TextInput } from "react-native-paper";

const FabExample = () => {
  const [text, setText] = useState("");
  const [extended, setExtended] = useState("");
  const [showText, setShowText] = useState(false);
  const [disablebtn, setDisablebtn] = useState(true);

  const openWhatsApp = () => {
    const phoneNumber = '+34612510075'; // Replace with the target phone number
    const message = 'Hola Tucan, Requiero ayuda con la applicacion'; // Customize your message
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'WhatsApp is not installed on your device');
        }
      })
      .catch(err => console.error('An error occurred', err));

    // canOpenURL(url)
  };

  const toggleFabButton = () => {
    console.log("Pressed from");
    setExtended(!extended);
    if (extended) {
      openWhatsApp();
    }
  };

  return (
    <View>
      <AnimatedFAB
        style={styles.fab}
        icon="whatsapp"
        label="Contactar"
        medium
        animateFrom="right"
        extended={extended}
        // label="Add more"
        onPress={toggleFabButton}
      />
      {/* {showText ? (
        <View style={styles.textInput}>
          <TextInput
            mode="outlined"
            label="Item"
            value={text}
            onChangeText={(newText) => {
              setText(newText);
              setDisablebtn(false);
            }}
          />
          <View style={styles.btn}>
            <Button title="Submit" disabled={disablebtn} onPress={showAlert} />
          </View>
        </View>
      ) : (
        <></>
      )} */}
    </View>
  );
};

export default FabExample;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#25D366",
  },
  textInput: {
    position: "relative",
    margin: 18,
  },
  btn: {
    marginTop: 20,
  },
});
