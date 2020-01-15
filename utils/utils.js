import axios from "axios";
const baseURL = "https://2aw2ojaww1.execute-api.eu-west-2.amazonaws.com/api";

export const fetchFavPlacesByUser = async () => {
  return await axios
    .get(`${baseURL}/safeplaces`, {
      params: {}
    })
    .then(({ data }) => {
      // const places = Object.keys(data)[0];
      const { Items } = data;
      // console.log("hi", Items);
      return Items;
    });
};

export const fetchReviewsByPlaceId = async place_id => {
  return await axios
    .get(`${baseURL}/safeplaces/${place_id}/reviews`, {
      params: {}
    })
    .then(reviews => {
      // const places = Object.keys(data)[0];
      console.log(reviews);
      // console.log("hi", Items);
    })
    .catch(e => console.log(e));
};

export const getSafePLaceByCoord = async coord => {
  return await axios
    .get(`${baseURL}/safeplaces/coordinates/${coord}`, { params: {} })
    .then(({ data }) => {
      return data;
    });
};

export const postSafePlace = async place_id => {
  return await axios.post(`${baseURL}/safeplaces/${place_id}`, {
    author: "me"
  });
};
