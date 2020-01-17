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

export const postSafePlace = async (place_id, author) => {
  return await axios
    .post(`${baseURL}/safeplaces/${place_id}`, {
      author: author
    })
    .then(({ data }) => {
      return data;
    });
};

export const postReviewByPlaceId = async (
  place_name,
  place_id,
  author,
  review,
  rating
) => {
  return await axios
    .post(`${baseURL}/safeplaces/${place_id}/reviews`, {
      place_name: place_name,
      author: author,
      review: review,
      place_id: place_id,
      rating_value: rating
    })
    .then(({ data }) => {
      return data;
    });
};
export const patchSafeplaceById = async (place_id,rating_value) =>{
  return await axios
  .patch(`${baseURL}/safeplaces/${place_id}`,{"rating_value":rating_value})
  .then(({data}) =>{
      return data
    })
}

export const deleteReviewByReviewId = async review_id => {
  return await axios
    .delete(`${baseURL}/reviews/${review_id}`)
    .then(({ data }) => {
      return data;
    });
};

export const deletePlaceByPlaceId = async place_id => {
  return await axios
    .delete(`${baseURL}/safeplaces/${place_id}`)
    .then(({ data }) => {
      return data;
    });
};

export const getPlaceByPlaceId = async place_id => {
  return await axios
    .get(`${baseURL}/safeplaces/${place_id}`)
    .then(({ data }) => {
      return data;
    });
};
