import React, { Component } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import t from "tcomb-form-native";
import * as api from "../utils/utils";
const Form = t.form.Form;
import { AirbnbRating } from "react-native-ratings";

const Review = t.struct({
  review: t.String
});

export default class AddReviewForm extends Component {
  state = {
    rating: 0,
    review: ""
  };

  handleSubmit = (place_id, author, place_name) => {
    const review = this.state.review.review;
    const rating = this.state.rating;
    api
    .postReviewByPlaceId(place_name, place_id, author, review, rating)
    .then(data => {
      this.props.addReviews(data)
      return api
      .patchSafeplaceById(place_id,rating)
    })
    .then(data =>{
      this.props.updateRating(data)
      this.setState( {review: "", rating: 0 });
    })
    .catch(console.log)

  };

  ratingCompleted = rating => {
    this.setState({ rating: rating });
  };

  inputHandler = () => {
    const value = this._form.getValue();
    this.setState({ review: value });
  };

  render() {
    const { id, author, place_name } = this.props;
    return (
      <View>
        <View style={styles.container}>
          <Form
            onChange={this.inputHandler}
            ref={c => (this._form = c)}
            type={Review}
            value={this.state.review}
          />
          <AirbnbRating
            style={styles.button}
            count={5}
            reviews={[]}
            defaultRating={this.state.rating}
            size={45}
            onFinishRating={this.ratingCompleted}
          />
          <Button
            title="Post Review!"
            onPress={() => this.handleSubmit(id, author, place_name)}
          />
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
