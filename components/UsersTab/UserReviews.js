import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from "react-native";

export default class UserReviews extends Component {
  state = {
    data: [
      {
        id: 1,
        image: "https://api.adorable.io/avatars/90/abott@adorable.png",
        name: "Stefan",
        review:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
      },
      {
        id: 2,
        image: "https://api.adorable.io/avatars/90/abott@adorable.png",
        name: "Sarah",
        review:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
      },
      {
        id: 3,
        image: "https://api.adorable.io/avatars/90/abott@adorable.png",
        name: "Micheal",
        review:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
      },
      {
        id: 4,
        image: "https://api.adorable.io/avatars/90/abott@adorable.png",
        name: "Jakub",
        review:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo"
      },
      {
        id: 5,
        image: "https://api.adorable.io/avatars/90/abott@adorable.png",
        name: "Mo",
        review:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
      },
      {
        id: 6,
        image: "https://api.adorable.io/avatars/90/abott@adorable.png",
        name: "Boom Boom Shake the room",
        review:
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores"
      },
      {
        id: 7,
        image: "https://api.adorable.io/avatars/90/abott@adorable.png",
        name: "Enpentenyczna Inseminacja",
        review: "Et harum quidem rerum facilis est et expedita distinctio"
      }
    ]
  };

  render() {
    return (
      <FlatList
        style={styles.main}
        data={this.state.data}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        keyExtractor={item => {
          return item.id.toString();
        }}
        renderItem={item => {
          const placehold = item.item;
          return (
            <View style={styles.container}>
              <TouchableOpacity onPress={() => {}}>
                <Image style={styles.image} source={{ uri: placehold.image }} />
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text style={styles.name}>{placehold.name}</Text>
                  <Text style={styles.time}>2:44am</Text>
                </View>
                <Text>{placehold.review}</Text>
              </View>
            </View>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#ffffff",
    marginTop: 10
  },
  container: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  content: {
    marginLeft: 16,
    flex: 1
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image: {
    borderRadius: 15,
    marginLeft: 10,
    width: 35,
    height: 35
  },
  time: {
    fontSize: 11,
    color: "#808080"
  },
  name: {
    fontSize: 15,
    fontWeight: "bold"
  }
});
