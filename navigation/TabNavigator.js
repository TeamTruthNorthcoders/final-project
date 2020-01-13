import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";


import StackNavigatorMainPage from "./StackNavigatorMainPage";
import userProfileNavigation from "./userProfileNavigation";

const TabNavigator = createBottomTabNavigator(
  {
    Home: StackNavigatorMainPage,


    Settings: userProfileNavigation
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Home") {
          iconName = "ios-home";
        } else if (routeName === "Settings") {
          iconName = "ios-settings";
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "white",
      style: {
        backgroundColor: "#e6005c"
      }
    }
  }
);
const AppContainer = createAppContainer(TabNavigator);
export default AppContainer;
