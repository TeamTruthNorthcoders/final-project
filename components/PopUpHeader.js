import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

class PopUpHeader extends React.Component {
  state = {};
  goToReviews = () => {};
  render() {
    return (
      <View style={styles.name}>
        <Image
          source={require("../assets/manchesterBee.jpg")}
          style={styles.imageBee}
        />
        <Text
          style={{
            fontSize: 16,
            textDecorationLine: "underline",
            paddingLeft: 3
          }}
        >
          {this.props.markerInfo.name}
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  name: {
    flexDirection: "row",
    height: "50%",
    width: "auto",
    alignItems: "center",
    marginBottom: 3
  },
  imageBee: {
    width: 40,
    height: 65,
    resizeMode: "contain"
  }
});

export default PopUpHeader;
