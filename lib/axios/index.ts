import axios from "axios";
import { apiBaseEndpoints } from "./endpoints";

type ApiBaseEndpoints = typeof apiBaseEndpoints;

const APP_ENV = process.env.NODE_ENV as keyof ApiBaseEndpoints;


const api = axios.create({
  baseURL: apiBaseEndpoints[APP_ENV],
});

export default api;
