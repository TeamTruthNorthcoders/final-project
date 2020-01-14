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
