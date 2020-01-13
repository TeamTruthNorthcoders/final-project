import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

// external imports necessary for the map to work
import MapView, { Callout } from "react-native-maps";
import * as Permissions from "expo-permissions";
import Polyline from "@mapbox/polyline";
import { Marker } from "react-native-maps";

//local imports for data that needs to be protected
import APIKEY from "../key";
import locations from "./locations.json";

//Other components
import PopUpBox from "./PopUpBox";

const { width, height } = Dimensions.get("screen");

export default class Map extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    locations: locations,
    markerPressed: false,
    isLoading: true
  };

  //Gets permission for accessing current location and stores it in state
  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if (status !== "granted") {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        this.setState({ latitude, longitude }, this.mergeCoords),
      error => console.log("Error:", error)
    );
  }

  //function that formats longitude and latitude in one string that we can use in google maps api request
  mergeCoords = () => {
    const { latitude, longitude, desLatitude, desLongitude } = this.state;

    const hasStartAndEnd = latitude !== null && desLatitude !== null;

    if (hasStartAndEnd) {
      const concatStart = `${latitude},${longitude}`;
      const concatEnd = `${desLatitude},${desLongitude}`;
      this.getDirections(concatStart, concatEnd);
    }
  };

  //GM API request for the path that links our current loc (startlocation) and destination(desLoc)
  //The points fo the path are linked and mapped thanks to polyline
  //also calculates the time needed and puts it in state
  async getDirections(startLoc, desLoc) {
    try {
      const resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=${APIKEY}&mode=walking`
      );
      const respJson = await resp.json();
      const response = respJson.routes[0];
      if (response) {
        const distanceTime = response.legs[0];
        const time = distanceTime.duration.text;
        const points = Polyline.decode(
          respJson.routes[0].overview_polyline.points
        );

        const coords = points.map(point => {
          return {
            latitude: point[0],
            longitude: point[1]
          };
        });
        this.setState({ coords, time });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  //Sets the state coords equal to the coords of the specific marker we press.
  //Those coords are then sent to mergedCoords that format them to be used by getDirections as desLoc
  onMarkerPress = location => () => {
    this.setState({ markerPressed: true });
    const {
      coords: { latitude, longitude }
    } = location;
    this.setState(
      {
        destination: location,
        desLatitude: latitude,
        desLongitude: longitude,
        markerInfo: [location],
        isLoading: false
      },
      this.mergeCoords
    );
  };

  //renders markers on the map
  renderMarkers = () => {
    const { locations } = this.state;
    return (
      <View>
        {locations.map((location, idx) => {
          const {
            coords: { latitude, longitude }
          } = location;
          return (
            <Marker
              key={idx}
              coordinate={{ latitude, longitude }}
              onPress={this.onMarkerPress(location)}
              style={styles.marker}
              // image={require("../assets/icon.png")}
            >
              <Callout alphaHitTest tooltip style={styles.popUp}>
                <PopUpBox navigation={this.props.navigation} time={this.state.time} markerInfo={location} />
              </Callout>
            </Marker>
          );
        })}
      </View>
    );
  };

  render() {
    
    const { time, coords, latitude, longitude, markerPressed } = this.state;
    if (latitude) {
      return (
        //MapView component renders the map itself, the properties are specified here to center it on manchester and show current position
        <View>
          <MapView
            showsUserLocation
            style={styles.map}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            {//puts markers on map
            this.renderMarkers()}

            {/* {this.state.isLoading && <Text>Loading</Text>} */}
            {markerPressed && (
              //Show path when a marker is pressed
              <MapView.Polyline
                strokeWidth={2}
                strokeColor="red"
                coordinates={coords}
              />
            )}
          </MapView>
        </View>
      );
    }

    return (
      //In case we don't have permission to access their location we don't return the mapbut this message
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>We need your permission!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width,
    display: "flex"
  },
  popUp: {
    width: 300,
    height: 120,
    borderWidth: 0,
    paddingBottom: 0,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "#e6d400",
    padding: 5
  }
});
