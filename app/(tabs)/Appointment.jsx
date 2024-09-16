// import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from "../../src/constants/Colors";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import WebView from "react-native-webview";
import Constants from "expo-constants";
import NetInfo from "@react-native-community/netinfo";

const TrackingScreen = () => {
  const runFirst = `
      // document.body.style.backgroundColor = '#183e45';
      document.body.style.color = 'white';
      document.querySelector('#form1 > div:nth-child(3) > nav').style.display = 'none';
      document.querySelector("#form1 > div:nth-child(3) > div.container > div > div").classList.remove('bg-primary');
      document.querySelector("#form1 > div:nth-child(3) > div.container > div > div").style.backgroundColor = '#f57f00'
      // setTimeout(function() { window.alert('Bienvenidos') }, 2000);
      true; // note: this is required, or you'll sometimes get silent failures
    `;

  NetInfo.fetch().then((state) => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
  });

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ16zMCPUkKA_Pe5Qi-I2_f2kD-Q8RG346CNYv_fZvVzj88maeKkZ7_hBy8GdYxSDwxmHmRaiukc",
        }}
        onMessage={(event) => {}}
        injectedJavaScript={runFirst}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.palette.primary,
    paddingTop: Constants.statusBarHeight,
  },
});

export default TrackingScreen;
