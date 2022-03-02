import axios from "axios";

const BASE_URI = process.env.REACT_APP_BASE_URI;
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "text/plain",
  },
};

const instance = axios.create({
  baseURL: BASE_URI,
  https: config,
});

export default instance;
