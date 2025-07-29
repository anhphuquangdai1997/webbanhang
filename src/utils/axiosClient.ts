import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://backend-fullstack-kbiq.onrender.com/api/v1",
  withCredentials: true
});

export default axiosClient;
