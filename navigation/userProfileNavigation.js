import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import UserPlaces from "../components/UsersTab/UserPlaces";
import UserReviews from "../components/UsersTab/UserReviews";
import { createStackNavigator } from "react-navigation-stack";
import Settings from "../screens/Settings";
const userProfileNavigation = createStackNavigator(
  {
    Settings: {
      screen: Settings
    },
    UserPlaces: {
      screen: UserPlaces
    },
    UserReviews: {
      screen: UserReviews
    }
  },
  {
    initialRouteName: "Settings",
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

export default createAppContainer(userProfileNavigation);
