import React from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";

import Map from "../components/Map";

export default class UserSafePlaces extends React.Component {
  goBack = () => {
    this.props.navigation.navigate("Settings");
  };

  render() {
    return (
      <View>
        <Text>UserSafePlaces</Text>
        <Button title="goBack" onPress={this.goBack} />
      </View>
    );
  }
}
