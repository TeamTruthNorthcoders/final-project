import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
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
      await AsyncStorage.setItem("userDetails", this.state.newEmergencyContact);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <React.Fragment>

        <ReactNativeSettingsPage>
          <Text style={styles.emergencyContact}>
            Enter your emergency contact below.
          </Text>

          <TextInput
            clearButtonMode="always"
            style={styles.texInput}
            placeholder="Enter phone number"
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={false}
            blurOnSubmit
            onChangeText={text => {
              this.setState({ newEmergencyContact: text });
            }}
            value={this.state.newEmergencyContact}
          ></TextInput>
          <TouchableOpacity style={styles.save} onPress={this._storeData}>
            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
              Save
            </Text>
          </TouchableOpacity>
          <Image
            style={styles.avatar}
            source={{
              uri:
                "https://vignette.wikia.nocookie.net/p__/images/4/42/001799945127.jpg/revision/latest?cb=20120115125731&path-prefix=protagonist"
            }}
          />
          <Text style={{color: 'gray', paddingLeft : 5, marginBottom: 0}}>Please contact the police first in case of real threat.</Text>
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
    flex: 1,
    alignItems: "center",
    borderColor: "#e6005c",
    borderWidth: 1,
    margin: 15,
    height: 60,
    padding: 5,
    borderWidth: 3
  },
  avatar: {
    flex: 1,
    alignSelf: "center",
    width: 170,
    height: 270,
    borderRadius: 63,
    borderColor: "white",
    marginBottom: 25,
    // resizeMode: "contain"
  },
  emergencyContact: {
    width: "80%",
    alignSelf: "flex-start",
    fontSize: 15,
    color: "black",
    fontWeight: "600",
    marginTop: 25,
    marginLeft: 15
  },
  save: {
    alignSelf: "center",
    padding: 15,
    borderRadius: 20,
    backgroundColor: "#e6005c",
    marginBottom: 45
  }
});
