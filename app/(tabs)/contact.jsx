import React from "react";
import { View, Linking, StyleSheet, ScrollView, Image } from "react-native";
import { Text, Button, Card, Title, Paragraph } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../src/constants/Colors";

const ContactScreen = () => {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  const openWhatsApp = () => {
    const phoneNumber = "+34622434858"; // replace with your WhatsApp number
    const message = "Hola Tucan, Quiero saber como podria...";
    const whatsappUrl = `whatsapp://send?text=${message}&phone=${phoneNumber}`;
    Linking.openURL(whatsappUrl);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.text}>Tucan Express Paqueteria</Title>
            <Paragraph style={styles.text}>
              Puedes encontrarnos en nuestras oficinas y nuestros enlaces:
            </Paragraph>
          </Card.Content>

          <Card.Content>
            <View style={styles.infoRow}>
              <Icon name="phone" size={24} style={styles.icon} />
              <Text
                style={styles.text}
                onPress={() => openLink("tel:+34622434858")}
              >
                +34 622 43 48 58
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="email" size={24} style={styles.icon} />
              <Text
                style={styles.text}
                onPress={() => openLink("mailto:info@tucangroup.com")}
              >
                info@tucangroup.com
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="web" size={24} style={styles.icon} />
              <Text
                style={styles.text}
                onPress={() => openLink("https://www.tucangroup.es")}
              >
                www.tucangroup.es
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="whatsapp" size={24} style={styles.icon} />
              <Text style={styles.text} onPress={openWhatsApp}>
                Tucan WhatsApp
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="facebook" size={24} style={styles.icon} />
              <Text
                style={styles.text}
                onPress={() => openLink("https://www.facebook.com/TucanExpressPaqueteria/")}
              >
                Tucan Facebook
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* <MapView
        style={styles.map}
        initialRegion={{
          latitude: 41.397237,
          longitude: 2.1814207,
          latitudeDelta: 0.01215,
          longitudeDelta: 0.01148,
        }}
        >
        <Marker
        coordinate={{ latitude: 41.397237, longitude: 2.1814207 }}
        title="Nuestra localizacion"
        description="Tucan Express Paqueteria"
        />
      </MapView> */}

        <Card style={styles.mapCard}>
          <View style={styles.mapContainer}>
            <Image
              source={require("../../assets/mapaTucan.jpg")} // Use your own map image URL here
              style={styles.mapImage}
            />
            <Button
              mode="contained"
              icon="map-marker"
              style={styles.mapButton}
              onPress={() =>
                openLink("https://maps.app.goo.gl/pjbrviJivpEAwyLq9")
              }
            >
              Abrir en Maps
            </Button>
          </View>
        </Card>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.palette.primary,
    color: "white",
  },
  card: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  icon: {
    marginRight: 10,
    color: "white",
  },
  text: { color: "white" },
  mapCard: {
    borderBlockColor: "white",
  },
  map: {
    minHeight: 300,
  },
  mapCard: {
    marginBottom: 20,
  },
  mapContainer: {
    position: "relative",
    height: 300,
  },
  mapImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  mapButton: {
    position: "absolute",
    bottom: 20,
    left: "25%",
    right: "25%",
  },
});

export default ContactScreen;
