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
