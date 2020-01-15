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
import * as api from "../../utils/utils";

export default class UserReviews extends Component {
  state = {
    data: [],
    isLoading: true
  };

  componentDidMount = () => {
    let author = this.props.navigation.state.params.email.email;
    // console.log(author);
    this.fetchReviewsByAuthor(author);
  };

  fetchReviewsByAuthor = author => {
    api.fetchReviews(author).then(data => {
      this.setState({ data: data.Items, isLoading: false });
    });
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
          console.log(item);
          return item.review_id.toString();
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
                  {/* <Text style={styles.time}>2:44am</Text> */}
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
