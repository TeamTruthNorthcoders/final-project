import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import BottomLinks from "./PopUpLinks";
import PopUpHeader from "./PopUpHeader";

class PopUpBox extends React.Component {
  render() {
    return (
      <View>
        {/* {this.props.isLoading ? <Text>Loading</Text> : <View> */}
        <PopUpHeader markerInfo={this.props.markerInfo} />
        <Text style={{ paddingLeft: 3 }}>
          Estimated Time : {this.props.time}
        </Text>
        <BottomLinks navigation={this.props.navigation} markerInfo={this.props.markerInfo} />
      </View>
    );
  }
}

export default PopUpBox;
