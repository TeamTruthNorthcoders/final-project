import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { connect } from "react-redux";

class UserProfile extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://i.imgur.com/TDsnkJj.png"
              }}
            />
            <Text style={styles.name}>JessJelly </Text>
            <Text style={styles.userInfo}>{this.props.email} </Text>
            <Text style={styles.userInfo}>Manchester </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#DCDCDC"
  },
  headerContent: {
    padding: 30,
    alignItems: "center"
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "600"
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: "600"
  },

  infoContent: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 5
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    demo: state.demo
  };
};

export default connect(mapStateToProps)(UserProfile);
