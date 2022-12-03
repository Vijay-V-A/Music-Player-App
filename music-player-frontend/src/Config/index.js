import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

let headers = {
  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
};

const axiosInst = axios.create({
  baseURL,
  headers,
});

export default axiosInst;
