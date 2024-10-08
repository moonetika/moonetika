import {
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
const ButtonComponent = ({
  name,
  buttonStyle,
  textStyle,
  onPressHandler,
  isLoading,
}) => {
  return (
    <Pressable
      onPress={onPressHandler}
      style={buttonStyle ?? styles.buttonStyle}
    >
      {isLoading && (
        <ActivityIndicator
          size="small"
          color="white"
          style={styles.loadingStyle}
        />
      )}
      <Text style={textStyle ?? styles.buttonTextStyle}>{name}</Text>
    </Pressable>
  );
};
export default ButtonComponent;


const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.palette.secondary,
    borderRadius: 10,
    padding: 10,
    margin: 14,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingStyle: {
    alignSelf: "center",
    justifyContent: "center",
    paddingLeft: 10,
  },
});
