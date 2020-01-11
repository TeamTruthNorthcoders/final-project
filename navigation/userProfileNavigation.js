import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import UserPlaces from "../components/UsersTab/UserPlaces";
import { createStackNavigator } from "react-navigation-stack";
import Settings from "../screens/Settings";
const userProfileNavigation = createStackNavigator(
  {
    Settings: {
      screen: Settings
    },
    UserPlaces: {
      screen: UserPlaces
    }
  },
  {
    initialRouteName: "Settings"
  }
);

export default createAppContainer(userProfileNavigation);
