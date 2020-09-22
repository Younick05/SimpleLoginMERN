import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5151/api/",
  headers: {
    "Content-type": "application/json"
  }
});