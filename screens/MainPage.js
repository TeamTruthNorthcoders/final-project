import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";

import Map from "../Maps/Map"

class MainPage extends React.Component {
  

  render() {
    return (
      <View style={styles.container}>
        <Map/>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(MainPage);
