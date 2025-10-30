import axios from "axios";
const API = axios.create({
  baseURL: "https://highway-delite-asgmt.onrender.com/api",
});
export default API;
