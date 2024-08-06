// import Ionicons from '@expo/vector-icons/Ionicons';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../src/constants/Colors";
import { useAuth } from "../../src/contexts/AuthContext";
import { useEffect, useState } from "react";
import QRCode from "react-native-qrcode-svg";

const CardScreen = () => {
  const { loggedInUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    return () => {
      console.log("[card] first render", loggedInUser);
      if (loggedInUser) {
        setIsLoading(false);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      console.log("[card]", loggedInUser);
      if (loggedInUser) {
        setIsLoading(false);
      }
    };
  }, [loggedInUser]);
  return (
    <View style={styles.container}>
      {!isLoading && (
        <ActivityIndicator
          size="large"
          color="white"
          style={styles.container}
        />
      )}

      <Text style={styles.title}>Tucan QR {loggedInUser?.profile?.name}</Text>
      <View style={styles.qrcontainer}>
        <QRCode value={loggedInUser?.profile?.personalIdNumber} size={200} />
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
  qrcontainer: {
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 35,
    marginBottom: 20,
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
});

export default CardScreen;
