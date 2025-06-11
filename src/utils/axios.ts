import axios from "axios";

axios.defaults.baseURL = 'https://backend-fullstack-kbiq.onrender.com/api/v1';
axios.defaults.withCredentials = true; // Include credentials (cookies) in requests

export default axios;