import axios from "axios";

export default axios.create({
  baseURL: "https://commodities-api.com/api",
  headers: {
    "Content-type": "application/json"
  }
});