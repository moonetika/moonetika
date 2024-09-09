import React from 'react';
import { View, Linking, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const WhatsAppButton = () => {
  const openWhatsApp = () => {
    const phoneNumber = '+1234567890'; // Replace with the target phone number
    const message = 'Hello, I would like to chat!'; // Customize your message
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
  };

  return (
    <View >
      <Button
        icon={() => <Icon name="whatsapp" size={20} color="white" />}
        mode="contained"
        onPress={openWhatsApp}
        style={{ backgroundColor: '#25D366' }}
      >
        Contacto
      </Button>
    </View>
  );
};

export default WhatsAppButton;
