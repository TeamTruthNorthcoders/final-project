import axios from "axios";
const baseURL = "https://2aw2ojaww1.execute-api.eu-west-2.amazonaws.com/api";

export const fetchFavPlacesByUser = async author => {
  return await axios
    .get(`${baseURL}/safeplaces`, {
      params: { author }
    })
    .then(({ data }) => {
      const { Items } = data;
      return Items;
    });
};

export const fetchReviews = async author => {
  return await axios
    .get(`${baseURL}/reviews`, {
      params: { author }
    })
    .then(({ data }) => {
      return data;
    });
};

export const fetchPlaceByPlaceId = async place_id => {
  return await axios
    .get(`${baseURL}/safeplaces/${place_id}`)
    .then(({ data }) => {
      return data;
    });
};

export const fetchReviewsByPlaceId = async place_id => {
  return await axios
    .get(`${baseURL}/safeplaces/${place_id}/reviews`, {
      params: {}
    })
    .then(({ data }) => {
      return data;
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

export const fetchReviewsByPlaceId = async place_id => {
  return await axios
    .get(`${baseURL}/safeplaces/${place_id}/reviews`)
    .then(({ data }) => {
      return data;
    });
};

export const postSafePlace = async place_id => {
  return await axios
    .post(`${baseURL}/safeplaces/${place_id}`, {
      author: "me"
    })
    .then(({ data }) => {
      return data;
    });
};

export const postSafePlace = async place_id => {
  return await axios
    .post(`${baseURL}/safeplaces/${place_id}`, {
      author: "me"
    })
    .then(({ data }) => {
      return data;
    });
};
