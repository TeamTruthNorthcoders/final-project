import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Reviews from "../screens/Reviews";

import MainPage from "../screens/MainPage";

const StackNavigatorMainPage = createStackNavigator(
  {
    Map: {
      screen: MainPage
    },
    Reviews: {
      screen: Reviews
    }
  },
  {
    initialRouteName: "Map",
    mode: "modal",
    headerMode: "screen",
    defaultNavigationOptions: {
      
      cardOverlayEnabled: true,
      headerStyle: {
        backgroundColor: "#e6005c"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

export default createAppContainer(StackNavigatorMainPage);
