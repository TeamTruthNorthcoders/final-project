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

class Settings extends React.Component {
  handleSignout = () => {
    Firebase.auth().signOut();
    this.props.navigation.navigate("Login");
  };
  state = {
    check: false,
    switch: false,
    value: 40
  };
  _navigateToScreen = () => {
    const { navigation } = this.props;
    navigation.navigate("Your-Screen-Name");
  };

  render() {
    return (
      <React.Fragment>
        <ReactNativeSettingsPage>
          <SectionRow text="Select Your Options">
            <NavigateRow
              text="Navigate Row"
              iconName="your-icon-name"
              onPressCallback={this._navigateToScreen}
            />
            <SwitchRow
              text="Switch Row"
              iconName="your-icon-name"
              _value={this.state.switch}
              _onValueChange={() => {
                this.setState({ switch: !this.state.switch });
              }}
            />
            <CheckRow
              text="Check Row"
              iconName="your-icon-name"
              _color="#000"
              _value={this.state.check}
              _onValueChange={() => {
                this.setState({ check: !this.state.check });
              }}
            />
            <SliderRow
              text="Slider Row"
              iconName="your-icon-name"
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
        <View style={styles.container}>
          <Text>Settings Screen</Text>
          <Button title="Logout" onPress={this.handleSignout} />
        </View>
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
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Settings);
