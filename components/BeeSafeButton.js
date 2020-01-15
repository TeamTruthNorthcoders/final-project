import React from "react";
import { Button, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as api from "../utils/utils";

export default function BeeSafeButton(props) {
  const { apiCallbackFunction, title } = props;
  return (
    <View>
      {/* <Button
        color="#FE434C"
        title="Delete"
        style={styles.button}
        onPress={() => deleteHandler(apiCallbackFunction)}
      /> */}

      <TouchableOpacity onPress={() => deleteHandler(apiCallbackFunction)}>
        <View
          style={{
            backgroundColor: "#e6005c",
            borderRadius: 10,
            width: "55%",
            height: "53%",
            alignSelf: "center",
            marginTop: "5%"
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 15,
              paddingTop: "5%"
            }}
          >
            {title}
          </Text>
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
    // shadowRadius: 30,
    // alignContent: "center"
    // color: "#FE434C"
  }
});
