import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import Login from "../screens/Login";
import Signup from "../screens/Signup";
import TabNav from "./TabNavigator";

const SwitchNavigator = createSwitchNavigator(
  {
    Login: {
      screen: Login
    },
    Signup: {
      screen: Signup
    },
    Home: {
      screen: TabNav
    }
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(SwitchNavigator);
