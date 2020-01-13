import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CalloutSubview } from "react-native-maps";

//import for triggering the navigation instructions
import getDirections from "react-native-google-maps-directions";

class BottomLinks extends React.Component {
  //Sends you to google maps app with precise directions
  goToDir = () => {
    const data = {
      destination: {
        latitude: this.props.markerInfo.coords.latitude,
        longitude: this.props.markerInfo.coords.longitude
      },
      params: [
        {
          key: "travelmode",
          value: "walking" // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate" // this instantly initializes navigation using the given travel mode
        }
      ]
    };
    getDirections(data);
  };

  // goToReviews = () => {
  //   this.props.navigation.navigate("Reviews");
  // };
  render() {
    return (
      <View style={styles.links}>
        <CalloutSubview
          onPress={e => this.props.navigation.navigate('Reviews', this.props.markerInfo)}
        ><TouchableOpacity onPress={this.goToReviews}>
          <Text style={styles.reviews}>See reviews </Text>
        </TouchableOpacity></CalloutSubview>
        <Text> or</Text>
        <CalloutSubview onPress={this.goToDir}><TouchableOpacity>
          <Text style={styles.reviews}> Get directions</Text>
        </TouchableOpacity></CalloutSubview>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  links: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  reviews: {
    paddingTop: 6,
    paddingLeft: 3,
    textDecorationLine: "underline",
    color: "blue"
  }
});

export default BottomLinks;
