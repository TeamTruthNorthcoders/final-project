import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import StarRating from "react-native-star-rating";
import Spinner from "../Spinner";
import * as api from "../../utils/utils";
import { connect } from "react-redux";
class UserPlaces extends React.Component {
  state = {
    isLoading: true,
    data: [],
    author: ""
  };
  componentDidMount() {
    let author = this.props.user.email;
    this.fetchPlacesByUser(author);
  }

  fetchPlacesByUser = author => {
    api.fetchFavPlacesByUser(author).then(data => {
      this.setState({ data: data, isLoading: false, author: author });
    });
  };

  render() {
    const isLoading = this.state.isLoading;

    if (isLoading) {
      return <Spinner></Spinner>;
    }

    return (
      <FlatList
        style={styles.main}
        data={this.state.data}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        keyExtractor={item => {
          return item.place_id.toString();
        }}
        renderItem={item => {
          const placehold = item.item;
          const combinedRating = placehold.rating / placehold.rating_count;
          return (
            <View style={styles.container}>
              <TouchableOpacity onPress={() => {}}>
                <Image style={styles.image} source={{ uri: placehold.image }} />
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text style={styles.name}>{placehold.place_name}</Text>
                </View>
                <Text>{placehold.review}</Text>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={combinedRating}
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

  name: {
    fontSize: 15,
    fontWeight: "bold"
  }
});
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UserPlaces);
