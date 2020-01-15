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
import StarRating from "react-native-star-rating";

export default class UserReviews extends Component {
  state = {
    data: [],
    isLoading: true
  };

  componentDidMount = () => {
    let author = this.props.navigation.state.params.email.email;
    this.fetchReviewsByAuthor(author);
  };

  fetchReviewsByAuthor = author => {
    api.fetchReviews(author).then(data => {
      this.setState({ data: data.Items });
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
          return item.review_id.toString();
        }}
        renderItem={item => {
          const review = item.item;
          return (
            <View style={styles.container}>
              <TouchableOpacity onPress={() => {}}>
                <Image style={styles.image} source={{ uri: review.image }} />
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text style={styles.name}>
                    {review.author.substring(0, 3) +
                      Array(review.author.length + 1).join("*")}
                  </Text>
                </View>
                <Text>{review.review}</Text>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={review.rating}
                  halfStarColor={"gold"}
                  fullStarColor={"gold"}
                />
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
