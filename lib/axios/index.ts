import axios from "axios";
import { apiBaseEndpoints } from "./endpoints";

const api = axios.create({
  baseURL: apiBaseEndpoints.dev,
});

export default api;
