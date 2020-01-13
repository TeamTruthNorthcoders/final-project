import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import Firebase from "../config/Firebase";
import ReactNativeSettingsPage, {
  SectionRow,
  NavigateRow,
  CheckRow,
  SliderRow,
  SwitchRow
} from "react-native-settings-page";
import { TextInput } from "react-native-gesture-handler";
import { Alert } from "react-native";
import UserProfile from "../components/SettingsTab/UserProfile";

class Settings extends React.Component {
  state = {
    check: false,
    switch: false,
    value: 40,
    newPassword: "",
    currentPassword: "",
    clearInput: false
  };
  handleSignout = () => {
    Firebase.auth().signOut();
    this.props.navigation.navigate("Login");
  };

  navigateToUserPlaces = () => {
    console.log(this.props);
    this.props.navigation.navigate("UserPlaces", { email: this.props.user });
  };

  navigateToUserReviews = () => {
    this.props.navigation.navigate("UserReviews", { email: this.props.user });
  };

  resetFields = () => {
    this.setState({ newPassword: "" });
    this.setState({ currentPassword: "" });
    this.props.navigation.navigate("Home");
  };
  onChangePasswordPress = () => {
    const user = Firebase.auth().currentUser;
    user
      .updatePassword(this.state.newPassword)
      .then(() => {
        Alert.alert("Password was succesfully changed!");
      })
      .then(() => {
        this.resetFields();
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };
  render() {
    const { email } = this.props.user;
    return (
      <React.Fragment>
        <UserProfile email={email}></UserProfile>
        <ReactNativeSettingsPage>
          <SectionRow text="Select Your Options">
            <NavigateRow
              text="Log Out"
              iconName="close"
              onPressCallback={this.handleSignout}
            />
            <SwitchRow
              text="Change Password"
              iconName="random"
              _value={this.state.switch}
              _onValueChange={() => {
                this.setState({ switch: !this.state.switch });
                this.onChangePasswordPress();
              }}
            />
            <TextInput
              clearButtonMode="always"
              style={styles.texInput}
              placeholder="Current Password"
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              blurOnSubmit
              onChangeText={text => {
                this.setState({ currentPassword: text });
              }}
              value={this.state.currentPassword}
            ></TextInput>
            <TextInput
              clearButtonMode="always"
              style={styles.texInput}
              autoCorrect={false}
              placeholder="Type in your new password here"
              autoCapitalize="none"
              secureTextEntry={true}
              blurOnSubmit
              onChangeText={text => {
                this.setState({ newPassword: text });
              }}
              value={this.state.newPassword}
            ></TextInput>
            <CheckRow
              text="Change email"
              autoCorrect={false}
              iconName="envelope-open"
              _color="#000"
              _value={this.state.check}
              _onValueChange={() => {
                this.setState({ check: !this.state.check });
              }}
            />
            <TextInput
              clearButtonMode="always"
              style={styles.texInput}
              placeholder="Type in your email here"
              autoCapitalize="none"
              secureTextEntry={true}
              blurOnSubmit
              onChangeText={text => {
                this.setState({ newPassword: text });
              }}
            ></TextInput>
            <NavigateRow
              text="Your BeeSafe Places"
              iconName="bank"
              onPressCallback={this.navigateToUserPlaces}
            />
            <NavigateRow
              text="Your BeeSafe Reviews"
              iconName="commenting"
              onPressCallback={this.navigateToUserReviews}
            />
          </SectionRow>
        </ReactNativeSettingsPage>
      </React.Fragment>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 30
  },
  texInput: {
    borderColor: "gray",
    borderWidth: 1,
    margin: 15,
    height: 40
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Settings);
