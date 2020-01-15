import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native";
import StarRating from "react-native-star-rating";
import * as api from "../utils/utils";
import Spinner from "react-native-loading-spinner-overlay";

export default class Reviews extends React.Component {
  state = {
    place: [],
    reviews: [],
    isLoading: true
  };

  componentDidMount = () => {
    const place_id = this.props.navigation.state.params.id;
    this.getReviewsByPlaceId(place_id);
    setInterval(() => {
      this.setState({
        isLoading: false
      });
    }, 3000);
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
    const { address, name, weekday_text, rating } = this.state.place;

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Spinner visible={this.state.isLoading} />
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.address}>{address}</Text>
            <Text style={styles.open}>{weekday_text}</Text>
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
                  <Text style={styles.name}>
                    {review.author.substring(0, 3) +
                      Array(review.author.length + 1).join("*")}
                  </Text>
                  <Text style={styles.date}>
                    {review.date_time.substring(0, 11)}
                  </Text>
                  <Text style={styles.reviews}>{review.review}</Text>
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
  container: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "flex-start"
  },
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
    fontSize: 25,
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
    fontSize: 20
  },
  reviews: {
    alignSelf: "center",
    width: "90%",
    paddingTop: 20
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center"
  },
  date: {
    fontSize: 12,
    textAlign: "center"
  }
});
