import axios from "axios";
import httpAdapter from "axios/lib/adapters/http";
const http = axios.create({
  baseURL: "/",
  method: "GET",
  headers: {
    "X-Auth-Token": "a4b9c16efa1b49b78a4ef49bd0f472b0"
  },
  // cache will be enabled by default
  adapter: httpAdapter
});
//const API_URL = "http://futbol.date";
const API_URL = "http://api.football-data.org";
/**
 * @return Promise
 */
export default path => {
  return http.get(API_URL + path).then(response => {
    return response.data;
  });
};
