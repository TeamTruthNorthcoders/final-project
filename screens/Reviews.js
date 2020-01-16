import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList, YellowBox, ScrollView } from "react-native";
import StarRating from "react-native-star-rating";
import * as api from "../utils/utils";
import Spinner from "react-native-loading-spinner-overlay";
import AddReviewForm from "../components/AddReviewForm";

export default class Reviews extends React.Component {
  state = {
    place: [],
    reviews: [],
    isLoading: true
  };

  componentDidMount = () => {
    const place_id = this.props.navigation.state.params.id;
    this.getReviewsByPlaceId(place_id);

    YellowBox.ignoreWarnings(["VirtualizedLists should never be nested"]);
  };

  componentDidUpdate = () => {
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
    const { address, name, weekday_text } = this.state.place;
    const rating = this.state.place.rating / this.state.place.rating_count;

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Spinner visible={this.state.isLoading} />
        </View>
      );
    }

    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.place_name}>{name}</Text>
              <Text style={styles.address}>{address}</Text>
              <Text style={styles.open}>
                {weekday_text.map(item => {
                  return (
                    <Text
                    // keyExtractor={item => {
                    //   return item.toString();
                    // }}
                    // style={styles.open}
                    >
                      {item}
                      {"\n"}
                    </Text>
                  );
                })}
              </Text>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={rating}
                halfStarColor={"gold"}
                fullStarColor={"gold"}
              />
            </View>
          </View>
          <View>
            <AddReviewForm
              id={this.state.place.id}
              author={this.state.place.author}
              place_name={name}
            />
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
                    <Text style={styles.author}>
                      {review.author}
                      {/* {review.author.substring(0, 3) +
                        Array(review.author.length + 1).join("*")} */}
                    </Text>
                    <Text style={styles.date}>
                      posted on {review.date_time.substring(0, 11)}
                    </Text>
                    <Text style={styles.reviews}>{review.review}</Text>
                  </View>
                </View>
              );
            }}
          />
        </ScrollView>
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
  form: {
    justifyContent: "center"
  },
  place_name: {
    fontSize: 25,
    textAlign: "center",
    paddingBottom: 7,
    fontWeight: "bold"
  },
  author: {
    fontSize: 18,
    textAlign: "center",
    paddingBottom: 7,
    fontWeight: "bold"
  },
  address: {
    textAlign: "center"
  },
  open: {
    textAlign: "right",
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: 18
  },
  reviews: {
    alignSelf: "center",
    width: "90%",
    paddingTop: 20
  },
  date: {
    fontSize: 12,
    textAlign: "center"
  }
});
