import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { FlatList } from "react-native";
import StarRating from "react-native-star-rating";

import * as api from "../utils/utils";

export default class Reviews extends React.Component {
  state = {
    place: [],
    reviews: [],
    isLoading: true
  };

  componentDidMount = () => {
    const place_id = this.props.navigation.state.params.id;
    this.getReviewsByPlaceId(place_id);
  };

  getReviewsByPlaceId = place_id => {
    api.fetchReviewsByPlaceId(place_id).then(data => {
      this.setState({
        reviews: data.Items,
        place: this.props.navigation.state.params,
        isLoading: false
      });
    });
  };

  render() {
    console.log(this.state.reviews);
    const { address, name, weekday_text, rating } = this.state.place;
    return (
      <View>
        <View style={styles.container}>
          {/* <TouchableOpacity onPress={() => {}}>
                <Image style={styles.image} source={{ uri: review.image }} />
              </TouchableOpacity> */}
          <View style={styles.header}>
            <Text>{name}</Text>
            <Text>{weekday_text}</Text>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={rating}
              halfStarColor={"gold"}
              fullStarColor={"gold"}
            />
          </View>
        </View>
        <FlatList
          style={styles.main}
          data={this.state.reviews}
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
                <View style={styles.header}>
                  <Text>
                    {review.author.substring(0, 3) +
                      Array(review.author.length + 1).join("*")}
                  </Text>
                  <Text>15 January 2019</Text>
                  <Text>{review.review}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   paddingRight: 10,
  //   paddingLeft: 10,
  //   paddingVertical: 10,
  //   flexDirection: "row",
  //   alignItems: "flex-start"
  // },
  main: {
    backgroundColor: "#ffffff",
    marginTop: 10
  },
  header: {
    alignSelf: "center",
    width: "90%",
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomWidth: 2
  },
  name: {
    fontSize: 23,
    textAlign: "center",
    paddingBottom: 7,
    fontWeight: "bold"
  },
  address: {
    textAlign: "center"
  },
  open: {
    textAlign: "center",
    paddingBottom: 15,
    fontSize: 23
  },
  reviews: {

    alignSelf: "center",
    width: "90%",
    paddingTop: 20
  }
});
