import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import UserSafePlaces from "../screens/UserSafePlaces";
import Signup from "../screens/Signup";
import Settings from "../screens/Settings";
import TabNav from "./TabNavigator";

const SwitchNavigator = createSwitchNavigator(
  {
    Settings: {
      screen: Settings
    },
    UserSafePlaces: {
      screen: UserSafePlaces
    },
  },
  {
    initialRouteName: "Settings"
  }
);


 export default 
  createAppContainer(SwitchNavigator);