import React from "react";
import { Button, StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function BeeSafeButton(props) {
  const { apiCallbackFunction, title } = props;
  return (
    <View>
      <TouchableOpacity onPress={() => deleteHandler(apiCallbackFunction)}>
        <View style={styles.button}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function deleteHandler(apiCallbackFunction) {
  apiCallbackFunction().then(data => {
    console.log(data);
  });
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#e6005c",
    borderRadius: 10,
    width: "55%",
    // height: "5%",
    // height: "53%%",
    alignSelf: "center",
    marginTop: "5%"
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    padding: "5%"
  }
});
