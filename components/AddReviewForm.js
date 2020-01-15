import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";
import t from "tcomb-form-native";
import * as api from "../utils/utils";
const Form = t.form.Form;
import { AirbnbRating } from "react-native-ratings";

const Review = t.struct({
  review: t.String,
  place_rating: t.String
});

export default class AddReviewForm extends Component {
  state = {
    newReview: {},
    rating: 0
  };

  handleSubmit = () => {
    const value = this._form.getValue();
    // const place_id = this.props.navigation.state.params.id;
    // const author = this.props.navigation.state.params.author;
    const review = value.review;
    const rating = this.state.rating;
    console.log("value: ", value);
    // console.log("author", author);
    // console.log(("place_id": place_id));
    api
      .postReviewByPlaceId(
        // place_id, author,
        review,
        rating
      )
      .then(data => {
        this.setState({ newReview: data.item });
      });
  };
  //(place_id, author, review, rating)

  ratingCompleted = rating => {
    this.setState({ rating: rating });
  };

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Form
            ref={c => (this._form = c)} // assign a ref
            type={Review}
          />
          <AirbnbRating
            count={5}
            reviews={[]}
            defaultRating={3}
            size={45}
            onFinishRating={this.ratingCompleted}
          />
          <Button title="Post Review!" onPress={this.handleSubmit} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ffffff"
  }
});
