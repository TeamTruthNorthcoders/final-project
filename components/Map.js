import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
  Button
} from "react-native";

import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
let Icon = Ionicons;
let IconPlus = AntDesign;

// external imports necessary for the map to work
import MapView, { Callout, Marker, CalloutSubview } from "react-native-maps";
import * as Permissions from "expo-permissions";
import Polyline from "@mapbox/polyline";

//local imports for data that needs to be protected
import APIKEY from "../key";
import locations from "./locations.json";

//Other components
import PopUpBox from "./PopUpBox";

import Spinner from "./Spinner";

const { width } = Dimensions.get("screen");

//axios

import * as api from "../utils/utils";

export default class Map extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    draggableMarkerCoords: {},
    locations: [],
    newPlace: {},
    b: { latitude: null, longitude: null },
    addAPlace: false,
    markerPressed: false,
    locations: locations,
    isLoading: true
  };

  //Gets permission for accessing current location and stores it in state
  async componentDidMount() {
    this.getAllSafePlaces();
  }

  getAllSafePlaces = () => {
    api
      .fetchFavPlacesByUser()
      .then(data => {
        return data.map(item => {
          let newItem = {
            author: item.author,
            address: item.formatted_address,
            coords: {
              latitude: item.latitude,
              longitude: item.longitude
            },
            id: item.place_id,
            name: item.place_name,
            rating: item.rating,
            weekday_text: item.weekday_text,
            rating_count: item.rating_count
          };

          return newItem;
        });
      })
      .then(mappedData => {
        const { status } = Permissions.getAsync(Permissions.LOCATION);
        if (status !== "granted") {
          const response = Permissions.askAsync(Permissions.LOCATION);
        }
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) =>
            this.setState(
              {
                latitude,
                longitude,
                locations: mappedData,
                b: { latitude: latitude + 0.006, longitude: longitude - 0.001 },
                isLoading: false
              },
              this.mergeCoords
            ),
          error => console.log("Error:", error)
        );
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.newPlace !== this.state.newPlace) {
      this.getAllSafePlaces();
    }
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
  getDirections = async (startLoc, desLoc) => {
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
  };
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
    // console.log(this.state, "THIS STATE CONSOLE LOG");
    const { locations } = this.state;
    const { point } = this.state;
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
              // calloutOffset={point}
              // image={require("../assets/icon.png")}
            >
              <View>
                <Icon name={"md-pin"} size={30} color={"#e6005c"} />
              </View>
              <Callout alphaHitTest tooltip style={styles.popUp}>
                <PopUpBox
                  navigation={this.props.navigation}
                  time={this.state.time}
                  markerInfo={location}
                />
              </Callout>
            </Marker>
          );
        })}
      </View>
    );
  };

  handleDraggablemarker = () => {
    this.setState(prevState => {
      return { addAPlace: !prevState.addAPlace };
    });
  };
  updateCoordsDraggableMarker = coords => {
    this.setState({ draggableMarkerCoords: coords });
  };
  onDragEnd = coordinates => {
    const formattedCoord =
      coordinates.latitude.toString() + "," + coordinates.longitude.toString();
    api
      .getSafePLaceByCoord(formattedCoord)
      .then(placeObject => {
        let newItem = {
          // author: item.author,
          address: placeObject.formatted_address,
          coords: {
            latitude: placeObject.latitude,
            longitude: placeObject.longitude
          },
          id: placeObject.place_id,
          name: placeObject.place_name,
          rating: placeObject.rating,
          weekday_text: placeObject.weekday_text
        };

        return newItem;
      })
      .then(newItem => {
        Alert.alert(
          `Do you mean ${newItem.name} ?`,
          "",
          [
            {
              text: "No, Keep Dragging",

              style: "cancel"
            },
            {
              text: "Yes",
              onPress: () => {
                api.postSafePlace(newItem.id).then(() => {
                  Alert.alert("Thanks, this new place has been added !");

                  this.setState({ addAPlace: false, newPlace: newItem });
                }).catch;
              }
            }
          ],
          { cancelable: false }
        );
      })
      .catch(e => console.log(e));
  };

  render() {
    const { time, coords, latitude, longitude, markerPressed } = this.state;

    const { isLoading } = this.state;
    if (isLoading) {
      return <Spinner />;
    }

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
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0221
            }}
          >
            <TouchableOpacity onPress={this.handleDraggablemarker}>
              <IconPlus
                name={"pluscircle"}
                size={60}
                color={"#e6005c"}
                style={styles.touchOp}
              />
            </TouchableOpacity>

            {//puts markers on map
            this.state.addAPlace ? (
              <Marker
                coordinate={this.state.b}
                onDrag={this.updateCoordsDraggableMarker}
                onDragEnd={event =>
                  this.onDragEnd(event.nativeEvent.coordinate)
                }
                draggable
              >
                <View>
                  <Icon name={"md-pin"} size={50} color={"#0039e6"} />
                </View>
              </Marker>
            ) : (
              this.renderMarkers()
            )}

            {this.state.isLoading && <Text>Loading</Text>}
            {markerPressed && (
              //Show path when a marker is pressed
              <MapView.Polyline
                strokeWidth={2}
                strokeColor="red"
                coordinates={coords}
              />
            )}
          </MapView>
          <View style={styles.buttonContainer}></View>

          {/* <Emergency /> */}
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
    display: "flex",
    flexDirection: "column"
    //justifyContent: "flex-start"
  },
  popUp: {
    width: 320,
    height: 120,
    borderWidth: 0,
    paddingBottom: 0,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "#e6d400",
    padding: 5
  },
  touchOp: {
    marginTop: 5
  }
});
