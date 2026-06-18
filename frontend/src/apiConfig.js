import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

export default axios;
