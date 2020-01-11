import React from "react";
import { Dimensions, StyleSheet, Text, View, Image } from "react-native";

class PopUpBox extends React.Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.name}>
          <Image
            source={require("../assets/manchesterBee.jpg")}
            style={styles.imageBee}
          />
          <Text>{this.props.markerInfo[0].name}</Text>
        </View>
        <Text>Estimated Time : {this.props.time}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "20%",
    width: "90%",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "flex-start"
    alignSelf: "center"
  },

  name: {
    flexDirection: "row",
    height: "30%",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 10
  },
  imageBee: {
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    width: "10%",
    height: "100%",
    resizeMode: "contain"
  }
});

export default PopUpBox;
