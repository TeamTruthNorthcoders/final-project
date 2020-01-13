import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Reviews from "../screens/Reviews";

import MainPage from "../screens/MainPage";

const SwitchNavigatorMainPage = createSwitchNavigator(
  {
    MainPage: {
      screen: MainPage
    },
    Reviews: {
      screen: Reviews
    }
  },
  {
    initialRouteName: "MainPage"
  }
);

export default createAppContainer(SwitchNavigatorMainPage);
