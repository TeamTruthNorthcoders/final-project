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

class Settings extends React.Component {
  handleSignout = () => {
    Firebase.auth().signOut();
    this.props.navigation.navigate("Login");
  };
  state = {
    check: false,
    switch: false,
    value: 40,
    newPassword: ""
  };
  _navigateToScreen = () => {
    const { navigation } = this.props;
    navigation.navigate("Your-Screen-Name");
  };

  onChangePasswordPress = () => {
    const user = Firebase.auth().currentUser;
    user
      .updatePassword(this.state.newPassword)
      .then(() => {
        Alert.alert("Password was succesfully changed!");
        //potentially navigate back to maps?
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };
  render() {
    return (
      <React.Fragment>
        <ReactNativeSettingsPage>
          <SectionRow text="Select Your Options">
            <NavigateRow
              text="Log Out"
              iconName="check-square"
              onPressCallback={this.handleSignout}
            />
            <SwitchRow
              text="Change Password"
              iconName="pencil-square"
              _value={this.state.switch}
              _onValueChange={() => {
                this.setState({ switch: !this.state.switch });
                this.onChangePasswordPress();
              }}
            />
            <TextInput
              style={styles.texInput}
              placeholder="Current Password"
              autoCapitalize="none"
              secureTextEntry={true}
              blurOnSubmit
              onChangeText={text => {
                this.setState({ newPassword: text });
              }}
            ></TextInput>
            <TextInput
              style={styles.texInput}
              placeholder="Type in your new password here"
              autoCapitalize="none"
              secureTextEntry={true}
              blurOnSubmit
              onChangeText={text => {
                this.setState({ newPassword: text });
              }}
            ></TextInput>
            <CheckRow
              text="Change email"
              iconName="pagelines"
              _color="#000"
              _value={this.state.check}
              _onValueChange={() => {
                this.setState({ check: !this.state.check });
              }}
            />
            <TextInput
              style={styles.texInput}
              placeholder="Type in your email here"
              autoCapitalize="none"
              secureTextEntry={true}
              blurOnSubmit
              onChangeText={text => {
                this.setState({ newPassword: text });
              }}
            ></TextInput>
            <SliderRow
              text="Slider Row"
              iconName="database"
              _color="#000"
              _min={0}
              _max={100}
              _value={this.state.value}
              _onValueChange={value => {
                this.setState({ value });
              }}
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
    justifyContent: "center"
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
