// import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from "../../src/constants/Colors";
import {
  Button,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import WebView from "react-native-webview";
import Constants from "expo-constants";
import {
  Dialog,
  Divider,
  Icon,
  IconButton,
  List,
  Modal,
  Portal,
  Snackbar,
  TextInput,
  ToggleButton,
} from "react-native-paper";
import { useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect } from "react";
import * as Clipboard from "expo-clipboard";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../src/firebase/config";
import { useAuth } from "../../src/contexts/AuthContext";

const TrackingScreen = () => {
  const runFirst = `
      document.body.style.backgroundColor = '#183e45';
      document.body.style.color = 'white';
      document.querySelector('#form1 > div:nth-child(3) > nav').style.display = 'none';
      document.querySelector("#form1 > div:nth-child(3) > div.container > div > div").classList.remove('bg-primary');
      document.querySelector("#form1 > div:nth-child(3) > div.container > div > div").style.backgroundColor = '#f57f00'
      // setTimeout(function() { window.alert('Bienvenidos') }, 2000);
      true; // note: this is required, or you'll sometimes get silent failures
    `;
  const { loggedInUser } = useAuth();

  const [expanded, setExpanded] = useState(true);
  const _handlePress = () => {
    setExpanded(!expanded);
  };
  const [enableAddOrder, setEnableAddOrder] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Estado: Sin escanear");
  const [userId, setUserId] = useState();

  useEffect(() => {
    askForCameraPermission();
  }, []);

  useEffect(() => {
    console.log("[tracking]", loggedInUser);
    if (loggedInUser?.uid) {
      setUserId(loggedInUser.uid);
      getOrdersByUserId(loggedInUser.uid);
    }
    return () => {};
  }, [loggedInUser]);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    setCodigo(data);
    console.log("Type: " + type + "\nData: " + data);
  };

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log(status);
      setHasPermission(status === "granted");
    })();
  };

  const [visible, setVisible] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [listExpanded, setListaExpanded] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [currentBarcodeCopied, setCurrentBarcodeCopied] = useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const saveOrder = () => {
    const currentTimestamp = (Date.now() / 1000) | 0;
    if (codigo.length > 0) {
      hideModal();
      console.log("Codigo", codigo);
      if (loggedInUser.uid) {
        const newOrder = {
          codigo,
          datetime: currentTimestamp,
          isDeleted: false,
          id: 0,
        };
        AddOrder(newOrder, loggedInUser?.uid)
          .then(() => {
            setOrderList((prev) => [...prev, newOrder]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  // room_a_ref = db.collection("rooms").document("roomA")
  // message_ref = room_a_ref.collection("messages").document("message1")

  const AddOrder = async (data, uid) => {
    try {
      // await setDoc(doc(db, "cliente", uid), data);
      const clientRef = doc(db, "cliente", loggedInUser.uid);
      console.log(clientRef);
      const ref = `cliente/${uid}/order`;
      await addDoc(collection(db, ref), data);

      // setIsLoading(false);
      // router.replace("(tabs)");
      console.log("saved");
    } catch (error) {
      console.log(error);
    }
  };

  const getOrdersByUserId = async (uid) => {
    const ref = `cliente/${uid}/order`;

    const snapshot = await db
      .collection(ref)
      .where("isDeleted", "==", false)
      .get();
    const orders = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log("orders ln 157", orders);
    setOrderList(orders);
  };

  const deleteOrderByCode = async (data) => {
    const ref = `cliente/${userId}/order`;
    console.log(data.id);
    if (data) {
      try {
        data.isDeleted = true;
        await setDoc(doc(db, ref, data.id), data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const copyCodigo = (text) => {
    console.log("cppying", text);
    setMessageVisible(true);
    setCurrentBarcodeCopied(text);
    setFooterText(`Codigo ${currentBarcodeCopied} copiado!`);
    Clipboard.setStringAsync(text);
  };

  const [dialogVisible, setDialogVisible] = useState(false);
  const toogleDialog = () => {
    setDialogVisible(!dialogVisible);
  };

  const handleDelete = (codigo) => {
    Alert.alert("Eliminar Envio?", "Esta seguro de eliminar envio: " + codigo, [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Eliminar",
        onPress: () => {
          console.log("basic delete", codigo);
          const data = orderList.find((order) => order.codigo === codigo);
          deleteOrderByCode(data);
          setOrderList(orderList.filter((order) => order.codigo != codigo));

          setFooterText(`Envio con codigo ${codigo} eliminado`);
        },
      },
    ]);
  };
  const [messageVisible, setMessageVisible] = useState(false);
  const [footerText, setFooterText] = useState("");

  const FooterTracking = () => {
    const onToggleSnackBar = () => setVisible(!messageVisible);

    const onDismissSnackBar = () => setMessageVisible(false);
    return (
      <Snackbar
        visible={messageVisible}
        onDismiss={onDismissSnackBar}
        duration={1000}
        style={{ backgroundColor: Colors.palette.secondary }}
        // action={{
        //   label: "Undo",
        //   onPress: () => {
        //     // Do something
        //   },
        // }}
      >
        <Text style={{ color: "white" }}>{footerText}</Text>
      </Snackbar>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.palette.primary,
        // paddingTop: Constants.statusBarHeight,
        borderColor: "red",
      }}
    >
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}
          dismissableBackButton="true"
          style={styles.modal}
        >
          <View style={styles.modalHeaderContainer}>
            <Text style={styles.title}>Agregar nuevo Paquete</Text>

            <IconButton
              icon="close"
              iconColor="white"
              size={20}
              onPress={() => hideModal()}
            />
          </View>
          <View style={styles.modalBodyContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ingrese su codigo"
              placeholderTextColor="white"
              textColor="white"
              theme={{
                colors: { onSurfaceVariant: "white" },
              }}
              activeUnderlineColor={Colors.palette.primary}
              disabled={enableAddOrder}
              label="Codigo"
              // value={password}
              // secureTextEntry={secureTextEntry}
              onChangeText={(text) => setCodigo(text)}
              right={
                <TextInput.Icon
                  icon="barcode-scan"
                  color="white"
                  onPress={() => setEnableAddOrder(!enableAddOrder)}
                />
              }
              value={codigo}
            />

            {enableAddOrder && (
              <>
                <View style={styles.barcodebox}>
                  <BarCodeScanner
                    onBarCodeScanned={
                      scanned ? undefined : handleBarCodeScanned
                    }
                    style={{ height: 300, width: 300 }}
                    onStartShouldSetResponder={(event) => setScanned(false)}
                  />
                </View>
                {/* <Text style={styles.maintext}>{text}</Text> */}

                {scanned && (
                  <Text>Pulse en la camara para escanear de nuevo</Text>
                )}
              </>
            )}

            <TouchableOpacity onPress={saveOrder} style={styles.button}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>

      <Portal>
        {/* <Dialog visible={visible} onDismiss={toogleDialog}>
          <Dialog.Actions>
            <Button onPress={() => console.log("Cancel")}>Cancel</Button>
            <Button onPress={() => console.log("Ok")}>Ok</Button>
          </Dialog.Actions>
        </Dialog> */}
      </Portal>

      <Text style={styles.title}>Mis paquetes:</Text>

      <View style={styles.paqueteContainer}>
        <View style={{ flexDirection: "column", flex: 8 }}>
          <List.Section
            style={styles.accordion}
            titleStyle={styles.packageListTitle}
          >
            <List.Accordion
              left={(props) => <List.Icon {...props} icon="folder" />}
              title="Ver paquetes registrados"
              style={{ backgroundColor: Colors.palette.primary }}
              titleStyle={{ color: "white" }}
              onPress={() => setListaExpanded(!listExpanded)}
              expanded={listExpanded}
            >
              {orderList.map((order, index) => (
                <List.Item
                  title={order.codigo}
                  style={styles.accordionItem}
                  key={index}
                  onPress={() => copyCodigo(order?.codigo)}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="delete"
                      size={20}
                      onPress={() => handleDelete(order?.codigo)}
                    />
                  )}
                />
              ))}
            </List.Accordion>

            {/* <List.Accordion
              left={(props) => <List.Icon {...props} icon="folder" />}
              title="Verificar Paquete"
              expanded={expanded}beaker-plus book-plus book-plus-multiple card-plus note-plus  plus-box plus-circle
              onPress={_handlePress}
              style={styles.accordion}
            ></List.Accordion> */}
          </List.Section>
        </View>

        {!listExpanded && (
          <IconButton
            icon="plus-box"
            iconColor={Colors.palette.secondary}
            size={30}
            onPress={showModal}
          />
        )}
      </View>

      <Text style={styles.title}>Seguimiento:</Text>

      <Divider theme={{ colors: { primary: "green" } }} />

      <WebView
        source={{
          uri: "https://envia.grupogeomil.com/track.aspx?C=ESP&SOURCE=ENVIA",
        }}
        onMessage={(event) => {}}
        injectedJavaScript={runFirst}
      />
      <FooterTracking />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: Colors.palette.primary,
    marginTop: Constants.statusBarHeight,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginVertical: 0,
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
    padding: 0,
    margin: 0,
  },
  accordion: {
    backgroundColor: Colors.palette.primary,
  },
  accordionItem: {
    backgroundColor: Colors.palette.tertiary,
    paddingVertical: 0,
    paddingHorizontal: 5,
    opacity: 0.7,
  },
  modal: {},
  modalContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: Colors.palette.tertiary,
    borderRadius: 10,
    borderWidth: 1.5,
    padding: 20,
    borderColor: Colors.palette.primary,
    // opacity: 0.9,
    color: "white",
    flex: 0.75,
  },
  modalHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  },
  button: {
    backgroundColor: Colors.palette.secondary,
    borderRadius: 20,
    padding: 10,
    margin: 14,
    width: "78%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button: {
    backgroundColor: Colors.palette.secondary,
    borderRadius: 20,
    padding: 10,
    margin: 14,
    width: "78%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    alignSelf: "center",
  },
  modalBodyContainer: {
    padding: 20,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    alignSelf: "stretch",
  },
  paqueteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TrackingScreen;
