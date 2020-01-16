import React from "react";
import { StyleSheet, Text, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import ReactNativeSettingsPage, {
  SectionRow,
  NavigateRow,
  CheckRow,
  SliderRow,
  SwitchRow
} from "react-native-settings-page";
import { AsyncStorage } from "react-native";

export default class EmergencyContact extends React.Component {
  state = { newEmergencyContact: "" };

  _storeData = async () => {
    try {
      // console.log(this.state.newEmergencyContact);
      await AsyncStorage.setItem("userDetails", this.state.newEmergencyContact);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    // console.log(this.state);
    return (
      <React.Fragment>
        <Text style={styles.emergencyContact}>
          Please put here a number for a person you trust whom you can contact
          real fast! Always contact the Police first if you think are in serious
          danger.
        </Text>
        <ReactNativeSettingsPage>
          <TextInput
            clearButtonMode="always"
            style={styles.texInput}
            placeholder="New Emergency Contact"
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={false}
            blurOnSubmit
            onChangeText={text => {
              this.setState({ newEmergencyContact: text });
            }}
            value={this.state.newEmergencyContact}
          ></TextInput>
          <NavigateRow
            text="Submit"
            iconName="music"
            onPressCallback={this._storeData}
          />
        </ReactNativeSettingsPage>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://i.imgur.com/TDsnkJj.png"
          }}
        />
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
    flex: 1,
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    margin: 15,
    height: 60
  },
  avatar: {
    flex: 1,
    alignSelf: "center",
    paddingLeft: 100,
    width: 230,
    height: 230,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 25
  },
  emergencyContact: {
    fontSize: 22,
    color: "#778899",
    fontWeight: "600"
  }
});
