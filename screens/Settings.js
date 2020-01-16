import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
let Icon = Ionicons;
let IconPlus = AntDesign;
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
import call from "react-native-phone-call";
import { AsyncStorage } from "react-native";

class Settings extends React.Component {
  state = {
    check: false,
    switch: false,
    value: 40,
    newPassword: "",
    currentPassword: "",
    clearInput: false,
    newEmail: ""
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("userDetails");
      if (value !== null) {
        return value;
        // We have data!!
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };

  handleSignout = () => {
    Firebase.auth().signOut();
    this.props.navigation.navigate("Login");
  };

  navigateToUserPlaces = () => {
    this.props.navigation.navigate("UserPlaces");
  };

  navigateToUserReviews = () => {
    this.props.navigation.navigate("UserReviews", { email: this.props.user });
  };

  navigateToEmergencyContPage = () => {
    this.props.navigation.navigate("EmergencyContact");
  };

  resetFields = () => {
    this.setState({ newPassword: "", currentPassword: "", newEmail: "" });
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
        this.setState({ switch: !this.state.switch });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };
  changeEmail = () => {
    const user = Firebase.auth().currentUser;
    user
      .updateEmail(this.state.newEmail)
      .then(() => {
        Alert.alert("Email was successfully changed");
      })
      .then(() => {
        this.resetFields();
        this.setState({ switch: !this.state.switch });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  makeCall = async () => {
    try {
      const phoneNumber = await this._retrieveData();
      const args = {
        number: phoneNumber.toString(), // String value with the number to call
        prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
      };
      call(args);
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };

  render() {
    const regex = /([A-Z, a-z])\w+/g;
    const { email } = this.props.user;
    // const obfuscatedEmail = email.replace(regex, "xxxxx");
    // if you don't want the user email to be displayed, uncomment line 120 and change line 127

    return (
      <React.Fragment>
        <ScrollView style={ScrollView}>
          <ReactNativeSettingsPage>
            <UserProfile email={email}></UserProfile>
            <TouchableOpacity
              style={styles.button}
              title="CALL YOUR FRIEND"
              onPress={() => this.makeCall()}
              centerContent={true}
            >
              <Icon name={"md-warning"} size={30} color={"white"} />
              <Text style={styles.emergencyButtonTextInput}>
                PRESS TO CALL YOUR BUDDY!
              </Text>
            </TouchableOpacity>
            <SectionRow text="Select Your Options">
              <NavigateRow
                text="Log Out"
                iconName="close"
                onPressCallback={this.handleSignout}
              />
              <NavigateRow
                text="Add A Buddy"
                iconName="phone"
                onPressCallback={this.navigateToEmergencyContPage}
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
                autoCapitalize="none"
                autoCorrect={false}
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
              <SwitchRow
                text="Change email"
                autoCorrect={false}
                iconName="envelope-open"
                _color="#000"
                _value={this.state.check}
                _onValueChange={() => {
                  this.setState({ check: !this.state.check });
                  this.changeEmail();
                }}
              />
              <TextInput
                clearButtonMode="always"
                style={styles.texInput}
                placeholder="Type in your email here"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                blurOnSubmit
                onChangeText={text => {
                  this.setState({ newEmail: text });
                }}
                value={this.state.newEmail}
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
        </ScrollView>
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
  emergencyButtonTextInput: {
    textAlign: "center",
    borderColor: "gray",
    color: "white",
    paddingLeft: 5
  },
  texInput: {
    borderColor: "gray",
    borderWidth: 2,
    margin: 15,
    height: 40
  },

  ScrollView: {
    flexDirection: "row"
  },

  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3C1053FF",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
    margin: 10,
    justifyContent: "center",
    padding: 7
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Settings);
