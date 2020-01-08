import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import { Icon } from "react-native-elements";
import Firebase from "../config/Firebase";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateEmail, updatePassword, signup } from "../actions/user";

class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: ""
  };
  // handleSignUp = () => {
  //   this.props.signup();
  //   this.props.navigation.navigate("Profile");
  // };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Icon name="envelope" type="font-awesome" />
          <TextInput
            style={styles.inputBox}
            value={this.props.user.email}
            onChangeText={email => this.props.updateEmail(email)}
            placeholder="Email"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.row}>
          <Icon name="lock" type="font-awesome" />
          <TextInput
            style={styles.inputBox}
            value={this.props.user.password}
            onChangeText={password => this.props.updatePassword(password)}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.props.signup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
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
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    width: "80%"
  },
  inputBox: {
    width: "80%",
    margin: 5,
    padding: 15,
    fontSize: 16,
    textAlign: "left"
  },
  button: {
    marginTop: 30,
    marginBottom: 10,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#e6005c",
    borderColor: "#cc0052",
    borderWidth: 1,
    borderRadius: 20,
    width: "80%"
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },
  buttonSignup: {
    fontSize: 12
  }
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateEmail, updatePassword, signup }, dispatch);
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
